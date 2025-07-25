import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import ProjectType from "@/lib/models/project-type"
import {Category} from "@/lib/models/category" // Assuming you have a Category model
import { writeFile } from "fs/promises"
import path from "path"
import {connectDB} from '@/lib/mongodb';



// GET /api/project-types?categoryId=xxx
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")

    if (!categoryId) {
      return NextResponse.json({ success: false, error: "Category ID is required" }, { status: 400 })
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json({ success: false, error: "Invalid category ID" }, { status: 400 })
    }

    const projectTypes = await ProjectType.find({ category: categoryId })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: projectTypes,
    })
  } catch (error) {
    console.error("Error fetching project types:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch project types" }, { status: 500 })
  }
}

// POST /api/project-types
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const formData = await request.formData()
    const name = formData.get("name") as string
    const categoryId = formData.get("categoryId") as string
    const image = formData.get("image") as File | null

    if (!name || !categoryId) {
      return NextResponse.json({ success: false, error: "Name and category are required" }, { status: 400 })
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json({ success: false, error: "Invalid category ID" }, { status: 400 })
    }

    // Check if category exists
    const categoryExists = await Category.findById(categoryId)
    if (!categoryExists) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    let imageUrl = null

    // Handle image upload if provided
    if (image && image.size > 0) {
      try {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const fileName = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
        const uploadDir = path.join(process.cwd(), "public/uploads/project-types")

        // Create directory if it doesn't exist
        const fs = require("fs")
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }

        const filePath = path.join(uploadDir, fileName)
        await writeFile(filePath, buffer)
        imageUrl = `/uploads/project-types/${fileName}`
      } catch (uploadError) {
        console.error("Image upload error:", uploadError)
        return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 })
      }
    }

    // Create new project type
    const newProjectType = new ProjectType({
      name,
      slug,
      category: categoryId,
      image: imageUrl,
    })

    const savedProjectType = await newProjectType.save()
    const populatedProjectType = await ProjectType.findById(savedProjectType._id)
      .populate("category", "name slug")
      .lean()

    return NextResponse.json(
      {
        success: true,
        data: populatedProjectType,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating project type:", error)

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Project type with this name already exists in the selected category" },
        { status: 409 },
      )
    }

    return NextResponse.json({ success: false, error: "Failed to create project type" }, { status: 500 })
  }
}
