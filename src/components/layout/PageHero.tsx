"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CTAButton {
  label: string;
  href: string;
  external?: boolean;
}

interface PageHeroProps {
  title: string;
  titleAccent?: string;
  subtitle: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  backgroundImage?: string;
}

export function PageHero({
  title,
  titleAccent,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
}: PageHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {backgroundImage ? (
        <>
          {/* Full image background with clean dark overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : (
        <>
          {/* Background: light gray/cream base + topography pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-mist via-brand-cream to-brand-cream" />

          {/* Topography pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "url('/topography-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Subtle radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(234,240,247,0.6)_70%,_rgba(249,245,238,0.9)_100%)]" />

          {/* Decorative gold/navy blurred orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px] animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-navy-mid/5 blur-[100px] animate-pulse-slow"
            style={{ animationDelay: "3s" }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        {/* Main Headline */}
        <h1
          className={`mt-8 sm:mt-10 transition-all duration-700 delay-150 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className={`block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight ${backgroundImage ? "text-brand-cream" : "text-brand-navy"}`}>
            {title}
          </span>
          {titleAccent && (
            <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-gold leading-[1.05] tracking-tight mt-1 sm:mt-2">
              {titleAccent}
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 sm:mt-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } ${backgroundImage ? "text-white/80" : "text-brand-navy/60"}`}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        {(primaryCTA || secondaryCTA) && (
          <div
            className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[450ms] ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {primaryCTA &&
              (primaryCTA.external ? (
                <a
                  href={primaryCTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-brand-gold text-brand-navy font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-brand-gold-light"
                >
                  {primaryCTA.label}
                </a>
              ) : (
                <Link
                  href={primaryCTA.href}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-brand-gold text-brand-navy font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-brand-gold-light"
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
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-md font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md ${
                    backgroundImage
                      ? "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
                      : "bg-white border border-gray-200 text-brand-navy hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {secondaryCTA.label}
                </a>
              ) : (
                <Link
                  href={secondaryCTA.href}
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-md font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md ${
                    backgroundImage
                      ? "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
                      : "bg-white border border-gray-200 text-brand-navy hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {secondaryCTA.label}
                </Link>
              ))}
          </div>
        )}
      </div>

      {/* Bottom fade — only for default topography background */}
      {!backgroundImage && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />
      )}
    </section>
  );
}
