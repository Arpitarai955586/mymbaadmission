import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Role from "@/models/Role";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 🔐 Resolve STUDENT role on server
    const role = await Role.findOne({ name: "ADMIN" });
    if (!role) {
      return NextResponse.json(
        { message: "Default role not found" },
        { status: 500 }
      );
    }

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password_hash,
      role_id: role._id, // ✅ FIX
      is_active: true,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}
