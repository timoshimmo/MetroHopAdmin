
'use client'

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Headset, PlusCircle } from "lucide-react";

const initialSupportCases = [
  { id: "C-1024", customer: "Adebayo Adekunle", date: "2024-08-01", type: "Complaint", details: "Bus MT-3401 was 20 minutes late.", status: "Resolved", assignedTo: "Support Team A" },
  { id: "C-1025", customer: "Chioma Okeke", date: "2024-08-01", type: "Feedback", details: "Driver was very courteous and helpful.", status: "Closed", assignedTo: "N/A" },
  { id: "C-1026", customer: "Tunde Bakare", date: "2024-08-02", type: "Complaint", details: "A/C was not working on bus MT-2198.", status: "In Progress", assignedTo: "Maintenance" },
  { id: "C-1027", customer: "Fatima Aliyu", date: "2024-08-03", type: "Complaint", details: "Left a personal item on bus MT-4815.", status: "Open", assignedTo: "Support Team B" },
  { id: "C-1028", customer: "Emeka Nwosu", date: "2024-08-04", type: "Feedback", details: "The new app is great and easy to use!", status: "Closed", assignedTo: "N/A" },
];

export default function SupportPage() {
  const [supportCases, setSupportCases] = useState(initialSupportCases);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCase, setNewCase] = useState({
    customerName: "",
    caseType: "",
    details: "",
    assignedTo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewCase(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setNewCase(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCase.customerName && newCase.caseType && newCase.details && newCase.assignedTo) {
      const newEntry = {
        id: `C-${Math.floor(Math.random() * 9000) + 1029}`,
        customer: newCase.customerName,
        date: new Date().toISOString().split('T')[0],
        type: newCase.caseType,
        details: newCase.details,
        status: "Open",
        assignedTo: newCase.assignedTo,
      };
      setSupportCases(prev => [newEntry, ...prev]);
      setNewCase({ customerName: "", caseType: "", details: "", assignedTo: "" });
      setIsDialogOpen(false);
    }
  };

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2" />
                    New Case
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Headset className="size-5"/>Create New Support Case</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to log a new customer complaint or feedback.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input id="customerName" placeholder="Enter customer's full name" required value={newCase.customerName} onChange={handleInputChange} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Case Type</Label>
                    <Select required onValueChange={(value) => handleSelectChange('caseType', value)} value={newCase.caseType}>
                      <SelectTrigger id="caseType">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Complaint">Complaint</SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                        <SelectItem value="Inquiry">Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Case Details</Label>
                    <Textarea id="details" placeholder="Provide a detailed description of the case." rows={6} required value={newCase.details} onChange={handleInputChange}/>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assign To</Label>
                      <Select required onValueChange={(value) => handleSelectChange('assignedTo', value)} value={newCase.assignedTo}>
                          <SelectTrigger id="assignedTo">
                              <SelectValue placeholder="Assign to a team" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Support Team A">Support Team A</SelectItem>
                              <SelectItem value="Support Team B">Support Team B</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                              <SelectItem value="N/A">N/A</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>

                  <DialogFooter>
                      <Button type="submit">
                          Create Case
                      </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
