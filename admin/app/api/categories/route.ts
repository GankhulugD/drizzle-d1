import { verifyToken, getTokenFromRequest } from "@/lib/auth";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function GET(req: Request) {
  try {
    const token = verifyToken(req);
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenStr = getTokenFromRequest(req);
    const res = await fetch(`${BACKEND_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        ...(tokenStr && { Authorization: `Bearer ${tokenStr}` }),
      },
    });
    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch categories" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e: unknown) {
    console.error("Categories GET error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = verifyToken(req);
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const tokenStr = getTokenFromRequest(req);
    const res = await fetch(`${BACKEND_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(tokenStr && { Authorization: `Bearer ${tokenStr}` }),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to create category" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e: unknown) {
    console.error("Categories POST error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
