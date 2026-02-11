import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import BlogPost from "@/models/Blog"

/* ---------- SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* ================= GET SINGLE BLOG ================= */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params

    const blog = await BlogPost.findById(id).select("-__v")

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      blog,
    })
  } catch {
    return NextResponse.json(
      { message: "Invalid blog id" },
      { status: 400 }
    )
  }
}

/* ================= UPDATE BLOG ================= */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
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

    const { id } = await context.params
    const body = await req.json()

    /* auto-update slug if title changes */
    if (body.title) {
      body.slug = slugify(body.title)
    }

    const blog = await BlogPost.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      blog,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= DELETE BLOG ================= */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
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

    const { id } = await context.params

    const blog = await BlogPost.findByIdAndDelete(id)

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    })
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
