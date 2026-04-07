import { verifyToken, getTokenFromRequest } from "@/lib/auth";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8787";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = verifyToken(req);
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const tokenStr = getTokenFromRequest(req);
    const res = await fetch(`${BACKEND_URL}/foods/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(tokenStr && { Authorization: `Bearer ${tokenStr}` }),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to update food" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e: unknown) {
    console.error("Foods PATCH error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = verifyToken(req);
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const tokenStr = getTokenFromRequest(req);
    const res = await fetch(`${BACKEND_URL}/foods/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(tokenStr && { Authorization: `Bearer ${tokenStr}` }),
      },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to delete food" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (e: unknown) {
    console.error("Foods DELETE error:", String(e));
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
