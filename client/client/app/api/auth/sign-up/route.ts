const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return Response.json(
        { error: errorData.error || "Registration failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json({ success: true, user: data.user, message: data.message });
  } catch (e) {
    console.error("Sign-up error:", e);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
