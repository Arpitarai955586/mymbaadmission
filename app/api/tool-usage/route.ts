import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import ToolUsage from "@/models/ToolUsage";
import { roleGuard } from "@/lib/roleGuard";
import { authGuard } from "@/lib/auth";
export async function POST(req: Request) {
  await connectDB();

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = auth.split(" ")[1];

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }

  if (decoded.type !== "STUDENT") {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  const { tool_name, input_data, result_data } = await req.json();

  if (!tool_name) {
    return NextResponse.json(
      { message: "tool_name required" },
      { status: 400 }
    );
  }

  const log = await ToolUsage.create({
    student_id: decoded.id,
    tool_name,
    input_data,
    result_data,
  });

  return NextResponse.json(
    { success: true, log_id: log._id },
    { status: 201 }
  );
}


export async function GET(req: Request) {
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

  const logs = await ToolUsage.find()
    .populate("student_id", "name email")
    .sort({ created_at: -1 });

  return NextResponse.json({
    success: true,
    logs,
  });
}