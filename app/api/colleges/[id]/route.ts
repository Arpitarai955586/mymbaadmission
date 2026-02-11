import { NextResponse ,NextRequest} from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import College from "@/models/College"

/* ================= PATCH ================= */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ IMPORTANT
) {
  try {
    await connectDB()

    // ✅ FIX: await params
    const { id } = await params

    const auth = await authGuard(req)
    if ("error" in auth) {
      return NextResponse.json(
        { message: auth.error },
        { status: 401 }
      )
    }

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

    return NextResponse.json(
      { college },
      { status: 200 }
    )
  } catch (error) {
    console.error("PATCH COLLEGE ERROR:", error)
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}


/* ================= DELETE ================= */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params // ✅ FIXED

    const auth = await authGuard(req)
    if ("error" in auth) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      )
    }

    const roleCheck = roleGuard(auth.user.role, ["ADMIN"])
    if (roleCheck) return roleCheck

    const college = await College.findByIdAndUpdate(
      id,
      { status: "inactive" },
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
