import type { Route } from "./+types/api.chat";

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const backendBase =
    process.env.BACKEND_URL ??
    (process.env.NODE_ENV === "production"
      ? "http://backend:8080"
      : "http://localhost:8080");
  const res = await fetch(`${backendBase}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "backend_error" }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
