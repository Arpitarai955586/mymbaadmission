import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { authGuard } from "@/lib/auth";
import { permissionGuard } from "@/lib/permissionGuard";
import { PERMISSIONS } from "@/lib/permissions";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ unwrap params
  const { id } = await context.params;

  // 1️⃣ AUTH CHECK
  const auth = authGuard(req);
  if ("error" in auth) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  // 2️⃣ PERMISSION CHECK
  const permissionCheck = permissionGuard(
    auth.user.role,
    PERMISSIONS.DELETE_USER
  );
  if (permissionCheck) return permissionCheck;

  // 3️⃣ DB OPERATION
  await connectToDatabase();

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "User deleted successfully",
  });
}
