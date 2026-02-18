import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import College from "@/models/College"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

/* ---------- SAFE SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

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

    const contentType = req.headers.get("content-type") || ""

    let college_id = ""
    let name = ""
    let city = ""
    let state = ""
    let fileName = ""
    let ranking: string | undefined
    let established_year: number | undefined
    let contentOverview: string | undefined
    let fees: any = undefined

    /* ===============================
       HANDLE FORM DATA
    =============================== */
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()

      college_id = formData.get("college_id") as string
      name = formData.get("name") as string
      city = formData.get("city") as string
      state = formData.get("state") as string

      const file = formData.get("cover") as File

      if (file && file.name) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        fileName = Date.now() + "-" + file.name

        const uploadDir = path.join(process.cwd(), "public/uploads")

        // folder create if not exists
        await mkdir(uploadDir, { recursive: true })

        const uploadPath = path.join(uploadDir, fileName)

        await writeFile(uploadPath, buffer)
      }
    }

    /* ===============================
       HANDLE JSON (Optional Support)
    =============================== */
    else if (contentType.includes("application/json")) {
      const body = await req.json()
      college_id = body.college_id
      name = body.name
      city = body.location?.city
      state = body.location?.state
      fileName = (typeof body.media?.cover === "string" ? body.media.cover.trim() : "") || ""
      ranking = body.ranking != null ? String(body.ranking).trim() : undefined
      established_year = body.established_year != null ? Number(body.established_year) : undefined
      contentOverview = body.content?.overview != null ? String(body.content.overview).trim() : undefined

      // Extract fees if provided
      if (body.fees?.annual_fee) {
        fees = {
          annual_fee: Number(body.fees.annual_fee),
          currency: body.fees.currency || "INR",
          fee_structure: body.fees.fee_structure || undefined,
        }
      }
    }

    else {
      return NextResponse.json(
        { message: "Unsupported Content-Type" },
        { status: 400 }
      )
    }

    if (!college_id || !name) {
      return NextResponse.json(
        { message: "college_id and name are required" },
        { status: 400 }
      )
    }

    if (!city || !state) {
      return NextResponse.json(
        { message: "city and state are required" },
        { status: 400 }
      )
    }

    const slug = slugify(name)

    const exists = await College.findOne({
      $or: [{ college_id }, { slug }],
    })

    if (exists) {
      return NextResponse.json(
        { message: "College already exists" },
        { status: 409 }
      )
    }

    const createPayload: Record<string, unknown> = {
      college_id,
      slug,
      name,
      location: { city, state },
      media: { cover: fileName || "" },
      status: "active",
    }
    if (ranking !== undefined && ranking !== "") createPayload.ranking = ranking
    if (established_year !== undefined && !Number.isNaN(established_year)) createPayload.established_year = established_year
    if (contentOverview !== undefined && contentOverview !== "") createPayload.content = { overview: contentOverview }
    if (fees) createPayload.fees = fees

    const college = await College.create(createPayload)

    return NextResponse.json(
      { success: true, college },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("POST /api/colleges ERROR:", error)
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

// get colleges 
// export async function GET(req: Request) {
//   try {
//     await connectDB()

//     const { searchParams } = new URL(req.url)
//     const slug = searchParams.get("slug")

//     const query: any = { status: "active" }
//     if (slug) query.slug = slug
//     const colleges = await College.find().populate("courses_offered");
//     const colleges = await College.find(query).sort({ createdAt: -1 })

//     // Import models for counting
//     const Course = require("@/models/Course").default
//     const CollegeCourse = require("@/models/CollegeCourse").default
//     const Exam = require("@/models/Exam").default
//     const CollegeExam = require("@/models/CollegeExam").default

//     // Add counts to each college
//     const collegesWithCounts = await Promise.all(
//       colleges.map(async (college: any) => {
//         const coursesCount = await CollegeCourse.countDocuments({
//           college_id: college._id,
//         })
//         const examsCount = await CollegeExam.countDocuments({
//           college_id: college._id,
//         })

//         return {
//           ...college.toObject(),
//           coursesCount,
//           examsCount,
//         }
//       })
//     )

//     return NextResponse.json({
//       success: true,
//       count: colleges.length,
//       colleges: collegesWithCounts,
//     })
//   } catch (error: any) {
//     console.error("GET /api/colleges ERROR:", error)
//     return NextResponse.json(
//       { message: error.message || "Internal Server Error" },
//       { status: 500 }
//     )
//   }
// }
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    const query: any = { status: "active" }
    if (slug) query.slug = slug

    const colleges = await College.find(query).sort({ createdAt: -1 })

    const collegesWithCounts = colleges.map((college: any) => ({
      ...college.toObject(),
      coursesCount: college.courses_offered?.length || 0,
      examsCount: college.exams_accepted?.length || 0,
    }))

    return NextResponse.json({
      success: true,
      count: colleges.length,
      colleges: collegesWithCounts,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

