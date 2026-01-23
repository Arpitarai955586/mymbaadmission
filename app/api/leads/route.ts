import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  // 1️⃣ Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2️⃣ Send email
  await transporter.sendMail({
    from: `"Counselling Lead" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL, // 🔥 where you want leads
    subject: "New Counselling Form Submission",
    html: `
      <h3>New Lead Received</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message || "N/A"}</p>
    `,
  });

  return NextResponse.json({
    success: true,
    message: "Lead submitted successfully",
  });
}
