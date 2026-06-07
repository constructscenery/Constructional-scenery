export function Footer() {
  const cols = [
    { t: "Studio", l: ["About", "Craft", "Workshop", "Careers"] },
    { t: "Capabilities", l: ["Film", "Television", "Commercial", "Experiential"] },
    { t: "Work", l: ["Projects", "Case Studies", "Press", "Awards"] },
    { t: "Contact", l: ["Enquiries", "Locations", "Press", "Newsletter"] },
  ];

  return (
    <footer className="bg-ink text-background">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-display text-2xl tracking-tight">
              Construct<span className="text-white/40">/</span>Scenery
            </div>
            <p className="mt-6 max-w-xs text-sm text-white/60 leading-relaxed">
              The UK&apos;s premium scenic construction partner. Workshop in London. Builds worldwide.
            </p>

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

          {cols.map((c) => (
            <div key={c.t} className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">{c.t}</div>
              <ul className="space-y-3">
                {c.l.map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {i}
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
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Vimeo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
