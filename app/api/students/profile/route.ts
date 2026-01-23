import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function GET(req: Request) {
  await connectDB();

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      type: string;
    };

    if (decoded.type !== "STUDENT") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const student = await Student.findById(decoded.id).select(
      "-password_hash"
    );

    return NextResponse.json({
      success: true,
      student,
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}
