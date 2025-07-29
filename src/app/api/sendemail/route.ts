// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "qurroayun.evindo@gmail.com",
    subject: `Pesan dari ${name} (${phone})`,
    text: `
Pesan dari website:

Nama: ${name}
Email: ${email}
No HP: ${phone}
Pesan:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email gagal dikirim:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
