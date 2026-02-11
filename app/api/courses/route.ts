import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"
import College from "@/models/College"
import mongoose from "mongoose"

/* ---------- SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* =========================================================
   POST : ADD COURSE
========================================================= */
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    if (!body.name || !body.college_id) {
      return NextResponse.json(
        { message: "name & college_id required" },
        { status: 400 }
      )
    }

    // ✅ validate college exists
    if (!mongoose.Types.ObjectId.isValid(body.college_id)) {
      return NextResponse.json(
        { message: "Invalid college_id" },
        { status: 400 }
      )
    }

    const college = await College.findById(body.college_id)
    if (!college) {
      return NextResponse.json(
        { message: "College not found" },
        { status: 404 }
      )
    }

    const slug = slugify(body.name)

    const course = await Course.create({
      college_id: body.college_id,
      id: body.id,
      name: body.name,
      duration_years: body.duration_years,
      degree: body.degree,
      default_fees: body.default_fees,
      entrance_exams: body.entrance_exams || [],
      slug,
    })

    return NextResponse.json(
      { success: true, course },
      { status: 201 }
    )

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    )
  }
}


/* =========================================================
   GET : COURSES BY COLLEGE SLUG
========================================================= */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const college_slug = searchParams.get("college_slug")

    if (!college_slug) {
      return NextResponse.json(
        { message: "college_slug is required" },
        { status: 400 }
      )
    }

    const college = await College.findOne({
      slug: college_slug,
      status: "active",
    })

    if (!college) {
      return NextResponse.json(
        { message: "College not found" },
        { status: 404 }
      )
    }

    const courses = await Course.find({
      college_id: college._id,
    })

    return NextResponse.json({
      success: true,
      college: {
        id: college._id,
        name: college.name,
        slug: college.slug,
      },
      courses,
    })

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    )
  }
}
