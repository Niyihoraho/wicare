import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import { SocialLinks } from "@/components/ui/SocialLinks";

interface CTAButton {
  label: string;
  href: string;
  external?: boolean;
}

interface CTASectionProps {
  heading?: string;
  description?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  showContactInfo?: boolean;
  showSocialLinks?: boolean;
}

export function CTASection({
  heading = "Ready to Transform Your Life?",
  description = "Experience the effortless, non-invasive power of NeurOptimal® neurofeedback. Book your free introductory session today and see how self-regulation can help you unlock your best self.",
  primaryCTA = { label: "Book Intro Session", href: "/book-session" },
  secondaryCTA = {
    label: "Contact on WhatsApp",
    href: CONTACT.whatsappUrl,
    external: true,
  },
  showContactInfo = true,
  showSocialLinks = true,
}: CTASectionProps) {
  return (
    <section className="relative py-24 bg-brand-cream overflow-hidden">
      {/* Subtle topography texture overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: "url('/topography-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.15)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy">
          {heading}
        </h2>
        <p className="text-lg text-brand-navy/70 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {primaryCTA &&
            (primaryCTA.external ? (
              <a
                href={primaryCTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-brand-navy text-white font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-brand-navy-light w-full sm:w-auto"
              >
                {primaryCTA.label}
              </a>
            ) : (
              <Link
                href={primaryCTA.href}
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-brand-navy text-white font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-brand-navy-light w-full sm:w-auto"
              >
                {primaryCTA.label}
              </Link>
            ))}

          {secondaryCTA &&
            (secondaryCTA.external ? (
              <a
                href={secondaryCTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white border border-brand-navy/10 text-brand-navy font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-50 w-full sm:w-auto"
              >
                {secondaryCTA.label}
              </a>
            ) : (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white border border-brand-navy/10 text-brand-navy font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-50 w-full sm:w-auto"
              >
                {secondaryCTA.label}
              </Link>
            ))}
        </div>

        {/* Quick Contact Info */}
        {showContactInfo && (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 text-sm font-medium text-brand-navy/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold" />
              {CONTACT.address}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-gold" />
              {CONTACT.phone}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              {CONTACT.hours}
            </div>
          </div>
        )}

        {/* Social Media Links */}
        {showSocialLinks && (
          <div className="flex justify-center pt-6 border-t border-brand-navy/10 max-w-xs mx-auto">
            <SocialLinks variant="dark" className="gap-6" />
          </div>
        )}
      </div>
    </section>
  );
}
