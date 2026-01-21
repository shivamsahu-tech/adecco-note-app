import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ 
      email
     });

    if (!user) 
      return NextResponse.json({ error: "User Didn't Exsit" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) 
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!, 
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({ message: "Login successful" });
    
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
