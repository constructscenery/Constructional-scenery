const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

// ngrok free tier shows a browser-warning interstitial; this header bypasses it
const EXTRA_HEADERS: Record<string, string> = BASE.includes("ngrok")
  ? { "ngrok-skip-browser-warning": "true" }
  : {};

export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: EXTRA_HEADERS });
  if (!res.ok) throw new Error(`API ${res.status} – ${path}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "API error");
  return json.data as T;
}
