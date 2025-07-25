// models/project.ts
import mongoose, { Schema, Document, models } from 'mongoose';

export interface IProject extends Document {
  imageUrl: string;
  name: string;
  address: string;
  description: string;
  overview: string;
  mixedUseProjectType: string;
  floor: number;
  sampleUnit: string;
  basement: string;
  totalBuiltUpArea: string;
  yearOfCompletion: number;
  category: mongoose.Schema.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>(
  {
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    overview: { type: String },
    mixedUseProjectType: { type: String },
    floor: { type: Number },
    sampleUnit: { type: String },
    basement: { type: String },
    totalBuiltUpArea: { type: String },
    yearOfCompletion: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
  },
  { timestamps: true }
);

export const Project = models.Project || mongoose.model<IProject>('Project', ProjectSchema);
