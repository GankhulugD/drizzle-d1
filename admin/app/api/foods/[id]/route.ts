const API = "http://localhost:8787";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const res = await fetch(`${API}/foods/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return Response.json(text ? JSON.parse(text) : {});
  } catch (e) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res = await fetch(`${API}/foods/${id}`, { method: "DELETE" });
    const text = await res.text();
    return Response.json(text ? JSON.parse(text) : {});
  } catch (e) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
