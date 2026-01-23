import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import Exam from "@/models/Exam";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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

  const body = await req.json();

  // ✅ generate slug from name
  const slug = slugify(body.name);

  // ✅ check uniqueness
  const exists = await Exam.findOne({ slug });
  if (exists) {
    return NextResponse.json(
      { message: "Exam slug already exists" },
      { status: 409 }
    );
  }

  // ✅ SAVE slug
  const exam = await Exam.create({
    ...body,
    slug,
    created_by: auth.user.id,
  });

  return NextResponse.json(
    { success: true, exam },
    { status: 201 }
  );
}


export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
const examTypes = searchParams.getAll("exam_type");
  const streams = searchParams.getAll("stream");
  const levels = searchParams.getAll("level");
  const q = searchParams.get("q");

  const query: any = { is_active: true };
if (examTypes.length) {
  query.exam_type = { $in: examTypes };
}
 
  if (streams.length) query.stream = { $in: streams };
  if (levels.length) query.level = { $in: levels };

  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { fullName: { $regex: q, $options: "i" } },
    ];
  }
  

  const exams = await Exam.find(query)
    .sort({ created_at: -1 });

  return NextResponse.json({ success: true, exams });
}

