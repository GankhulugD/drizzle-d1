import { getTokenFromRequest } from "@/lib/auth";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function POST(req: Request) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return Response.json({ error: errorData.error || "Failed to create order" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("Orders POST error:", e);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
