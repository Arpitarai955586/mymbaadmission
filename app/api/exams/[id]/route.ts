import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import mongoose from "mongoose";

/* ================= GET ONE ================= */


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  await connectDB();

  const exam = await Exam.findById(id);

  if (!exam) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ exam });
}
/* ================= UPDATE ================= */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = authGuard(req);
  if ("error" in auth) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  const roleCheck = roleGuard(auth.user.role, ["ADMIN", "PUBLISHER"]);
  if (roleCheck) return roleCheck;

  const { id } = await params; // ✅ FIX
  const body = await req.json();

  const exam = await Exam.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!exam) {
    return NextResponse.json(
      { message: "Exam not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, exam });
}

/* ================= DELETE (SOFT) ================= */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = authGuard(req);
  if ("error" in auth) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  const roleCheck = roleGuard(auth.user.role, ["ADMIN"]);
  if (roleCheck) return roleCheck;

  const { id } = await params; // ✅ FIX

  await Exam.findByIdAndUpdate(id, {
    is_active: false,
  });

  return NextResponse.json({
    success: true,
    message: "Exam deactivated",
  });
}
