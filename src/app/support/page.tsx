
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Headset, PlusCircle } from "lucide-react";
import Link from "next/link";

const supportCases = [
  { id: "C-1024", customer: "Adebayo Adekunle", date: "2024-08-01", type: "Complaint", details: "Bus MT-3401 was 20 minutes late.", status: "Resolved", assignedTo: "Support Team A" },
  { id: "C-1025", customer: "Chioma Okeke", date: "2024-08-01", type: "Feedback", details: "Driver was very courteous and helpful.", status: "Closed", assignedTo: "N/A" },
  { id: "C-1026", customer: "Tunde Bakare", date: "2024-08-02", type: "Complaint", details: "A/C was not working on bus MT-2198.", status: "In Progress", assignedTo: "Maintenance" },
  { id: "C-1027", customer: "Fatima Aliyu", date: "2024-08-03", type: "Complaint", details: "Left a personal item on bus MT-4815.", status: "Open", assignedTo: "Support Team B" },
  { id: "C-1028", customer: "Emeka Nwosu", date: "2024-08-04", type: "Feedback", details: "The new app is great and easy to use!", status: "Closed", assignedTo: "N/A" },
];

export default function SupportPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2"><Headset className="size-5 text-primary"/>Customer Support Cases</CardTitle>
                <CardDescription>
                    Track and manage customer complaints and feedback.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="/support/new">
                    <PlusCircle className="mr-2" />
                    New Case
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned To</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {supportCases.map((caseItem) => (
                        <TableRow key={caseItem.id}>
                            <TableCell>{caseItem.id}</TableCell>
                            <TableCell>{caseItem.customer}</TableCell>
                            <TableCell>{caseItem.date}</TableCell>
                            <TableCell>
                                <Badge variant={caseItem.type === 'Complaint' ? 'destructive' : 'secondary'} className={caseItem.type === 'Feedback' ? 'bg-blue-600/20 text-blue-800' : ''}>
                                    {caseItem.type}
                                </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{caseItem.details}</TableCell>
                            <TableCell>
                                <Badge 
                                    variant={caseItem.status === 'Resolved' ? 'default' : caseItem.status === 'Open' ? 'outline' : caseItem.status === 'In Progress' ? 'secondary' : 'destructive'}
                                    className={caseItem.status === 'Resolved' || caseItem.status === 'Closed' ? 'bg-green-600/20 text-green-800' : ''}
                                >
                                    {caseItem.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{caseItem.assignedTo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
