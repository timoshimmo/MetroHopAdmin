
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

const Polylines = ({ routes }: { routes: Route[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !routes.length) return;

    const polylines = routes.map(route => {
      const p = new google.maps.Polyline({
        path: route.path,
        strokeColor: route.color,
        strokeOpacity: 0.8,
        strokeWeight: 5,
      });
      p.setMap(map);
      return p;
    });
    
    return () => {
      polylines.forEach(p => p.setMap(null));
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
                styles={mapStyles}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
            >
                <Polylines routes={allRoutes} />
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
