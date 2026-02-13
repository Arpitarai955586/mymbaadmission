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

/* ================= UPDATE EXAM ================= */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params

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

    /* ---- auto update slug if name changes ---- */
    if (body.name) {
      body.slug = slugify(body.name)
    }

    const exam = await Exam.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      exam,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= DELETE (SOFT) EXAM ================= */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await context.params   // ✅ unwrap params

  const exam = await Exam.findById(id)

  if (!exam) {
    return NextResponse.json(
      { success: false, message: "Exam not found" },
      { status: 404 }
    )
  }

  await Exam.findByIdAndDelete(id)

  return NextResponse.json({
    success: true,
    message: "Exam deleted successfully",
  })
}


