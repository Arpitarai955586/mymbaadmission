import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import College from "@/models/College"

/* ================= PATCH : UPDATE COLLEGE ================= */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

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

    const college = await College.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!college) {
      return NextResponse.json(
        { message: "College not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      college,
    })
  } catch (error: any) {
    console.error("PATCH college error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= DELETE : SOFT DELETE COLLEGE ================= */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const auth = await authGuard(req)
    if ("error" in auth) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      )
    }

    const roleCheck = roleGuard(auth.user.role, ["ADMIN"] )
    if (roleCheck) return roleCheck

    // 🔒 SOFT DELETE (recommended)
    const college = await College.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    )

    if (!college) {
      return NextResponse.json(
        { message: "College not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "College deleted successfully",
    })
  } catch (error: any) {
    console.error("DELETE college error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
