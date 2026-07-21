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
      
      <main className="container-x relative pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-[92%] sm:w-[88%] md:w-[80%] max-w-5xl text-center">
          {bio.imageUrl && (
            <img
              src={bio.imageUrl}
              alt={bio.name}
              className="mx-auto h-32 w-32 rounded-full object-cover shadow-elevated border-2 border-border/80 md:h-44 md:w-44 transition-transform hover:scale-105"
            />
          )}
          
          <h1 className="font-display mt-6 md:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {bio.name}
          </h1>
          <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground font-medium">
            {bio.role}
          </p>
          
          <div className="mt-8 md:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose text-foreground/90 font-normal text-center">
            {bio.description}
          </div>

          {bio.links.length > 0 && (
            <div className="mt-12 md:mt-16 flex flex-col gap-4 max-w-xl mx-auto w-full">
              {bio.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-between overflow-hidden rounded-full border border-border bg-card px-6 sm:px-8 py-4 sm:py-5 transition-all hover:border-foreground hover:shadow-lg"
                >
                  <span className="font-display text-base sm:text-lg font-medium transition-transform group-hover:translate-x-2">
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
