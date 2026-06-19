import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import p7 from "@/assets/project-7.jpg";
import p8 from "@/assets/project-8.jpg";
import craft from "@/assets/about-craft.jpg";
import sustain from "@/assets/sustainability.jpg";

export type WorldCredit = { role: string; name: string };
export type WorldStat = { value: string; label: string };
export type WorldProcess = { title: string; body: string; image: string };

export type World = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
  category: string;
  heroImage: string;
  gallery: string[];
  vimeoId: string;
  intro: string;
  facts: { label: string; value: string }[];
  credits?: WorldCredit[];
  process: WorldProcess[];
  results: WorldStat[];
};

export const worlds: World[] = [
  {
    slug: "clayface",
    title: "Clayface",
    summary: "Forging the textured underworld of a DC feature villain.",
    role: "Scenic Construction · Sculpting · Standby",
    year: "2025",
    tags: ["Feature Film", "DC", "Practical Build"],
    category: "Feature Film",
    heroImage: p3,
    gallery: [p3, p1, p5, p2, p4, p6, p8],
    vimeoId: "76979871",
    intro:
      "A six-month build across two sound stages, translating James Price's production design into a fully practical, camera-ready world. Every surface was sculpted, aged and finished in-house — from the cathedral-scale antagonist lair down to the smallest hand-cast prop.",
    facts: [
      { label: "Stages", value: "2" },
      { label: "Build weeks", value: "26" },
      { label: "Sculpted sqm", value: "1,800" },
      { label: "Crew at peak", value: "64" },
    ],
    credits: [
      { role: "Director", name: "James Watkins" },
      { role: "Producer", name: "James Gunn" },
      { role: "Production Design", name: "James Price" },
    ],
    process: [
      {
        title: "From maquette to monument",
        body: "Starting from the art department's quarter-scale maquettes, our sculpting team scaled forms in EPS and hard-coated for camera durability — preserving every gestural mark of the original.",
        image: craft,
      },
      {
        title: "A palette of decay",
        body: "Twelve bespoke paint and patina recipes were developed with the DOP, calibrated under the film's tungsten and HMI mix so the surface read the same way wet, dry and dust-blown.",
        image: p5,
      },
      {
        title: "Modular for the schedule",
        body: "The hero set was engineered in tessellating sections so the unit could re-block scenes in hours rather than days. Standby scenics travelled with the unit through every shoot week.",
        image: p1,
      },
    ],
    results: [
      { value: "26wk", label: "Build" },
      { value: "1,800m²", label: "Sculpted" },
      { value: "0", label: "Lost shoot days" },
      { value: "100%", label: "In-house" },
    ],
  },
  {
    slug: "you",
    title: "You",
    summary: "Five interiors. One unreliable narrator. A returning Netflix world.",
    role: "Set Build · Dressing · Standby Scenics",
    year: "2024",
    tags: ["Netflix", "Series", "Returning World"],
    category: "TV Series",
    heroImage: p5,
    gallery: [p5, p7, p2, p8, p1, p4, p3],
    vimeoId: "76979871",
    intro:
      "Working alongside production designer Kevin Phipps, we delivered five recurring interiors for the season — each engineered to wild for camera and re-dressable across multiple narrative beats. Continuity was protected from block one through to wrap.",
    facts: [
      { label: "Recurring sets", value: "5" },
      { label: "Block schedule", value: "18 wks" },
      { label: "Wild walls", value: "42" },
      { label: "Re-dresses", value: "23" },
    ],
    credits: [
      { role: "Director", name: "John Scott" },
      { role: "Producer", name: "Penn Badgley" },
      { role: "Co-Executive Producer", name: "Matthew Patnick" },
      { role: "Production Design", name: "Kevin Phipps" },
    ],
    process: [
      {
        title: "Designed to wild",
        body: "Every wall, ceiling piece and unit was specified for fly-out access. Camera operators could choose any angle on any day without a rebuild — a quiet efficiency that paid back across the block.",
        image: p7,
      },
      {
        title: "Re-dressable by design",
        body: "Surface finishes were layered so the same hero room could be aged forward and pulled back across timelines — a clean continuity tool for the edit.",
        image: p2,
      },
    ],
    results: [
      { value: "5", label: "Hero sets" },
      { value: "18wk", label: "Block" },
      { value: "23", label: "Re-dresses" },
      { value: "0", label: "Reshoots" },
    ],
  },
  {
    slug: "trespass-against-us",
    title: "Trespass Against Us",
    summary: "A Cotswolds traveller world built honestly, weathered authentically.",
    role: "Exterior Build · Vehicle Dressing · Scenic Finishing",
    year: "2024",
    tags: ["Feature Film", "Location Build", "Period"],
    category: "Feature Film",
    heroImage: p1,
    gallery: [p1, p6, p4, p3, p8, p5, p2],
    vimeoId: "76979871",
    intro:
      "An on-location field build with Nick Palmer's design team — caravans, lean-tos, scrap mountains and lived-in trackways. Every element was constructed with honest materials and aged on-site so the camera never had to look twice.",
    facts: [
      { label: "On location", value: "8 wks" },
      { label: "Structures", value: "31" },
      { label: "Vehicles dressed", value: "14" },
      { label: "Weathering passes", value: "4" },
    ],
    credits: [
      { role: "Director", name: "Adam Smith" },
      { role: "Producer", name: "Andrea Calderwood" },
      { role: "Producer", name: "Gail Egan" },
      { role: "Production Design", name: "Nick Palmer" },
    ],
    process: [
      {
        title: "Honest materials",
        body: "Sourced reclaimed timber, scrap steel and salvaged vehicle parts from within fifty miles of the unit base. The set was the location — we just gave it a deeper history.",
        image: p6,
      },
      {
        title: "Weathering as a discipline",
        body: "Four full weathering passes were scheduled across the build — sun, rain, dust and human wear. Each pass was approved by the DOP under shoot conditions, not workshop light.",
        image: p4,
      },
      {
        title: "Strike without trace",
        body: "Every fixing was reversible. The field returned to its tenant farmer in better condition than we'd found it — a working principle for every location we touch.",
        image: sustain,
      },
    ],
    results: [
      { value: "8wk", label: "On location" },
      { value: "31", label: "Built" },
      { value: "100%", label: "Reclaimed timber" },
      { value: "0", label: "Site damage" },
    ],
  },
];

export const worldBySlug = (slug: string) => worlds.find((w) => w.slug === slug);
export const nextWorld = (slug: string) => {
  const i = worlds.findIndex((w) => w.slug === slug);
  if (i === -1) return worlds[0];
  return worlds[(i + 1) % worlds.length];
};
