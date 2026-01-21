import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";

export async function GET() {
  await connectDB();
  const notes = await Note.find({});
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { id, title, content } = await req.json();

    const note = await Note.findOneAndUpdate(
      { _id: id || new (require('mongoose').Types.ObjectId)() },
      { title, content },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ message: "Note saved", note }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
    