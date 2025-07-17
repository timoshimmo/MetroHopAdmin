
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Bus, CircleDot, PlusCircle, Wrench, Zap, User, MapPin, Percent, Users as UsersIcon } from "lucide-react";
import { differenceInDays, parseISO } from 'date-fns';
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialBusDetails = [
  { busId: "MT-3401", name: "Lekki Express", color: "Red-Orange", plateNumber: "LND-101AB" },
  { busId: "MT-2198", name: "Ikate Loop", color: "Light Blue", plateNumber: "KJA-202BC" },
  { busId: "MT-4815", name: "Admiralty Rider", color: "Purple", plateNumber: "FST-303CD" },
  { busId: "MT-6002", name: "Jakande Commuter", color: "Green", plateNumber: "IKD-404DE" },
  { busId: "MT-1088", name: "VGC Shuttle", color: "Yellow", plateNumber: "EPE-505EF" },
  { busId: "MT-5527", name: "Depot Runner", color: "Gray", plateNumber: "MUS-606FG" },
];

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

const vehicleRentals = [
    { driver: "Kenji Tanaka", busId: "MT-1088", cost: "₦1,200,000", startDate: "2024-07-01", endDate: "2024-09-30" },
    { driver: "Fatima Al-Jamil", busId: "MT-6002", cost: "₦2,500,000", startDate: "2024-06-15", endDate: "2024-12-14" },
    { driver: "Alex Johnson", busId: "MT-4815", cost: "₦450,000", startDate: "2024-08-01", endDate: "2024-08-31" },
].map(rental => {
    const duration = differenceInDays(parseISO(rental.endDate), parseISO(rental.startDate));
    const costNumeric = Number(rental.cost.replace(/[^0-9.-]+/g, ""));
    const costPerDay = duration > 0 ? costNumeric / duration : 0;
    return {
        ...rental,
        duration,
        costPerDay: `₦${Math.round(costPerDay).toLocaleString()}`,
    };
});


export default function BusesPage() {
  const [busDetails, setBusDetails] = useState(initialBusDetails);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBus, setNewBus] = useState({ name: "", color: "", plateNumber: "" });

  const totalBuses = busDetails.length;
  const operationalBuses = dailyOperations.filter(op => op.status === 'On Route').length;
  const maintenanceBuses = dailyOperations.filter(op => op.status === 'Maintenance').length;
  const idleBuses = dailyOperations.filter(op => op.status === 'Available').length;
  
  const busStats = [
    { title: "Total Buses", value: totalBuses, icon: Bus },
    { title: "Operational", value: operationalBuses, icon: CircleDot },
    { title: "Under Maintenance", value: maintenanceBuses, icon: Wrench },
    { title: "Idle", value: idleBuses, icon: Zap },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewBus(prev => ({ ...prev, [id]: value }));
  };

  const handleAddBus = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBus.name && newBus.color && newBus.plateNumber) {
      const newEntry = {
        busId: `MT-${Math.floor(Math.random() * 9000) + 1000}`,
        name: newBus.name,
        color: newBus.color,
        plateNumber: newBus.plateNumber,
      };
      setBusDetails(prev => [newEntry, ...prev]);
      setNewBus({ name: "", color: "", plateNumber: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {busStats.map((stat) => (
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
                  <CardTitle className="flex items-center gap-2"><Bus className="size-5 text-primary"/>Bus Fleet</CardTitle>
                  <CardDescription>
                      Complete list of all buses in the fleet.
                  </CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                      <PlusCircle className="mr-2" />
                      Add New Bus
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Bus</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new bus to add it to the fleet.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddBus}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Bus Name</Label>
                        <Input id="name" placeholder="e.g. Lekki Shuttle" className="col-span-3" value={newBus.name} onChange={handleInputChange} required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="color" className="text-right">Color</Label>
                        <Input id="color" placeholder="e.g. Blue" className="col-span-3" value={newBus.color} onChange={handleInputChange} required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="plateNumber" className="text-right">Plate Number</Label>
                        <Input id="plateNumber" placeholder="e.g. ABC-123XY" className="col-span-3" value={newBus.plateNumber} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Bus</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Bus ID</TableHead>
                          <TableHead>Bus Name</TableHead>
                          <TableHead>Color</TableHead>
                          <TableHead>Plate Number</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {busDetails.map((bus) => (
                          <TableRow key={bus.busId}>
                              <TableCell>{bus.busId}</TableCell>
                              <TableCell>{bus.name}</TableCell>
                              <TableCell>
                                  <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: bus.color.split('-')[0].toLowerCase() }} />
                                      {bus.color}
                                  </div>
                              </TableCell>
                              <TableCell>{bus.plateNumber}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bus className="size-5 text-primary"/>Daily Operations</CardTitle>
                <CardDescription>
                    Overview of available buses and assigned drivers for today's operations.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-72">
                  <div className="space-y-4">
                    {dailyOperations.map((op) => (
                      <Card key={op.busId}>
                        <CardHeader className="pb-4">
                          <CardTitle className="text-base font-semibold">{op.busId}</CardTitle>
                          <CardDescription>{op.assignment}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Driver:</span>
                            <span>{op.driver}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant={op.status === 'On Route' ? 'default' : op.status === 'Available' ? 'secondary' : 'destructive'}  className={op.status === 'On Route' ? 'bg-green-600/20 text-green-800' : ''}>
                                {op.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
              </ScrollArea>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bus className="size-5 text-primary"/>Live Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-72">
                <div className="space-y-4">
                  {vehicleStatus.map((vehicle) => (
                    <Card key={vehicle.id}>
                      <CardHeader>
                          <div className="flex items-center justify-between">
                              <CardTitle className="text-base font-bold">{vehicle.id}</CardTitle>
                              <Badge variant={vehicle.status === 'On Route' ? 'default' : vehicle.status === 'Idle' ? 'secondary' : 'destructive'} className={vehicle.status === 'On Route' ? 'bg-green-600/20 text-green-800' : ''}>{vehicle.status}</Badge>
                          </div>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{vehicle.driver}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{vehicle.location}</span>
                          </div>
                        <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Occupancy: {vehicle.occupancy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <UsersIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{vehicle.seatCapacity}</span>
                          </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Briefcase className="size-5 text-primary"/>Vehicle Rentals</CardTitle>
            <CardDescription>
                Details of buses outsourced for rental services.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Outsourced Driver</TableHead>
                        <TableHead>Bus ID</TableHead>
                        <TableHead>Duration (days)</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead>Cost per Day</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicleRentals.map((rental, index) => (
                        <TableRow key={index}>
                            <TableCell>{rental.driver}</TableCell>
                            <TableCell>{rental.busId}</TableCell>
                            <TableCell>{rental.duration}</TableCell>
                            <TableCell>{rental.cost}</TableCell>
                            <TableCell>{rental.costPerDay}</TableCell>
                            <TableCell>{rental.startDate}</TableCell>
                            <TableCell>{rental.endDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
