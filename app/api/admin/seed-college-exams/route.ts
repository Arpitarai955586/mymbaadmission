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
    const Exam = mongoose.models.Exam;
    const CollegeExam = mongoose.models.CollegeExam;
    
    if (!College || !Exam || !CollegeExam) {
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
    
    // Create some sample exams if they don't exist
    const sampleExams = [
      { 
        exam_id: "exam-cat-001",
        name: "CAT (Common Admission Test)", 
        slug: "cat",
        category: "MBA Entrance",
        date: new Date("2024-12-03"),
        duration: "120 minutes",
        status: "Upcoming",
        description: "National level MBA entrance exam"
      },
      { 
        exam_id: "exam-mat-001",
        name: "MAT (Management Aptitude Test)", 
        slug: "mat",
        category: "Management",
        date: new Date("2024-10-15"),
        duration: "150 minutes",
        status: "Active",
        description: "All India entrance exam for MBA"
      },
      { 
        exam_id: "exam-gmat-001",
        name: "GMAT", 
        slug: "gmat",
        category: "International MBA",
        date: new Date("2024-11-01"),
        duration: "187 minutes",
        status: "Active",
        description: "Graduate Management Admission Test"
      },
      { 
        exam_id: "exam-jee-001",
        name: "JEE Main", 
        slug: "jee-main",
        category: "Engineering",
        date: new Date("2025-01-15"),
        duration: "180 minutes",
        status: "Upcoming",
        description: "National engineering entrance exam"
      },
      { 
        exam_id: "exam-neet-001",
        name: "NEET", 
        slug: "neet",
        category: "Medical",
        date: new Date("2025-05-05"),
        duration: "180 minutes",
        status: "Upcoming",
        description: "National medical entrance exam"
      },
      { 
        exam_id: "exam-cmat-001",
        name: "CMAT", 
        slug: "cmat",
        category: "Management",
        date: new Date("2024-11-20"),
        duration: "180 minutes",
        status: "Active",
        description: "Common Management Admission Test"
      }
    ];
    
    for (const examData of sampleExams) {
      const existingExam = await Exam.findOne({ slug: examData.slug });
      if (!existingExam) {
        await Exam.create(examData);
      }
    }
    
    // Get the created exams
    const exams = await Exam.find({});
    
    let linkedCount = 0;
    
    // Link colleges to exams
    for (const college of colleges) {
      // Link 2-4 random exams to each college
      const numExams = Math.floor(Math.random() * 3) + 2;
      const selectedExams = exams.sort(() => 0.5 - Math.random()).slice(0, numExams);
      
      for (const exam of selectedExams) {
        const existingLink = await CollegeExam.findOne({
          college_id: college._id,
          exam_id: exam._id
        });
        
        if (!existingLink) {
          await CollegeExam.create({
            college_id: college._id,
            exam_id: exam._id
          });
          linkedCount++;
        }
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Sample college-exam relationships created",
      data: {
        colleges: colleges.length,
        exams: exams.length,
        linkedRelationships: linkedCount
      }
    });
  } catch (error: any) {
    console.error("Seed exams error:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Failed to create sample exam data"
    }, { status: 500 });
  }
}
