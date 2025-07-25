import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectType from "@/lib/models/project-type";
import { Category } from "@/lib/models/category";
import mongoose from "mongoose";
import path from "path";
import { mkdir, unlink, writeFile } from "fs/promises";

export const runtime = "nodejs"; // Ensure Node.js runtime (not Edge)

// ✅ DELETE /api/project-types/[id]

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ await required
) {
  const { id } = await context.params; // ✅ await to access the param

  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid project type ID" },
      { status: 400 }
    );
  }

  const deleted = await ProjectType.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: "Project type not found" },
      { status: 404 }
    );
  }

  if (deleted.image) {
    try {
      const imagePath = path.join(process.cwd(), "public", deleted.image);
      await unlink(imagePath);
    } catch (err) {
      console.warn("Failed to delete image:", err);
    }
  }

  return NextResponse.json({ success: true });
}

// ✅ PATCH /api/project-types/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid project type ID" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    if (!name || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Name and category ID are required" },
        { status: 400 }
      );
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let imagePath: string | null = null;

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "project-types"
      );
      await mkdir(uploadDir, { recursive: true });

      const timestamp = Date.now();
      const ext = image.name.split(".").pop();
      const filename = `${slug}-${timestamp}.${ext}`;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      imagePath = `/uploads/project-types/${filename}`;
    }

    const updated = await ProjectType.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        category: categoryId,
        ...(imagePath && { image: imagePath }),
      },
      { new: true }
    ).populate("category", "name slug");

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Project type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating project type:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project type" },
      { status: 500 }
    );
  }
}
