import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "xK9#mP2$nQ8@vL5&wR3jH7!cF4*bN6^qT1",
);

async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Root
  if (pathname === "/") {
    if (!token)
      return NextResponse.redirect(new URL("/auth/login", request.url));
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Auth API routes — нэвтрэх шаардлагагүй, шууд дамжуулна
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Бусад API routes — token шалгана
  if (pathname.startsWith("/api/")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const valid = await verifyToken(token);
    if (!valid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${token}`);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // /home — token шалгана
  if (pathname.startsWith("/home")) {
    if (!token)
      return NextResponse.redirect(new URL("/auth/login", request.url));
    const valid = await verifyToken(token);
    if (!valid) {
      const res = NextResponse.redirect(new URL("/auth/login", request.url));
      res.cookies.delete("token");
      return res;
    }
  }

  // /auth — token байвал home руу
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/auth/:path*", "/api/:path*"],
};
