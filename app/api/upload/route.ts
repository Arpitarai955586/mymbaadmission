import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File size should not exceed 5MB" },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "blogs")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const extension = file.name.split(".").pop()
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const filename = `blog-${timestamp}-${randomString}.${extension}`

    // Save file
    const filepath = join(uploadsDir, filename)
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes))

    // Return the public URL
    const imageUrl = `/uploads/blogs/${filename}`

    return NextResponse.json({
      success: true,
      imageUrl,
      message: "Image uploaded successfully",
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { message: error.message || "Failed to upload image" },
      { status: 500 }
    )
  }
}
