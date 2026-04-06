const API = "http://localhost:8787";

function getAuthHeader(req: Request): HeadersInit {
  const auth = req.headers.get("Authorization");
  return auth
    ? { "Content-Type": "application/json", Authorization: auth }
    : { "Content-Type": "application/json" };
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const res = await fetch(`${API}/foods/${id}`, {
      method: "PATCH",
      headers: getAuthHeader(req),
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return Response.json(text ? JSON.parse(text) : {});
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res = await fetch(`${API}/foods/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(req),
    });
    const text = await res.text();
    return Response.json(text ? JSON.parse(text) : {});
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
