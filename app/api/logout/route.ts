import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "logout success" },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "logout failed" }, 
      { status: 500 }
    );
  }
}
