import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Connect to DB inside function
    await connectDB();
    
    // Get models using mongoose.models to avoid overwrites
    const College = mongoose.models.College;
    const Course = mongoose.models.Course;
    const CollegeCourse = mongoose.models.CollegeCourse;
    
    if (!College || !Course || !CollegeCourse) {
      return NextResponse.json({ 
        success: false, 
        message: "Models not properly initialized" 
      }, { status: 500 });
    }
    
    // Get some colleges
    const colleges = await College.find({}).limit(5);
    
    if (colleges.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "No colleges found in database" 
      }, { status: 400 });
    }
    
    // Create some sample courses if they don't exist
    const sampleCourses = [
      { 
        id: "course-cs-001",
        name: "Computer Science", 
        slug: "computer-science", 
        duration_years: 4,
        degree: "B.Tech",
        default_fees: { currency: "INR", total_fee: 500000 },
        status: "Active"
      },
      { 
        id: "course-me-001",
        name: "Mechanical Engineering", 
        slug: "mechanical-engineering", 
        duration_years: 4,
        degree: "B.Tech",
        default_fees: { currency: "INR", total_fee: 600000 },
        status: "Active"
      },
      { 
        id: "course-bba-001",
        name: "Business Administration", 
        slug: "business-administration", 
        duration_years: 3,
        degree: "BBA",
        default_fees: { currency: "INR", total_fee: 400000 },
        status: "Active"
      },
      { 
        id: "course-mbbs-001",
        name: "Medicine", 
        slug: "medicine", 
        duration_years: 5,
        degree: "MBBS",
        default_fees: { currency: "INR", total_fee: 1000000 },
        status: "Active"
      },
      { 
        id: "course-physics-001",
        name: "Physics", 
        slug: "physics", 
        duration_years: 3,
        degree: "B.Sc",
        default_fees: { currency: "INR", total_fee: 300000 },
        status: "Active"
      }
    ];
    
    for (const courseData of sampleCourses) {
      const existingCourse = await Course.findOne({ slug: courseData.slug });
      if (!existingCourse) {
        await Course.create(courseData);
      }
    }
    
    // Get the created courses
    const courses = await Course.find({});
    
    let linkedCount = 0;
    
    // Link colleges to courses
    for (const college of colleges) {
      // Link 2-4 random courses to each college
      const numCourses = Math.floor(Math.random() * 3) + 2;
      const selectedCourses = courses.sort(() => 0.5 - Math.random()).slice(0, numCourses);
      
      for (const course of selectedCourses) {
        const existingLink = await CollegeCourse.findOne({
          college_id: college._id,
          course_id: course._id
        });
        
        if (!existingLink) {
          await CollegeCourse.create({
            college_id: college._id,
            course_id: course._id
          });
          linkedCount++;
        }
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Sample college-course relationships created",
      data: {
        colleges: colleges.length,
        courses: courses.length,
        linkedRelationships: linkedCount
      }
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Failed to create sample data"
    }, { status: 500 });
  }
}
