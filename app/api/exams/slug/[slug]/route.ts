import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Exam from "@/models/Exam"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB()

    const exam = await Exam.findOne({
      slug: params.slug,
      status: "active",
    })

    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      exam,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
