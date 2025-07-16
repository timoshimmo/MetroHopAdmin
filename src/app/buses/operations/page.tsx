
'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";
import BusesLayout from "../layout";

const dailyOperations = [
  { busId: "MT-3401", driver: "Adekunle Adebayo", status: "On Route", assignment: "Lekki-Ajah Express" },
  { busId: "MT-2198", driver: "Aisha Bello", status: "On Route", assignment: "Ikate-Sangotedo Loop" },
  { busId: "MT-4815", driver: "Fatima Sani", status: "On Route", assignment: "Admiralty Commuter" },
  { busId: "MT-6002", driver: "Yusuf Ibrahim", status: "Available", assignment: "N/A" },
  { busId: "MT-1088", driver: "Chidi Nwosu", status: "Available", assignment: "N/A" },
  { busId: "MT-5527", driver: "Emeka Okafor", status: "Maintenance", assignment: "N/A" },
];

export default function OperationsPage() {
  return (
    <BusesLayout pageTitle="Daily Operations">
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
    </BusesLayout>
  );
}
