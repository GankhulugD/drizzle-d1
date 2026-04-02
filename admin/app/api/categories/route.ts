const API = "http://localhost:8787";

export async function GET() {
  try {
    const res = await fetch(`${API}/categories`);
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    return Response.json({ categories: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
