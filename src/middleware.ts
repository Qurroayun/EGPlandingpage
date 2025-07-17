import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("🔥 MIDDLEWARE EXECUTED:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    console.log("TOKEN ADA:", !!token);

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    } catch (err) {
      console.warn("❌ TOKEN INVALID:", err);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
