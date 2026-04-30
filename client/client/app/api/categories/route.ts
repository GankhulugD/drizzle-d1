import { getTokenFromRequest } from "@/lib/auth";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function GET(req: Request) {
  try {
    const token = getTokenFromRequest(req);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BACKEND_URL}/categories`, { headers });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch categories" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("Categories GET error:", e);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
