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
      .limit(limit);

    // Add sample exams if database is empty
    let finalExams = exams;
    if (exams.length === 0) {
      const sampleExams = [
        {
          exam_id: generateExamId(),
          name: "CAT",
          slug: "cat",
          full_name: "Common Admission Test",
          type: "National",
          category: "Management",
          date: "2024-11-24",
          duration: "2 hours",
          status: "Upcoming",
          description: "Common Admission Test for MBA programs in India",
          eligibility: "Graduate with 50% marks",
          website: "https://iimcat.ac.in",
          is_active: true,
        },
        {
          exam_id: generateExamId(),
          name: "XAT",
          slug: "xat",
          full_name: "Xavier Aptitude Test",
          type: "National",
          category: "Management",
          date: "2024-12-08",
          duration: "3 hours",
          status: "Upcoming",
          description: "National level management entrance test",
          eligibility: "Graduate in any discipline",
          website: "https://xatonline.in",
          is_active: true,
        },
        {
          exam_id: generateExamId(),
          name: "GMAT",
          slug: "gmat",
          full_name: "Graduate Management Admission Test",
          type: "International",
          category: "Management",
          date: "2024-12-15",
          duration: "3.5 hours",
          status: "Upcoming",
          description: "International management entrance test",
          eligibility: "Graduate with work experience",
          website: "https://gmat.com",
          is_active: true,
        },
        {
          exam_id: generateExamId(),
          name: "MAT",
          slug: "mat",
          full_name: "Management Aptitude Test",
          type: "National",
          category: "Management",
          date: "2024-12-14",
          duration: "2.5 hours",
          status: "Upcoming",
          description: "National level management entrance test",
          eligibility: "Graduate in any discipline",
          website: "https://mat.aima.in",
          is_active: true,
        },
        {
          exam_id: generateExamId(),
          name: "CMAT",
          slug: "cmat",
          full_name: "Common Management Admission Test",
          type: "National",
          category: "Management",
          date: "2024-01-20",
          duration: "3 hours",
          status: "Upcoming",
          description: "National level management entrance test",
          eligibility: "Graduate in any discipline",
          website: "https://cmat.ac.in",
          is_active: true,
        }
      ];

      // Save sample exams to database
      await Exam.insertMany(sampleExams);
      finalExams = sampleExams;
    }

    return NextResponse.json({
      success: true,
      exams: finalExams,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

