"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, Lock, LogOut } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/actions/auth";

export function Navbar({ isAdmin }: { isAdmin?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="WiCare NeurOptimal Center"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-bold tracking-wide leading-tight text-brand-navy">
                  WI CARE
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase leading-none text-brand-gold">
                  NeurOptimal
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg text-brand-navy/80",
                    "hover:text-brand-gold",
                    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300",
                    "hover:after:w-6"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {isAdmin && (
                <>
                  <Link
                    href="/admin/booking"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-brand-navy/60 hover:text-brand-gold bg-gray-50 border border-gray-100 hover:border-brand-gold/30 hover:bg-white"
                    title="Admin Dashboard"
                  >
                    <Lock className="w-4 h-4" />
                    <span className="hidden xl:inline">Admin</span>
                  </Link>
                  <button
                    onClick={async () => {
                      await logoutAdmin();
                      window.location.reload();
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-red-500/80 hover:text-red-600 bg-red-50 border border-red-100 hover:border-red-200"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden xl:inline">Logout</span>
                  </button>
                </>
              )}
              <Link
                href="/book-session"
                className={cn(
                  "inline-flex items-center justify-center px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-300",
                  "bg-brand-gold text-brand-navy",
                  "hover:bg-brand-gold-light hover:shadow-md"
                )}
              >
                Book a Session
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-50 p-2 rounded-xl transition-all duration-300",
                isMobileMenuOpen ? "text-white" : "text-brand-navy"
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-navy/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-8 py-24">
          <div className="flex flex-col items-center gap-2 w-full max-w-sm">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "w-full text-center py-3 text-xl font-display font-semibold text-white/90 tracking-wide",
                  "transition-all duration-300 hover:text-brand-gold",
                  "rounded-xl hover:bg-white/5",
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 60 + 100}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div
              className={cn(
                "w-full flex flex-col gap-3 mt-8 transition-all duration-300",
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isMobileMenuOpen
                  ? `${NAV_LINKS.length * 60 + 100}ms`
                  : "0ms",
              }}
            >
              {isAdmin && (
                <>
                  <Link
                    href="/admin/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Lock className="w-5 h-5" />
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      await logoutAdmin();
                      window.location.reload();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              )}
              <Link
                href="/book-session"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-4 rounded-md bg-brand-gold text-brand-navy font-semibold text-lg tracking-wide hover:bg-brand-gold-light transition-colors duration-300 shadow-sm"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
