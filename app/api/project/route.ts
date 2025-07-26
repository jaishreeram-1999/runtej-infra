import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // make sure this connects to MongoDB
import { Project } from "@/lib/models/project";

// 🟢 GET: Fetch all projects
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().populate("category").sort({ createdAt: -1 });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// 🔵 POST: Create new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      name,
      address,
      mixedUseProjectType,
      propertyType,
      floor,
      sampleUnit,
      basement,
      totalBuiltUpArea,
      yearOfCompletion,
      description,
      overview,
      category,
      imageUrl,
    } = body;

    // Basic validation
    if (!name || !address || !category) {
      return NextResponse.json({ error: "Name, address, and category are required" }, { status: 400 });
    }

    const newProject = await Project.create({
      imageUrl,
      name,
      address,
      mixedUseProjectType,
      propertyType,
      floor: Number(floor),
      sampleUnit,
      basement,
      totalBuiltUpArea,
      yearOfCompletion: Number(yearOfCompletion),
      description,
      overview,
      category,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
