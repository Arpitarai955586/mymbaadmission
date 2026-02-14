import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/Blog";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();
    const { slug } = await params;

    const blog = await BlogPost.findOne({
      slug,
      is_published: true,
    }).select("-__v");

    if (!blog) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("GET blog by slug error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
