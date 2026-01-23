import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import Fees from "@/models/Fees"

/* ================= UPDATE FEES ================= */
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

    const fees = await Fees.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )

    if (!fees) {
      return NextResponse.json(
        { message: "Fees not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      fees,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= DELETE FEES ================= */
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

    const roleCheck = roleGuard(auth.user.role, ["ADMIN"])
    if (roleCheck) return roleCheck

    const fees = await Fees.findByIdAndDelete(id)

    if (!fees) {
      return NextResponse.json(
        { message: "Fees not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Fees deleted successfully",
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
