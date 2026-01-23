import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import Gallery from "@/models/Gallery"

/* ================= UPDATE GALLERY ================= */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const gallery = await Gallery.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    )

    if (!gallery) {
      return NextResponse.json(
        { message: "Gallery not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      gallery,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= DELETE GALLERY ================= */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const auth = await authGuard(req)
    if ("error" in auth) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      )
    }

    const roleCheck = roleGuard(auth.user.role, ["ADMIN"])
    if (roleCheck) return roleCheck

    const gallery = await Gallery.findByIdAndDelete(params.id)

    if (!gallery) {
      return NextResponse.json(
        { message: "Gallery not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Gallery deleted successfully",
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
