
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowRightLeft,
  Bot,
  Bus,
  CalendarClock,
  ChevronDown,
  HandPlatter,
  Headset,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Map,
  Route,
  Users,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { SummarizeForm } from "@/components/summarize-form"
import React from "react"
import { RouteMap } from "@/components/route-map"

const kpis = [
  { title: "Active Buses", value: "42", icon: Bus, change: "+5.2%" },
  { title: "Drivers On-duty", value: "58", icon: Users, change: "+2" },
  { title: "Maintenance Queue", value: "3", icon: Wrench, change: "-1" },
  { title: "Completed Routes", value: "128", icon: Route, change: "+12" },
];

const vehicleStatus = [
  { id: "MT-3401", driver: "Adekunle Adebayo", location: "Lekki Phase 1", status: "On Route", capacity: "85%" },
  { id: "MT-2198", driver: "Aisha Bello", location: "Chevron Drive", status: "Idle", capacity: "0%" },
  { id: "MT-5527", driver: "Emeka Okafor", location: "Depot (Ajah)", status: "Maintenance", capacity: "0%" },
  { id: "MT-4815", driver: "Fatima Sani", location: "VGC", status: "On Route", capacity: "60%" },
  { id: "MT-6002", driver: "Yusuf Ibrahim", location: "Jakande", status: "Idle", capacity: "0%" },
];

const pickupRequests = [
    { name: "Chioma Okoro", from: "Ikate Elegushi", to: "Ajah Market", time: "10:15 AM" },
    { name: "Tunde Adeyemi", from: "Abraham Adesanya", to: "Lekki Toll Gate", time: "10:30 AM" },
    { name: "Bolanle Williams", from: "Sangotedo", to: "Admiralty Way", time: "10:45 AM" },
];

const maintenanceSchedule = [
    { id: "MT-5527", task: "Engine Diagnostics", date: "Today", mechanic: "Bob" },
    { id: "MT-1088", task: "Brake Replacement", date: "Tomorrow", mechanic: "Alice" },
    { id: "MT-3401", task: "Tire Rotation", date: "2 days", mechanic: "Charlie" },
];

const outsourcedDrivers = [
    { name: "Kenji Tanaka", company: "Swift Logistics", contractEnd: "2024-12-31" },
    { name: "Fatima Al-Jamil", company: "Metro Drivers Inc.", contractEnd: "2025-06-30" },
];

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
  },
};

export default function DashboardPage() {
  const [selectedRouteId, setSelectedRouteId] = React.useState<keyof typeof routes>("7B");
  const selectedRoute = routes[selectedRouteId];
  
  return (
    <div className="min-h-screen w-full bg-muted/40">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="size-10 bg-primary/10 text-primary">
                <Bus className="size-5" />
              </Button>
              <div className="flex flex-col">
                <h2 className="text-base font-semibold">MetroTrack</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" isActive>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Route />
                  Routes
                  <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
                <SidebarMenuSub>
                    <SidebarMenuSubItem><SidebarMenuSubButton href="#">All Routes</SidebarMenuSubButton></SidebarMenuSubItem>
                    <SidebarMenuSubItem><SidebarMenuSubButton href="#">Live Map</SidebarMenuSubButton></SidebarMenuSubItem>
                    <SidebarMenuSubItem><SidebarMenuSubButton href="#">Add New Route</SidebarMenuSubButton></SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Users />
                  Drivers
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Wrench />
                  Maintenance
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Headset />
                  Support
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/32x32.png" alt="Admin" data-ai-hint="person portrait" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <main className="flex-1">
            <ScrollArea className="h-[calc(100vh-theme(spacing.14))]">
              <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {kpis.map((kpi) => (
                    <Card key={kpi.title}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className="text-xs text-muted-foreground">{kpi.change} from last month</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-5">
                  <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center gap-2">
                      <Map className="size-5 text-primary" />
                      <CardTitle>Pickup Locations Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[450px] p-0">
                      <RouteMap allRoutes={Object.values(routes)} />
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

                <div className="grid gap-6 lg:grid-cols-2">
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
                            <TableHead>Capacity</TableHead>
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
                              <TableCell>{vehicle.capacity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <HandPlatter className="size-5 text-primary"/>
                        <CardTitle>Pending Pickup Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Accordion type="single" collapsible className="w-full">
                          {pickupRequests.map((req, i) => (
                            <AccordionItem value={`item-${i}`} key={i}>
                              <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                  <Avatar className="size-8">
                                    <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{req.name}</span>
                                  <span className="text-muted-foreground text-sm">at {req.time}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pl-4">
                                <p><strong>From:</strong> {req.from}</p>
                                <p><strong>To:</strong> {req.to}</p>
                                <Button size="sm" className="mt-2">Assign Driver</Button>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                    </CardContent>
                  </Card>
                </div>

                <SummarizeForm />

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <CalendarClock className="size-5 text-primary" />
                            <CardTitle>Vehicle Maintenance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader><TableRow><TableHead>Bus ID</TableHead><TableHead>Task</TableHead><TableHead>Due</TableHead><TableHead>Assigned</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {maintenanceSchedule.map((item) => (
                                        <TableRow key={item.id}><TableCell>{item.id}</TableCell><TableCell>{item.task}</TableCell><TableCell>{item.date}</TableCell><TableCell>{item.mechanic}</TableCell></TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <ArrowRightLeft className="size-5 text-primary" />
                            <CardTitle>Outsourced Drivers</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader><TableRow><TableHead>Driver</TableHead><TableHead>Company</TableHead><TableHead>Contract End</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {outsourcedDrivers.map((item) => (
                                        <TableRow key={item.name}><TableCell>{item.name}</TableCell><TableCell>{item.company}</TableCell><TableCell>{item.contractEnd}</TableCell></TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

              </div>
            </ScrollArea>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
