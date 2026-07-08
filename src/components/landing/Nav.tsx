import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "Studio" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-6"
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 glass shadow-elevated`}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-display text-base tracking-tight text-ink">
                Construct Scenery
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[13px] font-medium text-ink-soft hover:text-ink transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="#contact"
                className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-background hover:opacity-90 transition"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
