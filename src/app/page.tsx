

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
  DollarSign,
  Droplets,
  Fuel,
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
import { RevenueChart } from "@/components/revenue-chart"

const kpis = [
  { title: "Active Buses", value: "42", icon: Bus, change: "+5.2%" },
  { title: "Drivers On-duty", value: "58", icon: Users, change: "+2" },
  { title: "Maintenance Queue", value: "3", icon: Wrench, change: "-1" },
  { title: "Completed Routes", value: "128", icon: Route, change: "+12" },
];

const vehicleStatus = [
  { id: "MT-3401", driver: "Adekunle Adebayo", location: "Lekki Phase 1", status: "On Route", occupancy: "85%", seatCapacity: "60 Seater" },
  { id: "MT-2198", driver: "Aisha Bello", location: "Chevron Drive", status: "Idle", occupancy: "0%", seatCapacity: "60 Seater" },
  { id: "MT-5527", driver: "Emeka Okafor", location: "Depot (Ajah)", status: "Maintenance", occupancy: "0%", seatCapacity: "45 Seater" },
  { id: "MT-4815", driver: "Fatima Sani", location: "VGC", status: "On Route", occupancy: "60%", seatCapacity: "60 Seater" },
  { id: "MT-6002", driver: "Yusuf Ibrahim", location: "Jakande", status: "Idle", occupancy: "0%", seatCapacity: "45 Seater" },
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

const revenueData = {
  "7d": [
    { vehicleId: "MT-3401", revenue: 280000 },
    { vehicleId: "MT-2198", revenue: 195000 },
    { vehicleId: "MT-5527", revenue: 50000 },
    { vehicleId: "MT-4815", revenue: 350000 },
    { vehicleId: "MT-6002", revenue: 120000 },
    { vehicleId: "MT-1088", revenue: 95000 },
  ],
  "30d": [
    { vehicleId: "MT-3401", revenue: 1200000 },
    { vehicleId: "MT-2198", revenue: 850000 },
    { vehicleId: "MT-5527", revenue: 200000 },
    { vehicleId: "MT-4815", revenue: 1500000 },
    { vehicleId: "MT-6002", revenue: 550000 },
    { vehicleId: "MT-1088", revenue: 420000 },
  ],
  "90d": [
    { vehicleId: "MT-3401", revenue: 3500000 },
    { vehicleId: "MT-2198", revenue: 2400000 },
    { vehicleId: "MT-5527", revenue: 600000 },
    { vehicleId: "MT-4815", revenue: 4200000 },
    { vehicleId: "MT-6002", revenue: 1800000 },
    { vehicleId: "MT-1088", revenue: 1200000 },
  ],
};

const routes = {
  "7B": {
    name: "Lekki-Ajah Express",
    color: "#FF5733",
    status: "Active",
    path: [
      { lat: 6.4474, lng: 3.4723 },
      { lat: 6.4326, lng: 3.5028 },
      { lat: 6.4293, lng: 3.5499 },
      { lat: 6.4428, lng: 3.5824 },
      { lat: 6.4599, lng: 3.5931 },
    ],
  },
  "12A": {
    name: "Ikate-Sangotedo Loop",
    color: "#33C4FF",
    status: "Active",
    path: [
      { lat: 6.4333, lng: 3.4833 },
      { lat: 6.4340, lng: 3.5132 },
      { lat: 6.4299, lng: 3.5352 },
      { lat: 6.4674, lng: 3.5816 },
      { lat: 6.4950, lng: 3.5700 },
    ],
  },
  "5C": {
    name: "Admiralty Commuter",
    color: "#8E44AD",
    status: "Active",
    path: [
      { lat: 6.4450, lng: 3.4699 },
      { lat: 6.4528, lng: 3.4400 },
      { lat: 6.4495, lng: 3.4247 },
      { lat: 6.4297, lng: 3.4675 },
      { lat: 6.4172, lng: 3.4688 },
    ],
  },
};

export default function DashboardPage() {
  const [revenueDuration, setRevenueDuration] = React.useState<keyof typeof revenueData>("30d");
  
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
                <SidebarMenuButton href="/" isActive>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/buses">
                  <Bus />
                  <span>Buses</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/routes">
                  <Route />
                  Routes
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/drivers">
                  <Users />
                  Drivers
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/maintenance">
                  <Wrench />
                  Maintenance
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/support">
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
                <DropdownMenuItem asChild>
                  <Link href="/support" className="flex items-center">
                    <Headset className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </Link>
                </DropdownMenuItem>
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

                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                      <Map className="size-5 text-primary" />
                      <CardTitle>Pickup Locations Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                      <div className="h-[400px]">
                        <RouteMap allRoutes={Object.values(routes)} />
                      </div>
                      <div className="p-4 border-t">
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                              {Object.values(routes).map((route) => (
                                  <div key={route.name} className="flex items-center gap-2">
                                      <div
                                          className="w-3 h-3 rounded-full"
                                          style={{ backgroundColor: route.color }}
                                      />
                                      <span className="text-xs font-medium">{route.name}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </CardContent>
                </Card>

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
                    <CardHeader className="flex flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <DollarSign className="size-5 text-primary"/>
                            <CardTitle>Vehicle Revenue</CardTitle>
                        </div>
                        <Select value={revenueDuration} onValueChange={(value) => setRevenueDuration(value as keyof typeof revenueData)}>
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
                       <RevenueChart data={revenueData[revenueDuration]} />
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
