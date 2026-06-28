import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { ApiFooter } from "@/lib/api/types";

export function Footer() {
  const { data } = useQuery({
    queryKey: ["footer"],
    queryFn: () => apiFetch<ApiFooter>("/api/footer"),
    staleTime: 5 * 60_000,
  });

  const brandName = data?.brandName ?? "Construct/Scenery";
  const tagline = data?.tagline ?? "";
  const columns = (data?.columns ?? []) as { title: string; links: string[] }[];
  const instagram = data?.instagram || null;
  const linkedin = data?.linkedin || null;
  const vimeo = data?.vimeo || null;

  return (
    <footer className="bg-zinc-950 text-white">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-display text-2xl tracking-tight">
              {brandName.includes("/") ? (
                <>
                  {brandName.split("/")[0]}
                  <span className="text-white/40">/</span>
                  {brandName.split("/")[1]}
                </>
              ) : (
                brandName
              )}
            </div>
            {tagline && (
              <p className="mt-6 max-w-xs text-sm text-white/60 leading-relaxed">{tagline}</p>
            )}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex items-center gap-2 rounded-full border border-white/15 p-1.5 max-w-sm"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-white/40 outline-none"
              />
              <button className="rounded-full bg-white text-black text-xs font-medium px-4 py-2 hover:bg-white/90 transition">
                Subscribe
              </button>
            </form>
          </div>

          {columns.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Construct Scenery Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            )}
            {vimeo && (
              <a href={vimeo} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Vimeo
              </a>
            )}
            {!instagram && !linkedin && !vimeo && (
              <>
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">Vimeo</a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
