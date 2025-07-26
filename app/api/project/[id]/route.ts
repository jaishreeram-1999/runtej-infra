import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/lib/models/project";

// ✅ GET /api/project/[id] - Get single project by ID
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const id = context.params.id;

    const project = await Project.findById(id).populate("category");

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// ✅ PUT /api/project/[id] - Update project
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const id = context.params.id;
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

    // Validation
    if (!name || !address || !category) {
      return NextResponse.json(
        { error: "Name, address, and category are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
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
        imageUrl,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("category");

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// ✅ DELETE /api/project/[id] - Delete project
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const id = context.params.id;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
