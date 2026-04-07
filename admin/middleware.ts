import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Күүкиний нэр заавал SignInForm-той ижил байх ёстой: "auth-token"
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Root (/) хаяг дээрх зохицуулалт
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 2. Auth API болон Auth Pages (/auth/login, /auth/sign-up)
  // Нэвтэрсэн хэрэглэгч дахин login руу орох гэвэл home руу буцаана
  if (pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // 3. Бусад API routes хамгаалалт (Auth-аас бусад)
  if (pathname.startsWith("/api")) {
    // Нэвтрэх API-г алгасна
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }
    // Бусад API дээр токен байхгүй бол 401 алдаа буцаана
    if (!token) {
      return NextResponse.json(
        { error: "Нэвтрэх эрхгүй байна (Unauthorized)" },
        { status: 401 },
      );
    }
    return NextResponse.next();
  }

  // 4. Хамгаалалттай хуудсууд (/home, /admin)
  const protectedPaths = ["/home", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    if (!token) {
      // Токен байхгүй бол login руу, ирсэн замыг нь 'next' query-гээр дамжуулж болно
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Эдгээр замууд дээр middleware ажиллана
export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/api/:path*",
  ],
};
