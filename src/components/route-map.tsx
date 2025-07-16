
'use client';

import { APIProvider, Map, AdvancedMarker, useMap, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import { BusIcon } from 'lucide-react';
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
    
    useEffect(() => {
        if (!map || !routes.length) return;

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

    }, [map, routes]);

    return null;
};

// Function to interpolate between two points
function interpolateLatLng(p1: LatLng, p2: LatLng, fraction: number): LatLng {
    const lat = p1.lat + (p2.lat - p1.lat) * fraction;
    const lng = p1.lng + (p2.lng - p1.lng) * fraction;
    return { lat, lng };
}


export function RouteMap({ allRoutes }: RouteMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [selectedStop, setSelectedStop] = useState<{route: Route, stop: LatLng, name: string} | null>(null);
    const [busPositions, setBusPositions] = useState<Record<string, LatLng>>({});

    useEffect(() => {
        const activeRoutes = allRoutes.filter(r => r.status === 'Active' && r.path.length > 1);

        const initialPositions: Record<string, LatLng> = {};
        activeRoutes.forEach(route => {
            initialPositions[route.name] = route.path[0];
        });
        setBusPositions(initialPositions);

        const animationInterval = setInterval(() => {
            setBusPositions(prevPositions => {
                const newPositions = { ...prevPositions };
                activeRoutes.forEach(route => {
                    const currentPos = newPositions[route.name];
                    const path = route.path;

                    // Find current segment
                    let currentSegmentIndex = path.findIndex((p, i) => {
                         if (i === path.length - 1) return false;
                         const p1 = p;
                         const p2 = path[i+1];
                         // check if currentPos is on the segment from p1 to p2
                         const isBetweenLat = (currentPos.lat >= Math.min(p1.lat, p2.lat) && currentPos.lat <= Math.max(p1.lat, p2.lat));
                         const isBetweenLng = (currentPos.lng >= Math.min(p1.lng, p2.lng) && currentPos.lng <= Math.max(p1.lng, p2.lng));
                         return isBetweenLat && isBetweenLng;
                    });
                    
                    if(currentSegmentIndex === -1) {
                        // If not found (or at the start), default to the first segment
                        currentSegmentIndex = 0;
                    }
                    
                    const startPoint = path[currentSegmentIndex];
                    let nextPoint = path[currentSegmentIndex + 1];

                    if (!nextPoint) { // Reached the end of the route
                        newPositions[route.name] = path[0]; // Loop back to the start
                        return;
                    }

                    // Simple fixed step for movement
                    const step = 0.05; // Adjust for speed
                    
                    const totalDistLat = nextPoint.lat - startPoint.lat;
                    const totalDistLng = nextPoint.lng - startPoint.lng;
                    const currentDistLat = currentPos.lat - startPoint.lat;
                    const currentDistLng = currentPos.lng - startPoint.lng;

                    const fraction = Math.sqrt(currentDistLat**2 + currentDistLng**2) / Math.sqrt(totalDistLat**2 + totalDistLng**2);
                    
                    let newFraction = fraction + step;

                    if (newFraction >= 1.0) {
                        // Move to the next segment
                        const nextSegmentIndex = (currentSegmentIndex + 1) % (path.length -1);
                        newPositions[route.name] = path[nextSegmentIndex];
                         if (currentSegmentIndex + 1 >= path.length -1) {
                             newPositions[route.name] = path[0]
                         }
                    } else {
                        newPositions[route.name] = interpolateLatLng(startPoint, nextPoint, newFraction);
                    }
                });
                return newPositions;
            });
        }, 1000); // Update every second

        return () => clearInterval(animationInterval);
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
                        const pos = route.path[index] || { lat: 0, lng: 0 };
                        
                        return (
                            <AdvancedMarker 
                                key={`${route.name}-${stop.name}-${index}`} 
                                position={pos}
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent map click from firing
                                    setSelectedStop({route, stop: pos, name: stop.name});
                                }}
                            >
                                <div style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: route.color,
                                    border: '2px solid white',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.5)',
                                    cursor: 'pointer'
                                }} />
                            </AdvancedMarker>
                        )
                    })
                )}

                {allRoutes.map((route) => {
                    if (route.status === 'Active' && busPositions[route.name]) {
                        return <BusMarker key={`bus-${route.name}`} position={busPositions[route.name]} color={route.color} />;
                    }
                    return null;
                })}

                {selectedStop && (
                    <InfoWindow
                        position={selectedStop.stop}
                        onCloseClick={() => setSelectedStop(null)}
                    >
                        <div className="p-1">
                            <h3 className="font-semibold">{selectedStop.name}</h3>
                            <p className="text-xs text-muted-foreground">{selectedStop.route.name}</p>
                        </div>
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
    );
}
