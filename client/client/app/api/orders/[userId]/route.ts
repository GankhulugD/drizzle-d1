const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const res = await fetch(`${BACKEND_URL}/orders/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch orders" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("Orders userId GET error:", e);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
