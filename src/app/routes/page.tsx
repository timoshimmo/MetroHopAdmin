
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, ListOrdered, Map, PlusCircle, Route } from "lucide-react";
import React from "react";
import { RouteMap } from "@/components/route-map";

const routes = {
  "7B": {
    name: "Lekki-Ajah Express",
    color: "#FF5733", // Red-Orange
    path: [
      { lat: 6.4474, lng: 3.4723 }, // Lekki Phase 1
      { lat: 6.4326, lng: 3.5028 }, // Chevron
      { lat: 6.4293, lng: 3.5499 }, // VGC
      { lat: 6.4428, lng: 3.5824 }, // Abraham Adesanya
      { lat: 6.4599, lng: 3.5931 }, // Ajah Bustop
    ],
    stops: [
      { stop: 1, name: "Lekki Phase 1", time: "10:05 AM", status: "completed" },
      { stop: 2, name: "Chevron", time: "10:12 AM", status: "completed" },
      { stop: 3, name: "VGC", time: "10:20 AM", status: "current" },
      { stop: 4, name: "Abraham Adesanya", time: "10:35 AM", status: "upcoming" },
      { stop: 5, name: "Ajah Bustop", time: "10:45 AM", status: "upcoming" },
    ],
    status: "Active",
    busesAssigned: 5,
  },
  "12A": {
    name: "Ikate-Sangotedo Loop",
    color: "#33C4FF", // Light Blue
    path: [
      { lat: 6.4333, lng: 3.4833 }, // Ikate
      { lat: 6.4340, lng: 3.5132 }, // Jakande
      { lat: 6.4299, lng: 3.5352 }, // Igbo Efon
      { lat: 6.4674, lng: 3.5816 }, // LBS
      { lat: 6.4950, lng: 3.5700 }, // Sangotedo Market
    ],
    stops: [
      { stop: 1, name: "Ikate", time: "11:00 AM", status: "completed" },
      { stop: 2, name: "Jakande", time: "11:10 AM", status: "current" },
      { stop: 3, name: "Igbo Efon", time: "11:20 AM", status: "upcoming" },
      { stop: 4, name: "LBS", time: "11:35 AM", status: "upcoming" },
      { stop: 5, name: "Sangotedo Market", time: "11:50 AM", status: "upcoming" },
    ],
    status: "Active",
    busesAssigned: 4,
  },
  "5C": {
    name: "Admiralty Commuter",
    color: "#8E44AD", // Purple
    path: [
      { lat: 6.4450, lng: 3.4699 }, // Admiralty Way
      { lat: 6.4528, lng: 3.4400 }, // Lekki-Ikoyi Link Bridge
      { lat: 6.4495, lng: 3.4247 }, // Maroko
      { lat: 6.4297, lng: 3.4675 }, // Lekki Arts & Crafts Market
      { lat: 6.4172, lng: 3.4688 }, // Elegushi Beach
    ],
    stops: [
      { stop: 1, name: "Admiralty Way", time: "09:30 AM", status: "completed" },
      { stop: 2, name: "Lekki-Ikoyi Link Bridge", time: "09:45 AM", status: "completed" },
      { stop: 3, name: "Maroko", time: "09:55 AM", status: "completed" },
      { stop: 4, name: "Lekki Arts & Crafts Market", time: "10:05 AM", status: "current" },
      { stop: 5, name: "Elegushi Beach", time: "10:15 AM", status: "upcoming" },
    ],
    status: "Inactive",
    busesAssigned: 0,
  },
};

const tripFares = [
    { route: "Lekki-Ajah Express", pickup: "Lekki Phase 1", dropoff: "VGC", fare: 300 },
    { route: "Lekki-Ajah Express", pickup: "Chevron", dropoff: "Ajah Bustop", fare: 250 },
    { route: "Ikate-Sangotedo Loop", pickup: "Ikate", dropoff: "LBS", fare: 350 },
    { route: "Ikate-Sangotedo Loop", pickup: "Jakande", dropoff: "Sangotedo Market", fare: 300 },
    { route: "Admiralty Commuter", pickup: "Admiralty Way", dropoff: "Maroko", fare: 200 },
    { route: "Admiralty Commuter", pickup: "Lekki Arts & Crafts Market", dropoff: "Elegushi Beach", fare: 150 },
];

export default function RoutesPage() {
    const [selectedRouteId, setSelectedRouteId] = React.useState<keyof typeof routes>("7B");
    const selectedRoute = routes[selectedRouteId];

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><Route className="size-5 text-primary"/>All Routes</CardTitle>
                        <CardDescription>
                            Manage and view all bus routes.
                        </CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Add New Route
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Route ID</TableHead>
                                <TableHead>Route Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Buses Assigned</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(routes).map(([id, route]) => (
                                <TableRow key={id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }} />
                                            {id}
                                        </div>
                                    </TableCell>
                                    <TableCell>{route.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={route.status === 'Active' ? 'default' : 'secondary'} className={route.status === 'Active' ? 'bg-green-600/20 text-green-800' : ''}>
                                            {route.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{route.busesAssigned}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><DollarSign className="size-5 text-primary"/>Trip Fares</CardTitle>
                    <CardDescription>
                        Fare matrix for different pickup and drop-off points.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Route</TableHead>
                                <TableHead>Pickup Point</TableHead>
                                <TableHead>Drop-off Point</TableHead>
                                <TableHead>Fare (₦)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tripFares.map((fare, index) => (
                                <TableRow key={index}>
                                    <TableCell>{fare.route}</TableCell>
                                    <TableCell>{fare.pickup}</TableCell>
                                    <TableCell>{fare.dropoff}</TableCell>
                                    <TableCell>₦{fare.fare.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center gap-2">
                    <Map className="size-5 text-primary" />
                    <CardTitle>Pickup Locations Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-[400px]">
                    <RouteMap allRoutes={Object.values(routes)} />
                    </div>
                    <div className="p-4 border-t">
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {Object.values(routes).map((route) => (
                                <div key={route.name} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: route.color }}
                                    />
                                    <span className="text-xs font-medium">{route.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                    <ListOrdered className="size-5 text-primary" />
                    <CardTitle>Sequential Drop-off Route</CardTitle>
                    </div>
                    <Select value={selectedRouteId} onValueChange={(value) => setSelectedRouteId(value as keyof typeof routes)}>
                        <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a route" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(routes).map(([id, route]) => (
                            <SelectItem key={id} value={id}>Route {id}: {route.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Displaying stops for Route {selectedRouteId}: {selectedRoute.name}</p>
                    <ol className="space-y-4">
                        {selectedRoute.stops.map((item) => (
                            <li key={item.stop} className="flex items-start gap-3">
                                <div className={`flex size-8 items-center justify-center rounded-full ${item.status === 'completed' ? 'bg-primary/20 text-primary' : item.status === 'current' ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                                    {item.stop}
                                </div>
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </CardContent>
                </Card>
            </div>
        </div>
    )
}
