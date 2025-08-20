import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bypass public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/auth/login") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Jika belum login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = token.role as string;

  // Hanya izinkan SuperAdmin masuk dashboard
  if (pathname.startsWith("/dashboard")) {
    if (role === "SuperAdmin") {
      return NextResponse.next();
    }
    if (pathname.startsWith("/auth/register")) {
      if (role === "SuperAdmin") return NextResponse.next();
    }
    // Finance hanya bisa ke /dashboard/finance
    if (role === "Finance" && pathname.startsWith("/dashboard/finance")) {
      return NextResponse.next();
    }

    // Role lain ditolak
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/register"],
};
