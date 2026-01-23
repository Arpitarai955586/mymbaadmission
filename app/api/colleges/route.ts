import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import College from "@/models/College"
import CollegeCourse from "@/models/CollegeCourse"

/* ---------- SAFE SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* ---------- POST : CREATE COLLEGE ---------- */
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

    /* ✅ VALIDATION */
    if (!body.basic_info || !body.basic_info.name) {
      return NextResponse.json(
        { message: "College name is required" },
        { status: 400 }
      )
    }

    if (!body.college_id) {
      return NextResponse.json(
        { message: "College ID is required" },
        { status: 400 }
      )
    }

    /* ✅ SLUG FROM BASIC_INFO.NAME */
    const slug = slugify(body.basic_info.name)

    /* ✅ DUPLICATE CHECK */
    const exists = await College.findOne({
      $or: [
        { college_id: body.college_id },
        { college_slug: slug },
      ],
    })

    if (exists) {
      return NextResponse.json(
        { message: "College already exists" },
        { status: 409 }
      )
    }

    /* ✅ CREATE COLLEGE */
    const college = await College.create({
      ...body,
      college_slug: slug,
      created_by: auth.user.id,
    })

    return NextResponse.json(
      { success: true, college },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("POST /colleges ERROR:", error)
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ---------- GET : ALL / BY SLUG ---------- */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    let colleges

    if (slug) {
      colleges = await College.find({
        college_slug: slug,
        is_active: true,
      })
    } else {
      colleges = await College.find({ is_active: true })
    }

    const transformed = await Promise.all(
      colleges.map(async (college) => {
        const courseCount = await CollegeCourse.countDocuments({
          college_id: college._id,
        })

        return {
          ...college.toObject(),
          total_courses: courseCount,
        }
      })
    )

    return NextResponse.json({
      success: true,
      colleges: transformed,
      count: transformed.length,
    })
  } catch (error: any) {
    console.error("GET /colleges ERROR:", error)
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
