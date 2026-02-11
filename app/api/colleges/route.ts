import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import College from "@/models/College"

/* ---------- SAFE SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* =====================================================
   POST : CREATE COLLEGE (MODEL BASED)
===================================================== */
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

    /* ---------- REQUIRED VALIDATION ---------- */
    if (!body.college_id || !body.name) {
      return NextResponse.json(
        { message: "college_id and name are required" },
        { status: 400 }
      )
    }

    if (!body.location?.city || !body.location?.state) {
      return NextResponse.json(
        { message: "location.city and location.state are required" },
        { status: 400 }
      )
    }

    /* ---------- SLUG ---------- */
    const slug = slugify(body.name)

    /* ---------- DUPLICATE CHECK ---------- */
    const exists = await College.findOne({
      $or: [{ college_id: body.college_id }, { slug }],
    })

    if (exists) {
      return NextResponse.json(
        { message: "College already exists" },
        { status: 409 }
      )
    }

    /* ---------- CREATE ---------- */
    const college = await College.create({
      college_id: body.college_id,
      slug,
      name: body.name,
      short_name: body.short_name,
      type: body.type,
      established_year: body.established_year,
      ranking: body.ranking,

      location: {
        city: body.location.city,
        state: body.location.state,
        street_address: body.location.street_address,
        pincode: body.location.pincode,
        google_map_link: body.location.google_map_link,
      },
      

      approved_by: body.approved_by || [],
      exams_accepted: body.exams_accepted || [],
      courses_offered: body.courses_offered || [],
      highlights: body.highlights || [],

      media: {
        cover: body.media?.cover,
      },

      content: {
        overview: body.content?.overview,
        admission: body.content?.admission,
      },

      status: body.status || "active",
    })

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

/* =====================================================
   GET : ALL COLLEGES / BY SLUG
===================================================== */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    const query: any = { status: "active" }
    if (slug) query.slug = slug

    const colleges = await College.find(query).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      count: colleges.length,
      colleges,
    })
  } catch (error: any) {
    console.error("GET /api/colleges ERROR:", error)
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
