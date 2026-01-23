import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, phone, password } = await req.json();

  if (!name || !email || !phone || !password) {
    return NextResponse.json(
      { message: "All fields required" },
      { status: 400 }
    );
  }

  const exists = await Student.findOne({ email });
  if (exists) {
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 409 }
    );
  }

  const password_hash = await bcrypt.hash(password, 10);

  const student = await Student.create({
    name,
    email,
    phone,
    password_hash,
  });

  return NextResponse.json(
    { success: true, student_id: student._id },
    { status: 201 }
  );
}
