const API = "http://localhost:8787";

export async function GET() {
  try {
    const res = await fetch(`${API}/orders`);
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("Orders fetch error:", e);
    return Response.json({ orders: [] });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;
    const res = await fetch(`${API}/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("Order update error:", e);
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}
