// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Root зам буюу "/" дээр орж ирэхэд token байхгүй бол sign-in руу
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  // 2. Token байхгүй үед /home руу орох гэвэл sign-in руу
  if (!token && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. Token байгаа үед /auth хуудаснууд руу орох гэвэл home руу
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // "/" замыг заавал matcher дотор нэмж өгөх хэрэгтэй
  matcher: ["/", "/home/:path*", "/auth/:path*"],
};
