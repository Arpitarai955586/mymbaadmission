import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Course from "@/models/Course"
import College from "@/models/College"
import mongoose from "mongoose"

/* ---------- SLUGIFY ---------- */
function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* =========================================================
   POST : ADD COURSE
========================================================= */
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    if (!body.name || !body.college_id) {
      return NextResponse.json(
        { message: "name & college_id required" },
        { status: 400 }
      )
    }

    if (!mongoose.Types.ObjectId.isValid(body.college_id)) {
      return NextResponse.json(
        { message: "Invalid college_id" },
        { status: 400 }
      )
    }

    const slug = slugify(body.name)

    const course = await Course.create({
  id: new mongoose.Types.ObjectId().toString(),
  name: body.name,
  slug,
  college_id: body.college_id,   // ✅ ADD THIS LINE
  duration_years: Number(body.duration_years),
  degree: body.degree,
  default_fees: {
    currency: "INR",
    total_fee: Number(body.default_fees?.total_fee ?? body.total_fee),
  },
  entrance_exams: body.entrance_exams || [],
  status: "Active",
})


    return NextResponse.json(
      { success: true, course },
      { status: 201 }
    )

  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    )
  }
}



/* =========================================================
   GET : COURSES BY COLLEGE SLUG
========================================================= */
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const college_slug = searchParams.get("college_slug");

    let filter: any = {};

    // ✅ If college_slug provided → filter by college
    if (college_slug) {
      const college = await College.findOne({
        slug: college_slug,
        status: "active",
      });

      if (!college) {
        return NextResponse.json(
          { message: "College not found" },
          { status: 404 }
        );
      }

      filter.college_id = college._id;
    }

    const courses = await Course.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Course.countDocuments(filter);

    return NextResponse.json({
      success: true,
      courses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

