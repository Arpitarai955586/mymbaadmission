import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Admin API endpoint" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ 
      message: "Admin POST endpoint",
      data: body 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}