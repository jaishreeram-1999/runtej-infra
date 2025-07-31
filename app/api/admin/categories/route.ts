import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Category } from "@/lib/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const categories = await Category.find()
      .populate("parentCategory", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Category.countDocuments()
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      categories,
      total,
      totalPages,
      page,
      limit,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    // Convert "none" or empty string to null
    if (!body.parentCategory || body.parentCategory === "none" || body.parentCategory === "") {
      body.parentCategory = null
    }

    const category = new Category(body)
    await category.save()
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
