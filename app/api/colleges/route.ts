import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { authGuard } from "@/lib/auth"
import { roleGuard } from "@/lib/roleGuard"
import College from "@/models/College"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

/* ---------- SAFE SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

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

    const contentType = req.headers.get("content-type") || ""

    let college_id = ""
    let name = ""
    let city = ""
    let state = ""
    let fileName = ""

    /* ===============================
       HANDLE FORM DATA
    =============================== */
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()

      college_id = formData.get("college_id") as string
      name = formData.get("name") as string
      city = formData.get("city") as string
      state = formData.get("state") as string

      const file = formData.get("cover") as File

      if (file && file.name) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        fileName = Date.now() + "-" + file.name

        const uploadDir = path.join(process.cwd(), "public/uploads")

        // folder create if not exists
        await mkdir(uploadDir, { recursive: true })

        const uploadPath = path.join(uploadDir, fileName)

        await writeFile(uploadPath, buffer)
      }
    }

    /* ===============================
       HANDLE JSON (Optional Support)
    =============================== */
    else if (contentType.includes("application/json")) {
      const body = await req.json()
       college_id = body.college_id
            name = body.name

city = body.location?.city
state = body.location?.state

fileName = body.media?.cover || ""

    }

    else {
      return NextResponse.json(
        { message: "Unsupported Content-Type" },
        { status: 400 }
      )
    }

    if (!college_id || !name) {
      return NextResponse.json(
        { message: "college_id and name are required" },
        { status: 400 }
      )
    }

    if (!city || !state) {
      return NextResponse.json(
        { message: "city and state are required" },
        { status: 400 }
      )
    }

    const slug = slugify(name)

    const exists = await College.findOne({
      $or: [{ college_id }, { slug }],
    })

    if (exists) {
      return NextResponse.json(
        { message: "College already exists" },
        { status: 409 }
      )
    }

    const college = await College.create({
      college_id,
      slug,
      name,
      location: { city, state },
      media: { cover: fileName },
      status: "active",
    })

    return NextResponse.json(
      { success: true, college },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("POST /api/colleges ERROR:", error)
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

// get colleges 
export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    const query: any = { status: "active" }
    if (slug) query.slug = slug

    const colleges = await College.find(query).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      count: colleges.length,
      colleges,
    })
  } catch (error: any) {
    console.error("GET /api/colleges ERROR:", error)
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
