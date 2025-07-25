// app/api/category/route.ts
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/lib/models/category';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ createdAt: -1 });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const created = await Category.create(data);
  return NextResponse.json(created, { status: 201 });
}
