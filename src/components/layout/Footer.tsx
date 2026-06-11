import Link from "next/link";
import { NAV_LINKS } from "@/constants/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { AdminLoginModal } from "@/components/ui/AdminLoginModal";

export function Footer() {
  return (
    <footer className="bg-brand-navy py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <AdminLoginModal />
          </div>
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} WiCare NeurOptimal Center. All rights
            reserved.
          </p>
          {/* Social Media Links */}
          <SocialLinks variant="muted" className="mt-2" />
        </div>

        <div className="flex items-center flex-wrap justify-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-brand-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <p className="text-white/30 text-[10px] text-center max-w-3xl mx-auto leading-relaxed">
          Disclaimer: NeurOptimal is a training tool and does not diagnose,
          treat, mitigate or cure any disease, disorder or abnormal physical
          state, nor does it restore, modify or correct the body&apos;s structure
          or functioning. If you require medical assistance, please seek the
          advice of your physician.
        </p>
      </div>
    </footer>
  );
}
