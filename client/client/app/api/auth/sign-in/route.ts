const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return Response.json(
        { error: errorData.error || "Authentication failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const setCookie = res.headers.get("set-cookie");

    const response = new Response(JSON.stringify({ success: true, user: data.user, message: data.message }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...(setCookie ? { "Set-Cookie": setCookie } : {}),
      },
    });

    return response;
  } catch (e) {
    console.error("Sign-in error:", e);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
