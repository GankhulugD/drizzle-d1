/**
 * JWT Token verification utilities
 * Server-side only - these functions run on the server
 */

export interface DecodedToken {
  sub: number;
  email: string;
  role?: string;
  exp: number;
  iat?: number;
  [key: string]: unknown;
}

const SECRET = "xK9#mP2$nQ8@vL5&wR3jH7!cF4*bN6^qT1";

/**
 * Decode JWT token manually (for basic implementation)
 * In production, use 'jose' library for better verification
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Decode payload (second part)
    const payload = parts[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8"),
    ) as DecodedToken;

    // Check expiry
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      console.log("Token expired");
      return null; // Token expired
    }

    return decoded;
  } catch (e) {
    console.error("Token decode error:", e);
    return null;
  }
}

/**
 * Extract token from request (from cookies or Authorization header)
 */
export function getTokenFromRequest(req: Request): string | null {
  // First, try Authorization header (Bearer token)
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  // Then, try cookies
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        return decodeURIComponent(value);
      }
    }
  }

  return null;
}

/**
 * Verify token - returns decoded token or null if invalid
 */
export function verifyToken(req: Request): DecodedToken | null {
  const token = getTokenFromRequest(req);
  if (!token) {
    console.log("No token found in request");
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    console.log("Token decode failed");
    return null;
  }

  return decoded;
}

/**
 * Verify admin token - returns decoded token only if user is admin
 */
export function verifyAdminToken(req: Request): DecodedToken | null {
  const token = getTokenFromRequest(req);
  if (!token) {
    console.log("No token found in request");
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    console.log("Token decode failed");
    return null;
  }

  // Check for admin role
  if (decoded.role !== "ADMIN") {
    console.log("User is not admin. Role:", decoded.role);
    return null;
  }

  return decoded;
}
