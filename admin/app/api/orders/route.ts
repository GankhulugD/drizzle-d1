import { verifyToken, getTokenFromRequest } from "@/lib/auth";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function GET(req: Request) {
  try {
    const token = verifyToken(req);
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenStr = getTokenFromRequest(req);
    const res = await fetch(`${BACKEND_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        ...(tokenStr && { Authorization: `Bearer ${tokenStr}` }),
      },
    });
    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch orders" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e: unknown) {
    console.error("Orders GET error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const token = verifyToken(req);
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, status } = body;
    const tokenStr = getTokenFromRequest(req);

    const res = await fetch(`${BACKEND_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(tokenStr && { Authorization: `Bearer ${tokenStr}` }),
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to update order" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e: unknown) {
    console.error("Orders PATCH error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
