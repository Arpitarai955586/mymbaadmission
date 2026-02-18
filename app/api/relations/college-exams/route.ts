import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import CollegeExam from "@/models/CollegeExam";

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

  const { college_id, exam_id } = await req.json();

  const exists = await CollegeExam.findOne({ college_id, exam_id });
  if (exists) {
    return NextResponse.json(
      { message: "Relation already exists" },
      { status: 409 }
    );
  }

  const relation = await CollegeExam.create({
    college_id,
    exam_id,
  });

  return NextResponse.json(
    { success: true, relation },
    { status: 201 }
  );
}


// GET /api/relations/college-exams?college_id=XXX or get all
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const college_id = searchParams.get("college_id");

  let query: any = {};
  if (college_id) {
    query.college_id = college_id;
  }

  const collegeExams = await CollegeExam.find(query)
    .populate("college_id", "college_id name type")
    .populate("exam_id", "exam_id name category date")
    .lean();

  return NextResponse.json({
    success: true,
    data: collegeExams,
  });
}
