const API = "http://localhost:8787";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return Response.json(data, { status: res.status });
    }

    // Server-аас token авч Next.js талд httpOnly cookie тавина
    const response = Response.json({
      message: data.message,
      user: data.user,
    });

    const headers = new Headers(response.headers);
    headers.set(
      "Set-Cookie",
      `token=${data.token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Strict`,
    );

    return new Response(
      JSON.stringify({ message: data.message, user: data.user }),
      {
        status: 200,
        headers,
      },
    );
  } catch (e) {
    return Response.json(
      { error: "Серверт холбогдоход алдаа гарлаа" },
      { status: 500 },
    );
  }
}
