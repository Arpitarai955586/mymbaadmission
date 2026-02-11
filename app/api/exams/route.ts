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

/* ---------- EXAM ID ---------- */
function generateExamId() {
  return `EXAM-${Date.now()}`
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

    const {
      name,
      category,
      date,
      duration,
      status,
      description,
      eligibility,
    } = body

    if (!name || !category || !date || !duration) {
      return NextResponse.json(
        { message: "All required fields missing" },
        { status: 400 }
      )
    }

    const slug = slugify(name)

    const exists = await Exam.findOne({ slug })
    if (exists) {
      return NextResponse.json(
        { message: "Exam already exists" },
        { status: 409 }
      )
    }

    /* 🔥 FIXED CREATE BLOCK */
    const exam = await Exam.create({
      exam_id: generateExamId(),
      name,
      slug,
      category,
      date: new Date(date),   // ✅ convert string to Date
      duration,
      status: status || "Upcoming",
      description,
      eligibility,
      is_active: true,
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
/* ================= GET EXAMS ================= */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10

    const skip = (page - 1) * limit

    const exams = await Exam.find({ is_active: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return NextResponse.json({
      success: true,
      exams,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

