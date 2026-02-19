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

    // Add sample courses if database is empty
    let finalCourses = courses;
    if (courses.length === 0) {
      const sampleCourses = [
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "Master of Business Administration",
          slug: "mba",
          degree: "MBA",
          duration_years: 2,
          default_fees: {
            currency: "INR",
            total_fee: 800000,
          },
          entrance_exams: ["CAT", "XAT", "GMAT"],
          media: {
            cover: "/courses/mba-cover.jpg",
          },
          status: "Active",
        },
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "Post Graduate Diploma in Management",
          slug: "pgdm",
          degree: "PGDM",
          duration_years: 2,
          default_fees: {
            currency: "INR",
            total_fee: 600000,
          },
          entrance_exams: ["CAT", "MAT", "CMAT"],
          media: {
            cover: "/courses/pgdm-cover.jpg",
          },
          status: "Active",
        },
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "Bachelor of Business Administration",
          slug: "bba",
          degree: "BBA",
          duration_years: 3,
          default_fees: {
            currency: "INR",
            total_fee: 400000,
          },
          entrance_exams: ["IPU CET", "DU JAT"],
          media: {
            cover: "/courses/bba-cover.jpg",
          },
          status: "Active",
        },
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "Executive MBA",
          slug: "executive-mba",
          degree: "EMBA",
          duration_years: 1,
          default_fees: {
            currency: "INR",
            total_fee: 1200000,
          },
          entrance_exams: ["GMAT", "CAT"],
          media: {
            cover: "/courses/emba-cover.jpg",
          },
          status: "Active",
        }
      ];

      // Save sample courses to database
      await Course.insertMany(sampleCourses);
      finalCourses = sampleCourses;
    }

    const total = await Course.countDocuments(filter);

    return NextResponse.json({
      success: true,
      courses: finalCourses,
      pagination: {
        total: finalCourses.length,
        page,
        limit,
        totalPages: Math.ceil(finalCourses.length / limit),
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

