export async function POST() {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
    },
  });
  return response;
}
