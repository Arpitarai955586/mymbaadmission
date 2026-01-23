import { NextResponse } from "next/server";
import { seedCollegeRankings } from "@/lib/seedRankings";

export async function POST() {
  try {
    const result = await seedCollegeRankings();
    return NextResponse.json({ 
      success: true, 
      message: `Seeded rankings for ${result.updated} colleges` 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Failed to seed rankings" 
    }, { status: 500 });
  }
}
