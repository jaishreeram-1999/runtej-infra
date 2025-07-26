// models/project.ts
import mongoose, { Schema, type Document, models } from "mongoose"

export interface IProject extends Document {
  imageUrl: string
  name: string
  address: string
  description: string
  overview: string
  propertyType: mongoose.Schema.Types.ObjectId // Changed from PropertyType to propertyType
  floor: number
  sampleUnit: string
  basement: string
  totalBuiltUpArea: string
  yearOfCompletion: number
  category: mongoose.Schema.Types.ObjectId
  mixedUseProjectType?: string // Added this field that was missing
}

const ProjectSchema = new Schema<IProject>(
  {
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    overview: { type: String },
    propertyType: { type: String },
    floor: { type: Number },
    sampleUnit: { type: String },
    basement: { type: String },
    totalBuiltUpArea: { type: String },
    yearOfCompletion: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    mixedUseProjectType: { type: String }, // Added this field
  },
  { timestamps: true },
)

export const Project = models.Project || mongoose.model<IProject>("Project", ProjectSchema)
