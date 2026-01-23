import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, course, city } = await req.json();

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    // 🔐 Gmail SMTP (recommended)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Website Enquiry" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, // 👈 Admin email
      subject: "📩 New Free Session Enquiry",
      html: `
        <h2>New Student Enquiry</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> +91 ${phone}</p>
        <p><b>Course:</b> ${course}</p>
        <p><b>City:</b> ${city}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Enquiry sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { message: "Failed to send enquiry" },
      { status: 500 }
    );
  }
}
