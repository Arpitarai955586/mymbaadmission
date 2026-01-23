import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const student = await Student.findOne({ email });
  if (!student) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, student.password_hash);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      id: student._id,
      type: "STUDENT",
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    success: true,
    token,
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
    },
  });
}
