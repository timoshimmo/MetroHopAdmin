
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Fuel, Users, Wrench, ChevronRight } from "lucide-react";
import Link from "next/link";

const managementCards = [
    { 
        href: "/buses/maintenance", 
        title: "Vehicle Maintenance", 
        description: "Record and track maintenance activities for each vehicle.",
        icon: Wrench 
    },
    { 
        href: "/buses/operations", 
        title: "Daily Operations", 
        description: "View available buses and driver assignments for the day.",
        icon: Users 
    },
    { 
        href: "/buses/fuel", 
        title: "Fuel Monitoring", 
        description: "Analyze fuel consumption records based on distance.",
        icon: Fuel 
    },
]

export default function BusesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {managementCards.map((card) => (
            <Link href={card.href} key={card.title}>
                <Card className="hover:bg-muted/50 transition-colors h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-md bg-primary/10 text-primary">
                                <card.icon className="size-6" />
                            </div>
                            <div>
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription className="mt-1">{card.description}</CardDescription>
                            </div>
                        </div>
                       
                    </CardHeader>
                    <CardContent className="mt-auto flex justify-end">
                         <div className="flex items-center text-sm text-muted-foreground">
                            View Details <ChevronRight className="size-4 ml-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
  );
}
