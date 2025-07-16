
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fuel } from "lucide-react";

const fuelData = [
  { busId: "MT-3401", date: "2024-07-29", kmDriven: 152.3, fuelAdded: 30.5, mpg: 4.99 },
  { busId: "MT-2198", date: "2024-07-29", kmDriven: 89.1, fuelAdded: 18.2, mpg: 4.89 },
  { busId: "MT-4815", date: "2024-07-29", kmDriven: 210.5, fuelAdded: 42.0, mpg: 5.01 },
  { busId: "MT-6002", date: "2024-07-28", kmDriven: 175.0, fuelAdded: 35.5, mpg: 4.93 },
  { busId: "MT-5527", date: "2024-07-28", kmDriven: 0, fuelAdded: 0, mpg: 0 },
];

export default function FuelMonitoringPage() {
  return (
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
  );
}
