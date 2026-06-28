// Maps the flat /assets/* paths stored in the database to the Vite content-hashed
// module URLs used at build time. Falls back to the raw URL for any path not in
// this map (i.e. real Cloudinary URLs once they're set up in the admin).

import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import p7 from "@/assets/project-7.jpg";
import p8 from "@/assets/project-8.jpg";
import aboutCraft from "@/assets/about-craft.jpg";
import sustainabilityImg from "@/assets/sustainability.jpg";
import heroSet from "@/assets/hero-set.jpg";

const LOCAL: Record<string, string> = {
  "/assets/project-1.jpg": p1,
  "/assets/project-2.jpg": p2,
  "/assets/project-3.jpg": p3,
  "/assets/project-4.jpg": p4,
  "/assets/project-5.jpg": p5,
  "/assets/project-6.jpg": p6,
  "/assets/project-7.jpg": p7,
  "/assets/project-8.jpg": p8,
  "/assets/about-craft.jpg": aboutCraft,
  "/assets/sustainability.jpg": sustainabilityImg,
  "/assets/hero-set.jpg": heroSet,
};

export function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  return LOCAL[url] ?? url;
}
