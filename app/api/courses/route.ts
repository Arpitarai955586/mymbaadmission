import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import Course from "@/models/Course"
import College from "@/models/College"

/* ---------- POST : ADD COURSE ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  if (!body.course_name || !body.college_id) {
    return NextResponse.json(
      { message: "course_name & college_id required" },
      { status: 400 }
    )
  }

  const slug = slugify(body.course_name)

  const course = await Course.create({
    ...body,
    slug,
  })

  return NextResponse.json(
    { success: true, course },
    { status: 201 }
  )
}


/* ---------- GET : COURSES BY COLLEGE SLUG ---------- */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("college_slug")

    if (!slug) {
      return NextResponse.json(
        { message: "college_slug is required" },
        { status: 400 }
      )
    }

    const college = await College.findOne({ slug, is_active: true })
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
        name: college.basic_info.name,
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
