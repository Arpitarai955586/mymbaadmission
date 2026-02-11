import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import "@/models/Role";

export async function POST(req: Request) {
  try {
    await connectDB();

    let { email, password } = await req.json();

    // ✅ FIX 1: normalize email
    email = email.trim().toLowerCase();

    const user = await User.findOne({
      email,
      is_active: true,
    }).populate("role_id", "name");

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ FIX 2: ensure password exists
    if (!user.password_hash) {
      return NextResponse.json(
        { message: "Password not set for this user" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role_id.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } as SignOptions
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role_id.name,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
