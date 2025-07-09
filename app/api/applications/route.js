import { NextResponse } from "next/server"

// Mock applications data
const mockApplications = [
  {
    id: "1",
    applicantName: "John Doe",
    postApplied: "Site Engineer",
    email: "john@example.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    qualifications: "B.Tech Civil Engineering",
    experience: [
      {
        company: "ABC Construction",
        designation: "Junior Engineer",
        tenure: "2 years",
        reasonForLeaving: "Career Growth",
      },
    ],
    createdAt: new Date(),
    status: "pending",
  },
  {
    id: "2",
    applicantName: "Jane Smith",
    postApplied: "Project Manager",
    email: "jane@example.com",
    phone: "+91 9876543211",
    location: "Delhi, India",
    qualifications: "MBA + B.Tech",
    experience: [
      {
        company: "XYZ Builders",
        designation: "Assistant Manager",
        tenure: "3 years",
        reasonForLeaving: "Better Opportunity",
      },
    ],
    createdAt: new Date(),
    status: "reviewed",
  },
]

export async function GET() {
  try {
    return NextResponse.json(mockApplications)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
