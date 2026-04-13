const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return Response.json(
        { error: data.error || data.message || "Registration failed" },
        { status: res.status },
      );
    }

    return Response.json(data, { status: 201 });
  } catch (e: unknown) {
    console.error("Auth sign-up error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
