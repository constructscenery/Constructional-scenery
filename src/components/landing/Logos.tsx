const logos = ["BBC", "ITV", "Netflix", "Sky", "Channel 4", "Amazon Studios", "Apple TV+", "Disney+"];

export function Logos() {
  return (
    <section className="border-y border-border bg-background py-16">
      <div className="container-x">
        <p className="mb-10 text-center text-[11px] uppercase tracking-[0.3em] text-chrome">
          Trusted by industry leaders
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 md:grid-cols-8">
          {logos.map((l) => (
            <div
              key={l}
              className="group flex items-center justify-center"
            >
              <span className="font-display text-xl md:text-2xl text-chrome/70 grayscale transition-all duration-500 group-hover:text-ink group-hover:scale-105">
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
