const API = "http://localhost:8787";

function getAuthHeader(req: Request): HeadersInit {
  const auth = req.headers.get("Authorization");
  return auth
    ? { "Content-Type": "application/json", Authorization: auth }
    : { "Content-Type": "application/json" };
}

export async function GET(req: Request) {
  try {
    const res = await fetch(`${API}/categories`, {
      headers: getAuthHeader(req),
    });
    const text = await res.text();
    return Response.json(text ? JSON.parse(text) : {});
  } catch {
    return Response.json({ categories: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API}/categories`, {
      method: "POST",
      headers: getAuthHeader(req),
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return Response.json(text ? JSON.parse(text) : {});
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
