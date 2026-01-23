import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"
import College from "@/models/College"

/* ===================== GET COURSE BY SLUG ===================== */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()

    const { slug } = await params

    const course = await Course.findOne({
      slug,
      is_active: true,
    })
      .populate("college_id", "slug basic_info.name")
      .populate("created_by", "name email")

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      course,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
