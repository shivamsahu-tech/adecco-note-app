import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User"; 
import { connectDB } from "@/lib/db"; 

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const existingUser = await User.findOne(
      { email }
    );

    if (existingUser) return NextResponse.json({ error: "user exist" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
