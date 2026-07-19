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
  const columns = (data?.columns ?? []) as { title: string; links: string[] }[];
  const instagram = data?.instagram || null;
  const linkedin = data?.linkedin || null;
  const vimeo = data?.vimeo || null;

  return (
    <footer id="contact" className="bg-zinc-950 text-white">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col md:items-start">
            <div className="flex flex-col items-center">
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
              <div className="mt-8 mb-6">
                <div className="inline-flex items-center justify-center rounded-full border border-white/20 p-6 bg-white/5 transition-colors hover:bg-white/10">
                  <img
                    src="/LogoWhite.png"
                    alt="Construct Scenery Logo"
                    className="h-32 w-32 object-contain opacity-90 mix-blend-screen [clip-path:circle(48%)]"
                  />
                </div>
              </div>
            </div>


          </div>

          {columns.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map((link: any) => {
                  const isString = typeof link === "string";
                  const label = isString ? link : link.label;
                  const url = isString ? "#" : link.url;
                  
                  return (
                    <li key={label}>
                      <a href={url} className="text-sm text-white/80 hover:text-white transition-colors">
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Construct Scenery Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                IMDB
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

          </div>
        </div>
      </div>
    </footer>
  );
}
