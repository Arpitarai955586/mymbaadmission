import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import CollegeCourse from "@/models/CollegeCourse";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  // UNWRAP params (IMPORTANT)
  const { slug } = await context.params;
  
  console.log('🎯 Fetching single college by slug:', slug);

  const college = await College.findOne({ slug });

  if (!college) {
    console.log('❌ College not found for slug:', slug);
    return NextResponse.json(
      { success: false, message: "College not found" },
      { status: 404 }
    );
  }

  // Get actual course count for this college
  const courseCount = await CollegeCourse.countDocuments({ college_id: college._id });
  
  console.log('📚 Found college with course count:', { 
    collegeName: college.name, 
    courseCount,
    slug: college.slug 
  });

  // Transform college data to include UI fields
  const transformedCollege = {
    ...college.toObject(),
    // Add UI-specific fields with real data
    total_courses: courseCount,
    courseCount: college.courseCount || courseCount, // Use DB courseCount or fallback to calculated count
    ranking: college.ranking || "Not Ranked", // Use actual ranking from DB
    medianSalary: `₹${Math.floor(Math.random() * 20) + 5}LPA`, // Placeholder - should come from placement data
    examAccepted: "JEE, NEET, CET", // Placeholder - should come from exams collection
    featured: Math.random() > 0.7, // Randomly mark some as featured
  };

  console.log('📤 Returning college data for:', transformedCollege.name);
  
  return NextResponse.json({
    success: true,
    college: transformedCollege,
  });
}
