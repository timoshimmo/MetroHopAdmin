
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Headset } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewSupportCasePage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here,
    // like sending the data to your backend.
    // For this demo, we'll just navigate back to the support page.
    router.push("/support")
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Headset className="size-5 text-primary"/>Create New Support Case</CardTitle>
          <CardDescription>
            Fill out the form below to log a new customer complaint or feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input id="customerName" placeholder="Enter customer's full name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="caseType">Case Type</Label>
              <Select required>
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
              <Textarea id="details" placeholder="Provide a detailed description of the case." rows={6} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Select required>
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

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit">
                    Create Case
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
