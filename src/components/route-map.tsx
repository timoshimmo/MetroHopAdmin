
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

const Directions = ({ routes }: { routes: Route[] }) => {
    const map = useMap();
    const directionsRenderers = useRef<google.maps.DirectionsRenderer[]>([]);

    useEffect(() => {
        if (!map || !routes.length) return;

        // Clear existing renderers
        directionsRenderers.current.forEach(renderer => renderer.setMap(null));
        directionsRenderers.current = [];
        
        routes.forEach(route => {
            if (route.path.length < 2) return;
            
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map,
                suppressMarkers: true, 
                polylineOptions: {
                    strokeColor: route.color,
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                }
            });
            directionsRenderers.current.push(directionsRenderer);

            const origin = route.path[0];
            const destination = route.path[route.path.length - 1];
            const waypoints = route.path.slice(1, -1).map(point => ({
                location: point,
                stopover: true,
            }));

            const directionsService = new google.maps.DirectionsService();

            directionsService.route({
                origin,
                destination,
                waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error(`Directions request failed due to ${status} for route ${route.name}`);
                }
            });
        });
        
        return () => {
             directionsRenderers.current.forEach(renderer => renderer.setMap(null));
        }

    }, [map, routes]);

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
    const animationRef = useRef<number>();

    useEffect(() => {
        const routeData = allRoutes.map(route => {
            if (route.status !== 'Active') return null;
            const totalDistance = route.path.reduce((acc, curr, i, arr) => {
                if (i === 0) return 0;
                return acc + getDistance(arr[i-1], curr);
            }, 0);
            return {
                route,
                totalDistance,
                segmentDistances: route.path.map((p, i) => i === 0 ? 0 : getDistance(route.path[i-1], p)),
            };
        }).filter(Boolean);
        
        const animate = () => {
            const speedFactor = 0.00000002; // Increased speed factor
            const newPositions : {[key: string]: LatLng} = {};

            routeData.forEach(data => {
                if (!data) return;
                const { route, totalDistance, segmentDistances } = data;
                const time = Date.now();
                const progress = (time * speedFactor * totalDistance) % 1;
                const distanceCovered = progress * totalDistance;

                let distanceSoFar = 0;
                for (let i = 1; i < route.path.length; i++) {
                    const segmentLength = segmentDistances[i];
                    if (distanceSoFar + segmentLength >= distanceCovered) {
                        const overflow = distanceCovered - distanceSoFar;
                        const fraction = overflow / segmentLength;
                        const p1 = route.path[i-1];
                        const p2 = route.path[i];
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
    }, [allRoutes]);

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
                <Directions routes={allRoutes} />
                
                {allRoutes.flatMap(route => 
                    (route.stops || []).map((stop, index) => {
                        // Find the corresponding point in the path, as stops might not map 1:1
                        const stopNameLower = stop.name.toLowerCase();
                        const pathIndex = route.path.findIndex(p => {
                            // This is a simplistic match. A real app might have lat/lng on stops.
                            return true; // Simplified for now
                        });
                        
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
