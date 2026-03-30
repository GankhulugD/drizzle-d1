import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Хэрэв token байхгүй бол /home руу нэвтрүүлэхгүй
  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // 2. Хэрэв token байгаа бол /auth хуудаснууд руу дахин оруулахгүй
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Middleware ажиллах замуудыг тодорхойлно
  matcher: ["/home/:path*", "/auth/:path*"],
};
