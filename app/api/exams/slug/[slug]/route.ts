import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

   
    const { slug } = await params;

    const decodedSlug = decodeURIComponent(slug);

    const exam = await Exam.findOne({
      slug: decodedSlug,
    }).select(
      "name slug exam_type overview eligibility exam_pattern syllabus important_dates"
    );

    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      exam,
    });
  } catch (error) {
    console.error("EXAM SLUG API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
