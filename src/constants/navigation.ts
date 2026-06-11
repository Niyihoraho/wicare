export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Neurofeedback", href: "/neurofeedback" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/wicarecenter",
  facebook: "https://www.facebook.com/wicarecenter",
  linkedin: "https://www.linkedin.com/company/wicarecenter",
  twitter: "https://x.com/wicarecenter",
  youtube: "https://www.youtube.com/@wicarecenter",
  tiktok: "https://www.tiktok.com/@wicarecenter",
};
