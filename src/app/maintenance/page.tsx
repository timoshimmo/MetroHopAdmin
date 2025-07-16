
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fuel, Wrench } from "lucide-react";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FuelConsumptionChart } from "@/components/fuel-consumption-chart";

const maintenanceHistory = [
  { id: "M-98712", busId: "MT-3401", date: "2024-07-15", task: "Oil Change", cost: 15000, status: "Completed" },
  { id: "M-98713", busId: "MT-2198", date: "2024-07-20", task: "Brake Pad Replacement", cost: 45000, status: "Completed" },
  { id: "M-98714", busId: "MT-5527", date: "2024-07-29", task: "Engine Diagnostics", cost: 20000, status: "In Progress" },
  { id: "M-98715", busId: "MT-4815", date: "2024-08-01", task: "Tire Rotation", cost: 8000, status: "Scheduled" },
  { id: "M-98716", busId: "MT-6002", date: "2024-08-05", task: "Annual Inspection", cost: 30000, status: "Scheduled" },
];

const fuelData = [
  { busId: "MT-3401", date: "2024-07-29", kmDriven: 152.3, fuelAdded: 30.5, mpg: 4.99 },
  { busId: "MT-2198", date: "2024-07-29", kmDriven: 89.1, fuelAdded: 18.2, mpg: 4.89 },
  { busId: "MT-4815", date: "2024-07-29", kmDriven: 210.5, fuelAdded: 42.0, mpg: 5.01 },
  { busId: "MT-6002", date: "2024-07-28", kmDriven: 175.0, fuelAdded: 35.5, mpg: 4.93 },
  { busId: "MT-5527", date: "2024-07-28", kmDriven: 0, fuelAdded: 0, mpg: 0 },
  { busId: "MT-1088", date: "2024-07-28", kmDriven: 120.0, fuelAdded: 25.0, mpg: 4.80 },
];

const fuelConsumptionData = {
  "7d": [
    { busId: "MT-3401", kmPerLiter: 5.0 },
    { busId: "MT-2198", kmPerLiter: 4.9 },
    { busId: "MT-5527", kmPerLiter: 0 },
    { busId: "MT-4815", kmPerLiter: 5.1 },
    { busId: "MT-6002", kmPerLiter: 4.8 },
    { busId: "MT-1088", kmPerLiter: 4.85 },
  ],
  "30d": [
    { busId: "MT-3401", kmPerLiter: 4.95 },
    { busId: "MT-2198", kmPerLiter: 4.85 },
    { busId: "MT-5527", kmPerLiter: 0 },
    { busId: "MT-4815", kmPerLiter: 5.05 },
    { busId: "MT-6002", kmPerLiter: 4.75 },
    { busId: "MT-1088", kmPerLiter: 4.82 },
  ],
  "90d": [
    { busId: "MT-3401", kmPerLiter: 4.98 },
    { busId: "MT-2198", kmPerLiter: 4.88 },
    { busId: "MT-5527", kmPerLiter: 0 },
    { busId: "MT-4815", kmPerLiter: 5.08 },
    { busId: "MT-6002", kmPerLiter: 4.78 },
    { busId: "MT-1088", kmPerLiter: 4.84 },
  ],
};


export default function MaintenancePage() {
  const [fuelDuration, setFuelDuration] = React.useState<keyof typeof fuelConsumptionData>("30d");

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2"><Wrench className="size-5 text-primary"/>Maintenance Records</CardTitle>
                    <CardDescription>
                        Track and manage all vehicle maintenance activities.
                    </CardDescription>
                </div>
                <Button>Add New Record</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Record ID</TableHead>
                            <TableHead>Bus ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Cost (₦)</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {maintenanceHistory.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.id}</TableCell>
                                <TableCell>{record.busId}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>{record.task}</TableCell>
                                <TableCell>₦{record.cost.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={record.status === 'Completed' ? 'default' : record.status === 'In Progress' ? 'secondary' : 'outline'} className={record.status === 'Completed' ? 'bg-green-600/20 text-green-800' : ''}>
                                        {record.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Fuel className="size-5 text-primary"/>
                    <CardTitle>Fuel Consumption</CardTitle>
                </div>
                <Select value={fuelDuration} onValueChange={(value) => setFuelDuration(value as keyof typeof fuelConsumptionData)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
               <FuelConsumptionChart data={fuelConsumptionData[fuelDuration]} />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Fuel className="size-5 text-primary"/>Fuel Consumption Records</CardTitle>
                <CardDescription>
                    Review fuel consumption records for each bus based on kilometers driven.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bus ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>KM Driven</TableHead>
                            <TableHead>Fuel Added (Liters)</TableHead>
                            <TableHead>KM per Liter</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fuelData.map((record) => (
                            <TableRow key={record.busId + record.date}>
                                <TableCell>{record.busId}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>{record.kmDriven.toFixed(1)}</TableCell>
                                <TableCell>{record.fuelAdded.toFixed(1)}</TableCell>
                                <TableCell>{record.mpg.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
