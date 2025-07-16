
'use client';

import { APIProvider, Map, AdvancedMarker, useMap, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useEffect, useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { BusMarker } from './bus-marker';

type LatLng = { lat: number; lng: number };

type Stop = {
    stop: number;
    name: string;
    time: string;
    status: 'completed' | 'current' | 'upcoming';
};

type Route = {
  name: string;
  color: string;
  path: LatLng[];
  stops?: Stop[];
  status?: string;
};

interface RouteMapProps {
  allRoutes: Route[];
}

const mapStyles = [
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
];

const DirectionsRenderer = ({ routes, onPathsLoaded }: { routes: Route[], onPathsLoaded: (paths: { [key: string]: LatLng[] }) => void }) => {
    const map = useMap();
    const [directionsRenderers, setDirectionsRenderers] = useState<(google.maps.DirectionsRenderer | null)[]>([]);
    
    useEffect(() => {
        if (!map || !routes.length) return;

        const directionsService = new google.maps.DirectionsService();
        const newRenderers: (google.maps.DirectionsRenderer | null)[] = [];
        const loadedPaths: { [key: string]: LatLng[] } = {};

        const fetchRoute = (route: Route) => {
            return new Promise<void>((resolve, reject) => {
                if (route.path.length < 2) {
                    resolve();
                    return;
                }
                
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map,
                    suppressMarkers: true, 
                    polylineOptions: {
                        strokeColor: route.color,
                        strokeOpacity: 0.8,
                        strokeWeight: 5,
                    }
                });
                newRenderers.push(directionsRenderer);

                const origin = route.path[0];
                const destination = route.path[route.path.length - 1];
                const waypoints = route.path.slice(1, -1).map(point => ({
                    location: point,
                    stopover: true,
                }));

                directionsService.route({
                    origin,
                    destination,
                    waypoints,
                    travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                        directionsRenderer.setDirections(result);
                        const path = result.routes[0].overview_path.map(p => ({ lat: p.lat(), lng: p.lng() }));
                        loadedPaths[route.name] = path;
                        resolve();
                    } else {
                        console.error(`Directions request failed due to ${status} for route ${route.name}`);
                        reject(new Error(status));
                    }
                });
            });
        };

        Promise.all(routes.map(fetchRoute)).then(() => {
            onPathsLoaded(loadedPaths);
            setDirectionsRenderers(prevRenderers => {
                prevRenderers.forEach(r => r?.setMap(null));
                return newRenderers;
            });
        }).catch(error => console.error("Error fetching all routes:", error));
        
        return () => {
             directionsRenderers.forEach(renderer => renderer?.setMap(null));
        }

    }, [map, routes, onPathsLoaded]);

    return null;
};

function interpolateLatLng(p1: LatLng, p2: LatLng, fraction: number): LatLng {
    const lat = p1.lat + (p2.lat - p1.lat) * fraction;
    const lng = p1.lng + (p2.lng - p1.lng) * fraction;
    return { lat, lng };
}

function getDistance(p1: LatLng, p2: LatLng) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLong = (p2.lng - p1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // returns the distance in meter
}

export function RouteMap({ allRoutes }: RouteMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [selectedStop, setSelectedStop] = useState<{route: Route, stop: LatLng, name: string, stopNumber: number} | null>(null);
    const [busPositions, setBusPositions] = useState<{[key: string]: LatLng}>({});
    const [detailedPaths, setDetailedPaths] = useState<{[key: string]: LatLng[]}>({});
    const animationRef = useRef<number>();

    const handlePathsLoaded = React.useCallback((paths: { [key: string]: LatLng[] }) => {
        setDetailedPaths(paths);
    }, []);

    useEffect(() => {
        if (Object.keys(detailedPaths).length === 0) return;

        const routeData = allRoutes.map(route => {
            if (route.status !== 'Active' || !detailedPaths[route.name]) return null;
            const path = detailedPaths[route.name];
            const totalDistance = path.reduce((acc, curr, i, arr) => {
                if (i === 0) return 0;
                return acc + getDistance(arr[i-1], curr);
            }, 0);
            return {
                route,
                path,
                totalDistance,
                segmentDistances: path.map((p, i) => i === 0 ? 0 : getDistance(path[i-1], p)),
            };
        }).filter(Boolean);
        
        const animate = () => {
            const speedFactor = 0.0000002; // Adjusted speed factor for realism
            const newPositions : {[key: string]: LatLng} = {};

            routeData.forEach(data => {
                if (!data) return;
                const { route, path, totalDistance, segmentDistances } = data;
                const time = Date.now();
                const progress = (time * speedFactor * (totalDistance / 1000)) % 1; // Normalize speed based on distance
                const distanceCovered = progress * totalDistance;

                let distanceSoFar = 0;
                for (let i = 1; i < path.length; i++) {
                    const segmentLength = segmentDistances[i];
                    if (distanceSoFar + segmentLength >= distanceCovered) {
                        const overflow = distanceCovered - distanceSoFar;
                        const fraction = segmentLength > 0 ? overflow / segmentLength : 0;
                        const p1 = path[i-1];
                        const p2 = path[i];
                        newPositions[route.name] = interpolateLatLng(p1, p2, fraction);
                        break;
                    }
                    distanceSoFar += segmentLength;
                }
            });
            
            setBusPositions(newPositions);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [allRoutes, detailedPaths]);

    if (!apiKey) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-muted">
                <p>Google Maps API key is missing.</p>
            </div>
        )
    }

    const center = { lat: 6.4428, lng: 3.5352 }; // Centered around Lekki

    return (
        <APIProvider apiKey={apiKey}>
            <Map 
                defaultCenter={center} 
                defaultZoom={12} 
                mapId="b24b3a4a3e32e8b9"
                styles={mapStyles}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                onClick={() => setSelectedStop(null)}
            >
                <DirectionsRenderer routes={allRoutes} onPathsLoaded={handlePathsLoaded} />
                
                {allRoutes.flatMap(route => 
                    (route.stops || []).map((stop, index) => {
                        const pos = route.path[index] || route.path[0];
                        
                        return (
                            <AdvancedMarker 
                                key={`${route.name}-${stop.name}-${index}`} 
                                position={pos}
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent map click from firing
                                    setSelectedStop({route, stop: pos, name: stop.name, stopNumber: stop.stop});
                                }}
                            >
                                <MapPin className="text-red-500 w-8 h-8 cursor-pointer" style={{ fill: route.color, color: 'white' }} />
                            </AdvancedMarker>
                        )
                    })
                )}

                {Object.entries(busPositions).map(([routeName, position]) => {
                    const route = allRoutes.find(r => r.name === routeName);
                    if (!route) return null;
                    return <BusMarker key={`${routeName}-bus`} position={position} color={route.color} />;
                })}
                
                {selectedStop && (
                    <InfoWindow
                        position={selectedStop.stop}
                        onCloseClick={() => setSelectedStop(null)}
                    >
                        <div className="p-1">
                            <h3 className="font-semibold">{selectedStop.name}</h3>
                            <p className="text-xs text-muted-foreground">Stop {selectedStop.stopNumber} on {selectedStop.route.name}</p>
                        </div>
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
    );
}
