
'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bus, Users } from "lucide-react";

const dailyOperations = [
  { busId: "MT-3401", driver: "Adekunle Adebayo", status: "On Route", assignment: "Lekki-Ajah Express" },
  { busId: "MT-2198", driver: "Aisha Bello", status: "On Route", assignment: "Ikate-Sangotedo Loop" },
  { busId: "MT-4815", driver: "Fatima Sani", status: "On Route", assignment: "Admiralty Commuter" },
  { busId: "MT-6002", driver: "Yusuf Ibrahim", status: "Available", assignment: "N/A" },
  { busId: "MT-1088", driver: "Chidi Nwosu", status: "Available", assignment: "N/A" },
  { busId: "MT-5527", driver: "Emeka Okafor", status: "Maintenance", assignment: "N/A" },
];

const vehicleStatus = [
  { id: "MT-3401", driver: "Adekunle Adebayo", location: "Lekki Phase 1", status: "On Route", occupancy: "85%", seatCapacity: "60 Seater" },
  { id: "MT-2198", driver: "Aisha Bello", location: "Chevron Drive", status: "Idle", occupancy: "0%", seatCapacity: "60 Seater" },
  { id: "MT-5527", driver: "Emeka Okafor", location: "Depot (Ajah)", status: "Maintenance", occupancy: "0%", seatCapacity: "45 Seater" },
  { id: "MT-4815", driver: "Fatima Sani", location: "VGC", status: "On Route", occupancy: "60%", seatCapacity: "60 Seater" },
  { id: "MT-6002", driver: "Yusuf Ibrahim", location: "Jakande", status: "Idle", occupancy: "0%", seatCapacity: "45 Seater" },
];


export default function BusesPage() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="size-5 text-primary"/>Drivers & Buses on Site</CardTitle>
                <CardDescription>
                    Overview of available buses and assigned drivers for today's operations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bus ID</TableHead>
                            <TableHead>Assigned Driver</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Current Assignment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dailyOperations.map((op) => (
                            <TableRow key={op.busId}>
                                <TableCell>{op.busId}</TableCell>
                                <TableCell>{op.driver}</TableCell>
                                <TableCell>
                                    <Badge variant={op.status === 'On Route' ? 'default' : op.status === 'Available' ? 'secondary' : 'destructive'}  className={op.status === 'On Route' ? 'bg-green-600/20 text-green-800' : ''}>
                                        {op.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{op.assignment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <Bus className="size-5 text-primary"/>
                <CardTitle>Live Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Bus ID</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Seat Capacity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicleStatus.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.id}</TableCell>
                        <TableCell>{vehicle.driver}</TableCell>
                        <TableCell>{vehicle.location}</TableCell>
                        <TableCell>
                        <Badge variant={vehicle.status === 'On Route' ? 'default' : vehicle.status === 'Idle' ? 'secondary' : 'destructive'} className={vehicle.status === 'On Route' ? 'bg-green-600/20 text-green-800' : ''}>{vehicle.status}</Badge>
                        </TableCell>
                        <TableCell>{vehicle.occupancy}</TableCell>
                        <TableCell>{vehicle.seatCapacity}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
