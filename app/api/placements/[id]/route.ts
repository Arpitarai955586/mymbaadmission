import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import Placement from "@/models/Placement"

/* ================= UPDATE PLACEMENT ================= */
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

    const placement = await Placement.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )

    if (!placement) {
      return NextResponse.json(
        { message: "Placement not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      placement,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= DELETE PLACEMENT ================= */
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

    const placement = await Placement.findByIdAndDelete(id)

    if (!placement) {
      return NextResponse.json(
        { message: "Placement not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Placement deleted successfully",
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
