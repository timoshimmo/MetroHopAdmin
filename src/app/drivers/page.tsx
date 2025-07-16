
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Users } from "lucide-react";

const drivers = [
  { id: "D-001", name: "Adekunle Adebayo", license: "LIC-123456", contact: "08012345678", assignedBus: "MT-3401", status: "Active" },
  { id: "D-002", name: "Aisha Bello", license: "LIC-789012", contact: "08023456789", assignedBus: "MT-2198", status: "Active" },
  { id: "D-003", name: "Fatima Sani", license: "LIC-345678", contact: "08034567890", assignedBus: "MT-4815", status: "Active" },
  { id: "D-004", name: "Yusuf Ibrahim", license: "LIC-901234", contact: "08045678901", assignedBus: "N/A", status: "On Leave" },
  { id: "D-005", name: "Chidi Nwosu", license: "LIC-567890", contact: "08056789012", assignedBus: "N/A", status: "Available" },
  { id: "D-006", name: "Emeka Okafor", license: "LIC-112233", contact: "08067890123", assignedBus: "MT-5527", status: "Active" },
];

export default function DriversPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Users className="size-5 text-primary"/>Driver Management</CardTitle>
            <CardDescription>
              View and manage all drivers in the system.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2" />
            Add New Driver
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>License Number</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Assigned Bus</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.license}</TableCell>
                  <TableCell>{driver.contact}</TableCell>
                  <TableCell>{driver.assignedBus}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={driver.status === 'Active' ? 'default' : driver.status === 'Available' ? 'secondary' : 'destructive'}
                      className={driver.status === 'Active' ? 'bg-green-600/20 text-green-800' : ''}
                    >
                      {driver.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
