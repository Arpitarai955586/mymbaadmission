import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"

/* ---------- GET : SINGLE COURSE ---------- */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params

    const course = await Course.findById(id)

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, course })
  } catch {
    return NextResponse.json(
      { message: "Invalid course id" },
      { status: 400 }
    )
  }
}

/* ---------- PATCH : UPDATE COURSE ---------- */
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

    const course = await Course.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, course })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    )
  }
}

/* ---------- DELETE : COURSE ---------- */
export async function DELETE(
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

    const roleCheck = roleGuard(auth.user.role, ["ADMIN"])
    if (roleCheck) return roleCheck

    const course = await Course.findByIdAndDelete(id)

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    )
  }
}
