
'use client';

import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

type LatLng = { lat: number; lng: number };

type Route = {
  name: string;
  color: string;
  path: LatLng[];
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

        const directionsService = new google.maps.DirectionsService();
        const polylines: google.maps.Polyline[] = [];

        routes.forEach(route => {
            if (route.path.length < 2) return;

            const directionsRenderer = new google.maps.DirectionsRenderer({
                map,
                suppressMarkers: true, // We'll use our own AdvancedMarkers
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

            // Store the renderer to clean up later, though the renderer cleans itself up when map is destroyed
            // For more complex scenarios, you might want a more robust cleanup.
        });

        return () => {
            // In this setup, DirectionsRenderer cleans up after itself when the map changes.
            // If we were creating polylines manually from the response, we'd clear them here.
        };
    }, [map, routes]);

    return null;
};


export function RouteMap({ allRoutes }: RouteMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
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
            >
                <Directions routes={allRoutes} />
                 {allRoutes.flatMap(route => route.path.map((pos, index) => (
                    <AdvancedMarker key={`${route.name}-${index}`} position={pos}>
                        <div style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: route.color,
                            border: '2px solid white',
                            boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                        }} />
                    </AdvancedMarker>
                )))}
            </Map>
        </APIProvider>
    );
}
