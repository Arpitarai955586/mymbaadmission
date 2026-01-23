import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";

import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const content = await Content.findById(id)
    .populate("created_by", "name");

  if (!content || !content.is_published) {
    return NextResponse.json(
      { message: "Content not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    content,
  });
}


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

  const { id } = await params;
  const body = await req.json();

  const content = await Content.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  if (!content) {
    return NextResponse.json(
      { message: "Content not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    content,
  });
}
