import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import Fees from "@/models/Fees"

/* ================= CREATE / UPDATE FEES ================= */
export async function POST(req: Request) {
  try {
    await connectDB()

    const auth = await authGuard(req)
    if ("error" in auth) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      )
    }

    const roleCheck = roleGuard(auth.user.role, ["ADMIN", "PUBLISHER"])
    if (roleCheck) return roleCheck

    const body = await req.json()

    if (!body.college_id || !body.course_id) {
      return NextResponse.json(
        { message: "college_id & course_id are required" },
        { status: 400 }
      )
    }

    // 🔥 one fees per college + course (UPSERT)
    const fees = await Fees.findOneAndUpdate(
      {
        college_id: body.college_id,
        course_id: body.course_id,
      },
      { $set: body },
      { new: true, upsert: true }
    )

    return NextResponse.json({
      success: true,
      fees,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= GET FEES ================= */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const collegeId = searchParams.get("college_id")
    const courseId = searchParams.get("course_id")

    if (!collegeId || !courseId) {
      return NextResponse.json(
        { message: "college_id & course_id are required" },
        { status: 400 }
      )
    }

    const fees = await Fees.findOne({
      college_id: collegeId,
      course_id: courseId,
    })
      .populate("college_id", "slug basic_info.name")
      .populate("course_id", "course_name degree")

    return NextResponse.json({
      success: true,
      fees,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
