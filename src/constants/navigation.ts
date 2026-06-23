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
  instagram: "https://www.instagram.com/wicare.neuroptimal",
  facebook: "https://www.facebook.com/share/1GXVc4h1VT/",
  tiktok: "https://www.tiktok.com/@wicare.neuroptimal",
  whatsapp: "https://whatsapp.com/channel/0029VbDIUHRKLaHlknEyEu3x",
};
