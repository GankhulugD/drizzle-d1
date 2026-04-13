/**
 * POST /api/auth/sign-in
 *
 * This route proxies authentication requests to the backend Cloudflare Worker.
 * It receives the JWT token from the backend and sets it as an httpOnly cookie
 * on the response, ensuring the browser cannot access it via JavaScript.
 */

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Forward auth request to backend
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return Response.json(
        { error: errorData.error || "Authentication failed" },
        { status: res.status },
      );
    }

    const data = await res.json();
    const { message, user } = data;
    const token = res.headers.get("set-cookie");

    if (!token) {
      console.error("No token in backend response");
      return Response.json(
        { error: "No token received from backend" },
        { status: 500 },
      );
    }

    // Create response with user data
    const responseBody = JSON.stringify({ success: true, user, message });

    // Forward the Set-Cookie header from backend
    const response = new Response(responseBody, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": token,
      },
    });

    return response;
  } catch (e: unknown) {
    console.error("Auth sign-in error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
