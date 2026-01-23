import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Course from "@/models/Course";
import CollegeCourse from "@/models/CollegeCourse";

export async function POST() {
  try {
    await connectDB();
    
    // Get some colleges
    const colleges = await College.find({}).limit(5);
    
    // Create some sample courses if they don't exist
    const sampleCourses = [
      { name: "Computer Science", slug: "computer-science", description: "CS course", duration: "4 years", level: "Undergraduate", fees: "₹50,000/year", category: "Engineering", created_by: "507f1f77bcf86cd799439011" },
      { name: "Mechanical Engineering", slug: "mechanical-engineering", description: "ME course", duration: "4 years", level: "Undergraduate", fees: "₹60,000/year", category: "Engineering", created_by: "507f1f77bcf86cd799439011" },
      { name: "Business Administration", slug: "business-administration", description: "BBA course", duration: "3 years", level: "Undergraduate", fees: "₹40,000/year", category: "Management", created_by: "507f1f77bcf86cd799439011" },
      { name: "Medicine", slug: "medicine", description: "MBBS course", duration: "5 years", level: "Undergraduate", fees: "₹100,000/year", category: "Medical", created_by: "507f1f77bcf86cd799439011" },
      { name: "Physics", slug: "physics", description: "B.Sc Physics", duration: "3 years", level: "Undergraduate", fees: "₹30,000/year", category: "Science", created_by: "507f1f77bcf86cd799439011" }
    ];
    
    for (const courseData of sampleCourses) {
      const existingCourse = await Course.findOne({ slug: courseData.slug });
      if (!existingCourse) {
        await Course.create(courseData);
      }
    }
    
    // Get the created courses
    const courses = await Course.find({});
    
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
        }
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Sample college-course relationships created" 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Failed to create sample data" 
    }, { status: 500 });
  }
}
