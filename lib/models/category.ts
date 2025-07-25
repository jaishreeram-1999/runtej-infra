// models/category.ts
import mongoose, { Document, Schema, Model, models } from 'mongoose';

// Define the TypeScript interface for a Category document
export interface ICategory extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Export the model or use existing one to avoid recompilation error in Next.js
export const Category: Model<ICategory> =
  models.Category || mongoose.model<ICategory>('Category', CategorySchema);
