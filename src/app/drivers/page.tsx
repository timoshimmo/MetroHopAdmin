
'use client'

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Bus, PlusCircle, UserCog, UserCheck, UserX, Users } from "lucide-react";

const drivers = [
  { id: "D-001", name: "Adekunle Adebayo", license: "LIC-123456", contact: "08012345678", assignedBus: "MT-3401", status: "Active" },
  { id: "D-002", name: "Aisha Bello", license: "LIC-789012", contact: "08023456789", assignedBus: "MT-2198", status: "Active" },
  { id: "D-003", name: "Fatima Sani", license: "LIC-345678", contact: "08034567890", assignedBus: "MT-4815", status: "Active" },
  { id: "D-004", name: "Yusuf Ibrahim", license: "LIC-901234", contact: "08045678901", assignedBus: "N/A", status: "On Leave" },
  { id: "D-005", name: "Chidi Nwosu", license: "LIC-567890", contact: "08056789012", assignedBus: "N/A", status: "Available" },
  { id: "D-006", name: "Emeka Okafor", license: "LIC-112233", contact: "08067890123", assignedBus: "MT-5527", status: "Active" },
  { id: "D-007", name: "Kenji Tanaka", license: "LIC-445566", contact: "N/A", assignedBus: "N/A", status: "Outsourced" },
];

const availableDrivers = drivers.filter(d => d.status === 'Available' || d.status === 'On Leave');

const availableBuses = [
    { busId: "MT-6002", name: "Jakande Commuter" },
    { busId: "MT-1088", name: "VGC Shuttle" },
];

export default function DriversPage() {

  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter(d => d.status === 'Active').length;
  const idleDrivers = drivers.filter(d => d.status === 'Available' || d.status === 'On Leave').length;
  const outsourcedDrivers = drivers.filter(d => d.status === 'Outsourced').length;

  const driverStats = [
    { title: "Total Drivers", value: totalDrivers, icon: Users },
    { title: "Active Drivers", value: activeDrivers, icon: UserCheck },
    { title: "Idle / On Leave", value: idleDrivers, icon: UserX },
    { title: "Outsourced Drivers", value: outsourcedDrivers, icon: Briefcase },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {driverStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Users className="size-5 text-primary"/>Driver Management</CardTitle>
            <CardDescription>
              View and manage all drivers in the system.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" />
                Add New Driver
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>
                  Enter the details of the new driver to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="e.g. John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="license" className="text-right">
                    License No.
                  </Label>
                  <Input id="license" placeholder="e.g. LIC-123456" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact
                  </Label>
                  <Input id="contact" placeholder="e.g. 08012345678" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Driver</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                      variant={driver.status === 'Active' ? 'default' : driver.status === 'Available' ? 'secondary' : driver.status === 'Outsourced' ? 'outline' : 'destructive'}
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bus className="size-5 text-primary"/>Assign Driver to Vehicle</CardTitle>
              <CardDescription>
                  Assign available drivers to available buses.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Driver Name</TableHead>
                          <TableHead>Assign Bus</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {availableDrivers.map(driver => (
                          <TableRow key={driver.id}>
                              <TableCell>{driver.name}</TableCell>
                              <TableCell>
                                  <Select>
                                      <SelectTrigger className="w-full sm:w-[180px]">
                                          <SelectValue placeholder="Select a bus" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          {availableBuses.map(bus => (
                                              <SelectItem key={bus.busId} value={bus.busId}>
                                                  {bus.busId}
                                              </SelectItem>
                                          ))}
                                      </SelectContent>
                                  </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Button>Assign</Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserCog className="size-5 text-primary"/>Driver Status Management</CardTitle>
              <CardDescription>
                  Update driver availability and status.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Driver Name</TableHead>
                          <TableHead>Update Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {drivers.map(driver => (
                          <TableRow key={driver.id}>
                              <TableCell>{driver.name}</TableCell>
                              <TableCell>
                                  <Select defaultValue={driver.status}>
                                      <SelectTrigger className="w-full sm:w-[180px]">
                                          <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="Active">Active</SelectItem>
                                          <SelectItem value="Available">Available</SelectItem>
                                          <SelectItem value="On Leave">On Leave</SelectItem>
                                          <SelectItem value="Outsourced">Outsourced</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Button>Update</Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
