import { NextResponse } from "next/server"

// Mock data - replace with actual database queries
export async function GET() {
  try {
    // In a real application, you would query your database here
    const stats = {
      totalApplications: 156,
      totalQuotesRequested: 89,
      totalTestimonials: 45,
      totalProjectsCompleted: 1000,
      buildingsConstructed: 520,
      workersEmployed: 200,
      yearsOfExperience: 26,
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
