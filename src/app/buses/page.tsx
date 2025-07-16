
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Bus, CircleDot, PlusCircle, Wrench, Zap } from "lucide-react";
import { differenceInDays, parseISO } from 'date-fns';

const busDetails = [
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
    { driver: "Kenji Tanaka", company: "Swift Logistics", cost: "₦1,200,000", startDate: "2024-07-01", endDate: "2024-09-30" },
    { driver: "Fatima Al-Jamil", company: "Metro Drivers Inc.", cost: "₦2,500,000", startDate: "2024-06-15", endDate: "2024-12-14" },
    { driver: "Alex Johnson", company: "City Tours Co.", cost: "₦450,000", startDate: "2024-08-01", endDate: "2024-08-31" },
].map(rental => ({
    ...rental,
    duration: differenceInDays(parseISO(rental.endDate), parseISO(rental.startDate)),
}));


export default function BusesPage() {

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
              <Button>
                  <PlusCircle className="mr-2" />
                  Add New Bus
              </Button>
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

      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bus className="size-5 text-primary"/>Daily Operations</CardTitle>
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
                        <TableHead>Hiring Company</TableHead>
                        <TableHead>Duration (days)</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicleRentals.map((rental, index) => (
                        <TableRow key={index}>
                            <TableCell>{rental.driver}</TableCell>
                            <TableCell>{rental.company}</TableCell>
                            <TableCell>{rental.duration}</TableCell>
                            <TableCell>{rental.cost}</TableCell>
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
