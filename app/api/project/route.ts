import { NextResponse } from 'next/server';
import { Project } from '@/lib/models/project';
import {connectDB} from '@/lib/mongodb';

export async function GET() {
  await connectDB();
  const projects = await Project.find().populate('category');
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const project = await Project.create(data);
  return NextResponse.json(project);
}
