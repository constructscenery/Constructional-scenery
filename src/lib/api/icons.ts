import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  Tv,
  Megaphone,
  Sparkles,
  Paintbrush2,
  Hammer,
  TreePine,
  Recycle,
  Wind,
  Leaf,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Clapperboard,
  Tv,
  Megaphone,
  Sparkles,
  Paintbrush2,
  Hammer,
  TreePine,
  Recycle,
  Wind,
  Leaf,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Hammer;
}
