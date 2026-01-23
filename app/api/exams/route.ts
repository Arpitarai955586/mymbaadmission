import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import Exam from "@/models/Exam"

/* ---------- SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* ================= CREATE EXAM ================= */
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

    if (!body.name || !body.type) {
      return NextResponse.json(
        { message: "name & type are required" },
        { status: 400 }
      )
    }

    const slug = slugify(body.name)

    const exists = await Exam.findOne({ slug })
    if (exists) {
      return NextResponse.json(
        { message: "Exam already exists" },
        { status: 409 }
      )
    }

    const exam = await Exam.create({
      ...body,
      slug,
      created_by: auth.user.id,
    })

    return NextResponse.json(
      { success: true, exam },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= GET ALL EXAMS ================= */
export async function GET() {
  try {
    await connectDB()

    const exams = await Exam.find({ status: "active" }).sort({
      created_at: -1,
    })

    return NextResponse.json({
      success: true,
      count: exams.length,
      exams,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
