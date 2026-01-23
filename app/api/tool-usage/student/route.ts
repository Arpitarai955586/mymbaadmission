import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import ToolUsage from "@/models/ToolUsage";

export async function GET(req: Request) {
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

  const logs = await ToolUsage.find({
    student_id: decoded.id,
  }).sort({ created_at: -1 });

  return NextResponse.json({
    success: true,
    logs,
  });
}
