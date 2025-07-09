"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface JobApplication {
  id: string
  applicantName: string
  postApplied: string
  email: string
  phone: string
  location: string
  qualifications: string
  experience: Array<{
    company: string
    designation: string
    tenure: string
    reasonForLeaving: string
  }>
  status: string
  createdAt: Date
}

export function JobApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications")
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error("Failed to fetch applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading applications...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Job Applications</h2>
        <p className="text-muted-foreground">Manage job applications from candidates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Post Applied</TableHead>
                  <TableHead>Email & Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Qualifications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.applicantName}</TableCell>
                    <TableCell>{application.postApplied}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{application.email}</div>
                        <div className="text-sm text-muted-foreground">{application.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{application.location}</TableCell>
                    <TableCell>{application.qualifications}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
