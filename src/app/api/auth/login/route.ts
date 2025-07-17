import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30m" }
    );

    // Gunakan NextResponse biasa agar bisa set cookie
    const response = new NextResponse(
      JSON.stringify({
        message: "Login success",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Set cookie JWT
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
