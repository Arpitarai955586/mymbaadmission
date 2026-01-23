import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Role from "@/models/Role";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const role = await Role.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  if (!role) {
    return NextResponse.json(
      { message: "Role not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    role,
  });
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Deleting roles is not allowed" },
    { status: 403 }
  );
}
