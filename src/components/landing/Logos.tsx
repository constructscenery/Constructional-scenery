import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import type { ApiLogo } from "@/lib/api/types";

export function Logos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["logos"],
    queryFn: () => apiFetch<ApiLogo[]>("/api/logos"),
    staleTime: 5 * 60_000,
  });

  const logos = data?.filter((l) => l.visible) ?? [];

  return (
    <section className="border-y border-border bg-background py-16">
      <div className="container-x">
        <p className="mb-10 text-center text-[11px] uppercase tracking-[0.3em] text-chrome">
          Trusted by industry leaders
        </p>

        {isPending ? (
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-12">
            {Array.from({ length: 8 }).map((_, k) => (
              <div key={k} className="flex items-center justify-center">
                <div className="h-6 w-20 animate-pulse rounded bg-muted/40" />
              </div>
            ))}
          </div>
        ) : isError || logos.length === 0 ? null : (
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-12">
            {logos.map((l) => (
              <div key={l.id} className="group flex items-center justify-center">
                {l.imageUrl ? (
                  <img
                    src={l.imageUrl}
                    alt={l.name}
                    loading="lazy"
                    className="max-h-12 md:max-h-16 w-auto max-w-[140px] md:max-w-[180px] object-contain grayscale opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-display text-xl md:text-2xl text-chrome/70 grayscale transition-all duration-500 group-hover:text-ink group-hover:scale-105">
                    {l.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
