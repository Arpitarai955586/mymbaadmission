import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import College from "@/models/College"
import Course from "@/models/Course"
import Fees from "@/models/Fees"
import Placement from "@/models/Placement"
import Gallery from "@/models/Gallery"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    const { slug } = await params

    const college = await College.findOne({
      slug,
      is_active: true,
    })

    if (!college) {
      return NextResponse.json(
        { message: "College not found" },
        { status: 404 }
      )
    }

    const collegeId = college._id

    const [courses, fees, placement, gallery] = await Promise.all([
      Course.find({ college_id: collegeId }),
      Fees.find({ college_id: collegeId }),
      Placement.findOne({ college_id: collegeId }),
      Gallery.find({ college_id: collegeId }),
    ])

    return NextResponse.json({
      success: true,
      college,
      courses,
      fees,
      placement,
      gallery,
    })
  } catch (error: any) {
    console.error("GET college by slug error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
