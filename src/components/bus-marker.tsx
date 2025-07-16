
'use client';

import React from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

interface BusMarkerProps {
    position: { lat: number, lng: number };
    color: string;
}

export function BusMarker({ position, color }: BusMarkerProps) {
    return (
        <AdvancedMarker position={position}>
            <div className="flex items-center justify-center rounded-full bg-white p-1 shadow-lg"
                 style={{ border: `2px solid ${color}` }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v3c0 .6.4 1 1 1h2"/>
                    <path d="M10 17h4"/>
                    <path d="M3 11V9c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2"/>
                    <path d="M5 15v-1.5"/>
                    <path d="M19 15v-1.5"/>
                    <path d="M12 5V2"/>
                    <path d="M5 5V2"/>
                    <path d="M19 5V2"/>
                </svg>
            </div>
        </AdvancedMarker>
    );
}
