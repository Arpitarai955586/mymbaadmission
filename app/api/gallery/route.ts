import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import Gallery from "@/models/Gallery"

/* ================= CREATE / UPDATE GALLERY ================= */
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

    if (!body.college_id) {
      return NextResponse.json(
        { message: "college_id is required" },
        { status: 400 }
      )
    }

    // 🔥 One gallery per college (UPSERT)
    const gallery = await Gallery.findOneAndUpdate(
      { college_id: body.college_id },
      {
        $set: {
          images: body.images || [],
          videos: body.videos || [],
        },
      },
      { new: true, upsert: true }
    )

    return NextResponse.json({
      success: true,
      gallery,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= GET GALLERY BY COLLEGE ================= */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const collegeId = searchParams.get("college_id")

    if (!collegeId) {
      return NextResponse.json(
        { message: "college_id is required" },
        { status: 400 }
      )
    }

    const gallery = await Gallery.findOne({
      college_id: collegeId,
    }).populate("college_id", "slug basic_info.name")

    return NextResponse.json({
      success: true,
      gallery,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
