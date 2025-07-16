
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
    const [busPositions, setBusPositions] = useState<Record<string, {pos: LatLng, segmentIndex: number, segmentFraction: number}>>({});

    useEffect(() => {
        const activeRoutes = allRoutes.filter(r => r.status === 'Active' && r.path.length > 1);
    
        const initialPositions: Record<string, {pos: LatLng, segmentIndex: number, segmentFraction: number}> = {};
        activeRoutes.forEach(route => {
          initialPositions[route.name] = {
            pos: route.path[0],
            segmentIndex: 0,
            segmentFraction: 0,
          };
        });
        setBusPositions(initialPositions);
    
        const animationInterval = setInterval(() => {
          setBusPositions(prevPositions => {
            const newPositions = { ...prevPositions };
            activeRoutes.forEach(route => {
              const { pos, segmentIndex, segmentFraction } = newPositions[route.name];
              const path = route.path;
    
              const startPoint = path[segmentIndex];
              let endPoint = path[segmentIndex + 1];
    
              if (!endPoint) {
                // End of the route, loop back
                newPositions[route.name] = {
                  pos: path[0],
                  segmentIndex: 0,
                  segmentFraction: 0,
                };
                return;
              }
    
              const step = 0.05; // Adjust for speed
              let newFraction = segmentFraction + step;
    
              if (newFraction >= 1.0) {
                const nextSegmentIndex = segmentIndex + 1;
                if (nextSegmentIndex >= path.length - 1) {
                  // Reached the last point, loop back
                  newPositions[route.name] = {
                    pos: path[0],
                    segmentIndex: 0,
                    segmentFraction: 0,
                  };
                } else {
                  // Move to the next segment
                  newPositions[route.name] = {
                    pos: path[nextSegmentIndex],
                    segmentIndex: nextSegmentIndex,
                    segmentFraction: 0, // newFraction - 1.0 would be more precise but 0 is simpler for looping
                  };
                }
              } else {
                // Interpolate position on current segment
                newPositions[route.name] = {
                  pos: interpolateLatLng(startPoint, endPoint, newFraction),
                  segmentIndex: segmentIndex,
                  segmentFraction: newFraction,
                };
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
                    const busState = busPositions[route.name];
                    if (route.status === 'Active' && busState) {
                        return <BusMarker key={`bus-${route.name}`} position={busState.pos} color={route.color} />;
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
