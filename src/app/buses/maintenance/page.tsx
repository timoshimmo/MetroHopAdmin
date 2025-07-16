
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wrench } from "lucide-react";

const maintenanceHistory = [
  { id: "M-98712", busId: "MT-3401", date: "2024-07-15", task: "Oil Change", cost: 150, status: "Completed" },
  { id: "M-98713", busId: "MT-2198", date: "2024-07-20", task: "Brake Pad Replacement", cost: 450, status: "Completed" },
  { id: "M-98714", busId: "MT-5527", date: "2024-07-29", task: "Engine Diagnostics", cost: 200, status: "In Progress" },
  { id: "M-98715", busId: "MT-4815", date: "2024-08-01", task: "Tire Rotation", cost: 80, status: "Scheduled" },
  { id: "M-98716", busId: "MT-6002", date: "2024-08-05", task: "Annual Inspection", cost: 300, status: "Scheduled" },
];

export default function MaintenancePage() {
  return (
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
                        <TableHead>Cost ($)</TableHead>
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
                            <TableCell>{record.cost.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge variant={record.status === 'Completed' ? 'default' : record.status === 'In Progress' ? 'secondary' : 'outline'}>
                                    {record.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
