const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${res.status} – ${path}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "API error");
  return json.data as T;
}
