import { NextResponse } from "next/server"

// Mock services data
const mockServices = [
  {
    id: "1",
    title: "Row Houses",
    category: "Housing & Residential",
    description: "Modern row houses with contemporary design",
    image: "/placeholder.svg?height=200&width=300",
    subcategories: ["2BHK", "3BHK", "4BHK"],
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Sports Complex",
    category: "Public Spaces",
    description: "Complete sports facilities with modern amenities",
    image: "/placeholder.svg?height=200&width=300",
    subcategories: ["Indoor", "Outdoor", "Swimming Pool"],
    isActive: true,
    createdAt: new Date(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(mockServices)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()

    // In a real application, you would save to database here
    const newService = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    }

    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
