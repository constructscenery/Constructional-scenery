// API response shapes — mirror the Prisma schema in construct-scenery-admin

export interface ApiHero {
  id: number;
  eyebrow: string;
  headline: string;
  rotatingItems: string[];
  bodyText: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
  videoUrl: string | null;
  videoPoster: string | null;
  trustStats: { value: string; label: string }[];
  logoVisible: boolean;
  logoOpacity: number;
  logoHeight: number;
}

export interface ApiLogo {
  id: number;
  name: string;
  imageUrl: string | null;
  order: number;
  visible: boolean;
}

export interface ApiAbout {
  id: number;
  headline: string;
  bodyText: string;
  imageUrl: string;
  imageAlt: string;
  stats: { value: string; label: string }[];
  pillars: { title: string; description: string }[];
}

export interface ApiProject {
  id: number;
  name: string;
  type: string;
  services: string;
  year: string;
  slug: string | null;
  imageUrl: string;
  span: string | null;
  order: number;
  visible: boolean;
}

export interface ApiProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  order: number;
}

export interface ApiTestimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  imageUrl: string;
  order: number;
  visible: boolean;
}

export interface ApiSustainabilityItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface ApiSustainability {
  id: number;
  headline: string;
  bodyText: string;
  imageUrl: string;
  imageAlt: string;
  items: ApiSustainabilityItem[];
}

export interface ApiContact {
  id: number;
  headline: string;
  bodyText: string;
  cta1Label: string;
  cta1Email: string;
  cta2Label: string;
  cta2Email: string;
}

export interface ApiFooterColumn {
  title: string;
  links: string[];
}

export interface ApiFooter {
  id: number;
  brandName: string;
  tagline: string;
  columns: ApiFooterColumn[];
  instagram: string | null;
  linkedin: string | null;
  vimeo: string | null;
}

export interface ApiWorldImage {
  id: number;
  url: string;
  order: number;
}

export interface ApiWorldFact {
  id: number;
  label: string;
  value: string;
  order: number;
}

export interface ApiWorldCredit {
  id: number;
  role: string;
  name: string;
  order: number;
}

export interface ApiWorldProcess {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  order: number;
}

export interface ApiWorldResult {
  id: number;
  value: string;
  label: string;
  order: number;
}

export interface ApiWorld {
  id: number;
  slug: string;
  title: string;
  summary: string;
  role?: string;
  year: string;
  tags: string[];
  category: string;
  heroImage: string;
  vimeoId: string;
  intro: string;
  gallery?: ApiWorldImage[];
  facts?: ApiWorldFact[];
  credits?: ApiWorldCredit[];
  process?: ApiWorldProcess[];
  results?: ApiWorldResult[];
  order: number;
  visible: boolean;
}
