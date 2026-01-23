import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import College from "@/models/College"
import CollegeCourse from "@/models/CollegeCourse"

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* ---------- POST ---------- */
export async function POST(req: Request) {
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

  if (!body.name) {
    return NextResponse.json(
      { message: "College name is required" },
      { status: 400 }
    )
  }

  const slug = slugify(body.name)

  const exists = await College.findOne({ slug })
  if (exists) {
    return NextResponse.json(
      { message: "College already exists" },
      { status: 409 }
    )
  }

  const college = await College.create({
    ...body,
    slug,
    status: "Active",
    created_by: auth.user.id,
  })

  return NextResponse.json({ success: true, college }, { status: 201 })
}

/* ---------- GET ---------- */
export async function GET(req: Request) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")

  let colleges

  if (slug) {
    colleges = await College.find({ slug })
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
        ranking: college.ranking || "Not Ranked",
      }
    })
  )

  return NextResponse.json({
    success: true,
    colleges: transformed,
    count: transformed.length,
  })
}
