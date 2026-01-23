import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import CourseExam from "@/models/CourseExam";

export async function POST(req: Request) {
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

  const { course_id, exam_id } = await req.json();

  const exists = await CourseExam.findOne({ course_id, exam_id });
  if (exists) {
    return NextResponse.json(
      { message: "Relation already exists" },
      { status: 409 }
    );
  }

  const relation = await CourseExam.create({
    course_id,
    exam_id,
  });

  return NextResponse.json(
    { success: true, relation },
    { status: 201 }
  );
}

// GET /api/relations/course-exams?course_id=XXX
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const course_id = searchParams.get("course_id");

  const exams = await CourseExam.find({ course_id })
    .populate("exam_id");

  return NextResponse.json({
    success: true,
    exams,
  });
}
