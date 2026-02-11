import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import BlogPost from "@/models/Blog"

/* ---------- HELPERS ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function generateBlogId() {
  return `BLOG-${Date.now()}`
}

/* ================= CREATE BLOG ================= */
export async function POST(req: Request) {
  try {
    await connectDB()

    /* ---- Auth ---- */
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

    if (!body.title || !body.body) {
      return NextResponse.json(
        { message: "title and body are required" },
        { status: 400 }
      )
    }

    const slug = slugify(body.slug || body.title)

    const exists = await BlogPost.findOne({ slug })
    if (exists) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      )
    }

    const blog = await BlogPost.create({
      blog_id: generateBlogId(),
      title: body.title,
      slug,
      excerpt: body.excerpt,
      body: body.body,
      category: body.category,
      tags: body.tags || [],
      readTime: body.readTime,
      featured_image: body.featured_image,
      is_published: body.is_published ?? true,
      is_trending: body.is_trending ?? false,
      views: 0,
      seo: body.seo,
    })

    return NextResponse.json(
      { success: true, blog },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

/* ================= GET ALL BLOGS ================= */
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page") || 1)
    const limit = Number(searchParams.get("limit") || 10)
    const skip = (page - 1) * limit

    const blogs = await BlogPost.find({ is_published: true })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v")

    const total = await BlogPost.countDocuments({
      is_published: true,
    })

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      blogs,
    })
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
