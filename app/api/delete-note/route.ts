import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();
  const notes = await Note.find({}).populate("userId", "name email");
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { action, id, title, description, category, userId } = await req.json();

    if (action === "delete") {
      if (!id) return NextResponse.json({ error: "ID required for deletion" }, { status: 400 });
      await Note.findByIdAndDelete(id);
      return NextResponse.json({ message: "Note deleted successfully" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: id || new mongoose.Types.ObjectId() },
      { title, description, category, userId },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ message: "Note saved successfully", note });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
