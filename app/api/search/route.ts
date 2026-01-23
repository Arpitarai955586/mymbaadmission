import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import College from "@/models/College";
import Course from "@/models/Course";
import Exam from "@/models/Exam";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) return NextResponse.json([]);

  await connectDB();

  const regex = new RegExp(q, "i");

  const [colleges, courses, exams] = await Promise.all([
    College.find({ name: regex }).limit(5),
    Course.find({ name: regex }).limit(5),
    Exam.find({ name: regex }).limit(5),
  ]);

  const results = [
    ...colleges.map((c) => ({
      id: c._id,
      slug: c.slug || c._id, // Use slug or fallback to id
      label: c.name,
      type: "College",
    })),
    ...courses.map((c) => ({
      id: c._id,
      slug: c.slug || c._id, // Use slug or fallback to id
      label: c.name,
      type: "Course",
    })),
    ...exams.map((e) => ({
      id: e._id,
      slug: e.slug || e._id, // Use slug or fallback to id
      label: e.name,
      type: "Exam",
    })),
  ];

  return NextResponse.json(results);
}
