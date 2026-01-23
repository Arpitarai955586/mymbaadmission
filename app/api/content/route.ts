import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import Content from "@/models/Content";

export async function POST(req: Request) {
  await connectDB();

  const auth = authGuard(req);
  if ("error" in auth) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  const roleCheck = roleGuard(auth.user.role, ["ADMIN", "PUBLISHER"]);
  if (roleCheck) return roleCheck;

  const body = await req.json();
  const { title, slug, body: contentBody, type } = body;

  if (!title || !slug || !contentBody || !type) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const exists = await Content.findOne({ slug });
  if (exists) {
    return NextResponse.json(
      { message: "Slug already exists" },
      { status: 409 }
    );
  }

  const content = await Content.create({
    title,
    slug,
    body: contentBody,
    type,
    created_by: auth.user.id,
    is_published: false,
  });

  return NextResponse.json(
    { success: true, content },
    { status: 201 }
  );
}





export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // blog / guide / article

  const filter: any = { is_published: true };
  if (type) filter.type = type;

  const content = await Content.find(filter)
    .select("title slug type created_at")
    .sort({ created_at: -1 });

  return NextResponse.json({
    success: true,
    content,
  });
}   