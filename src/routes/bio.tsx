import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getBio } from "@/lib/api/client";
import { Nav } from "@/components/landing/Nav";

export const Route = createFileRoute("/bio")({
  component: BioPage,
});

function BioPage() {
  const { data: bio, isLoading } = useQuery({
    queryKey: ["bio"],
    queryFn: getBio,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm tracking-widest text-muted-foreground uppercase">Loading...</div>
      </div>
    );
  }

  if (!bio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm tracking-widest text-muted-foreground uppercase">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      
      <main className="container-x relative pt-32 pb-24 md:pt-48">
        <div className="mx-auto max-w-2xl text-center">
          {bio.imageUrl && (
            <img
              src={bio.imageUrl}
              alt={bio.name}
              className="mx-auto h-32 w-32 rounded-full object-cover shadow-elevated md:h-40 md:w-40"
            />
          )}
          
          <h1 className="font-display mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
            {bio.name}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {bio.role}
          </p>
          
          <p className="mt-8 text-lg leading-relaxed text-foreground/80 md:text-xl">
            {bio.description}
          </p>

          {bio.links.length > 0 && (
            <div className="mt-12 flex flex-col gap-4">
              {bio.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-between overflow-hidden rounded-full border border-border bg-card px-8 py-5 transition-all hover:border-foreground"
                >
                  <span className="font-display text-lg font-medium transition-transform group-hover:translate-x-2">
                    {link.label}
                  </span>
                  <svg
                    className="h-5 w-5 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
