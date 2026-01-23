import { NextResponse } from "next/server";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  // 1️⃣ AUTH CHECK
  const auth = authGuard(req);
  if ("error" in auth) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  // 2️⃣ RBAC CHECK
  const roleCheck = roleGuard(auth.user.role, ["ADMIN"]);
  if (roleCheck) return roleCheck;

  // 3️⃣ DB + DATA
  await connectToDatabase();
  const users = await User.find();

  return NextResponse.json({
    success: true,
    users,
  });
}
