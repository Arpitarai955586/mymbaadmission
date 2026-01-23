import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function GET() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "SMTP TEST",
    text: "SMTP working",
  });

  return NextResponse.json({ ok: true });
}
