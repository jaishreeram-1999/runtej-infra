import mongoose, { type Document, Schema, type Model, models } from "mongoose"

// Define the TypeScript interface for a ProjectType document
export interface IProjectType extends Document {
  name: string
  slug: string
  category: mongoose.Types.ObjectId
  image?: string
  propertyType?: string
  createdAt: Date
  updatedAt: Date
}

// Define the Mongoose schema
const ProjectTypeSchema = new Schema<IProjectType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
     propertyType: {
      type: Schema.Types.ObjectId,
      ref: "PropertyType", // 👈 THIS LINE IS REQUIRED
    },
  },
  {
    timestamps: true,
  },
)

// Create compound index for name and category to ensure uniqueness within category
ProjectTypeSchema.index({ name: 1, category: 1 }, { unique: true })

// Export the model or use existing one to avoid recompilation error in Next.js
const ProjectType: Model<IProjectType> =
  models.ProjectType || mongoose.model<IProjectType>("ProjectType", ProjectTypeSchema)

export default ProjectType
