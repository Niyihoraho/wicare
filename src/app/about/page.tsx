"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Heart,
  Brain,
  Users,
  Globe,
  Award,
  BookOpen,
  Building2,
  Lightbulb,
  Target,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/* ============================================================
   Animated counter hook — counts up on scroll into view
   ============================================================ */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

/* ============================================================
   Stat Counter Component
   ============================================================ */
function StatCounter({
  value,
  suffix = "+",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl sm:text-6xl font-bold text-brand-gold mb-2">
        {count}
        <span className="text-brand-gold/70">{suffix}</span>
      </div>
      <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

/* ============================================================
   Timeline Item
   ============================================================ */
function TimelineItem({
  year,
  title,
  description,
  isLast = false,
}: {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-6 pb-10">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[15px] top-10 w-[2px] h-[calc(100%-20px)] bg-brand-gold/20" />
      )}
      {/* Dot */}
      <div className="relative flex-shrink-0 w-[32px] h-[32px] rounded-full bg-brand-gold/10 border-2 border-brand-gold/40 flex items-center justify-center mt-1">
        <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
      </div>
      {/* Content */}
      <div className="space-y-1.5">
        <span className="text-brand-gold text-xs font-semibold tracking-wider uppercase">
          {year}
        </span>
        <h3 className="font-display text-xl font-bold text-brand-cream">
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ============================================================
   About Page
   ============================================================ */
export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Pioneering Wellness"
        titleAccent="in Rwanda."
        subtitle="WiCare NeurOptimal Center is Rwanda's first dedicated neurofeedback center — a sanctuary for brain optimization, mental wellness, and personal transformation in the heart of Kigali."
        primaryCTA={{ label: "Book Intro Session", href: "/book-session" }}
        secondaryCTA={{ label: "Explore NeurOptimal®", href: "/neurofeedback" }}
        backgroundImage="/wicare-peace.png"
      />

      {/* Section 2 — Our Story — Dark Navy */}
      <section className="relative py-24 sm:py-32 bg-brand-navy overflow-hidden">
        {/* Subtle topography texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,58,108,0.4)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Text */}
            <div className="space-y-8">
              <SectionLabel dark>Our Story</SectionLabel>

              <div className="space-y-5">
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream leading-[1.15]">
                  Where Science Meets{" "}
                  <span className="text-brand-gold">Compassion</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                  WiCare NeurOptimal Center was born from a bold vision: to bring world-class, science-informed brain training technology to East Africa. In a region where mental health services are scarce and stigma runs deep, we saw an opportunity to offer something different — a non-invasive, drug-free approach to wellness that empowers individuals to optimize their own minds.
                </p>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                  As Rwanda&apos;s first NeurOptimal® center, we are more than a wellness space. We are a movement — dedicated to shifting the conversation around mental health from treatment to prevention, from limitation to limitless potential.
                </p>
              </div>
            </div>

            {/* Right — Timeline */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
            >
              <TimelineItem
                year="The Beginning"
                title="A Vision Takes Root"
                description="Driven by a passion for mental wellness and global health equity, our founder pursued clinical psychology training and specialized in workplace wellbeing across multiple countries."
              />
              <TimelineItem
                year="Training"
                title="Certified in Canada"
                description="Completing advanced NeurOptimal® neurofeedback certification in Canada, gaining the expertise to bring this transformative technology to Rwanda."
              />
              <TimelineItem
                year="Founding"
                title="WiCare NeurOptimal Center Opens"
                description="Rwanda's first dedicated NeurOptimal® center opens its doors in Kigali — a pioneer in non-invasive brain training and preventive mental health care in the region."
              />
              <TimelineItem
                year="Today"
                title="Growing Impact"
                description="Serving individuals, families, and organizations with neurofeedback sessions, workplace wellness programs, and community awareness initiatives across Rwanda."
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — About the Founder — White */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-brand-cream/50 rounded-[2rem] transform rotate-2 transition-transform duration-500 hover:rotate-0" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] ring-1 ring-brand-navy/5 bg-brand-cream">
                {/* Placeholder — sophisticated gradient with icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-mist via-brand-cream to-brand-gold/10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-brand-navy/10 flex items-center justify-center mx-auto">
                      <Users className="w-10 h-10 text-brand-navy/40" />
                    </div>
                    <p className="text-brand-navy/40 text-sm font-medium">
                      Founder Photo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <SectionLabel>Meet the Founder</SectionLabel>

              <div className="space-y-5">
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight">
                  A Commitment to{" "}
                  <span className="text-brand-gold">Mental Wellness</span>
                </h2>
                <p className="text-lg text-brand-navy/70 leading-relaxed">
                  Our founder brings a unique intersection of clinical psychology, global health, and workplace wellbeing expertise — a combination that fuels WiCare&apos;s mission to make brain wellness accessible across Rwanda and beyond.
                </p>
              </div>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <Brain className="w-4 h-4 text-brand-gold" />,
                    title: "Clinical Psychology",
                    desc: "Advanced training in clinical psychology and therapeutic approaches",
                  },
                  {
                    icon: <Globe className="w-4 h-4 text-brand-gold" />,
                    title: "Global Health",
                    desc: "Background in global health with experience at the University of Global Health Equity",
                  },
                  {
                    icon: <Award className="w-4 h-4 text-brand-gold" />,
                    title: "NeurOptimal® Certified",
                    desc: "Certified NeurOptimal® neurofeedback practitioner trained in Canada",
                  },
                  {
                    icon: <Building2 className="w-4 h-4 text-brand-gold" />,
                    title: "Workplace Wellbeing",
                    desc: "Extensive experience in corporate wellness including work with BNR",
                  },
                ].map((cred, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 rounded-lg bg-brand-cream/50 border border-brand-cream hover:border-brand-gold/30 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-md bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {cred.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy text-sm">
                        {cred.title}
                      </h4>
                      <p className="text-brand-navy/50 text-xs leading-relaxed mt-0.5">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-brand-gold/40 pl-6 py-2">
                <p className="text-brand-navy/60 italic text-base leading-relaxed">
                  &ldquo;I believe that everyone deserves access to tools that help their brain function at its best. NeurOptimal® is that tool — safe, effortless, and transformative.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Mission & Values — Cream */}
      <section className="relative py-24 sm:py-32 bg-brand-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.25] mix-blend-multiply"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.1)_0%,_transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
              What <span className="text-brand-gold">Drives Us</span>
            </h2>
            <p className="text-lg text-brand-navy/60 leading-relaxed mt-5">
              Every aspect of WiCare is built on four core pillars that guide our approach to brain wellness and mental health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6 text-brand-gold" />,
                title: "Safe & Accessible",
                description:
                  "Non-invasive, drug-free, and suitable for everyone from toddlers to seniors. No diagnosis or conscious effort needed.",
              },
              {
                icon: <Lightbulb className="w-6 h-6 text-brand-gold" />,
                title: "Science-Informed",
                description:
                  "Built on decades of neuroscience research and millions of client hours worldwide. Evidence-based, results-driven approach.",
              },
              {
                icon: <Heart className="w-6 h-6 text-brand-gold" />,
                title: "Holistic Wellness",
                description:
                  "Addressing the whole person — mind, emotions, and performance. Preventive care that goes beyond treating symptoms.",
              },
              {
                icon: <Users className="w-6 h-6 text-brand-gold" />,
                title: "Community Impact",
                description:
                  "Dedicated to shifting mental health narratives in Rwanda through awareness, education, and accessible brain wellness services.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-brand-navy/55 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Impact Stats — Dark Navy */}
      <section className="relative py-24 sm:py-32 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel dark>Our Impact</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream leading-tight mt-4">
              Making a <span className="text-brand-gold">Difference</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed mt-5">
              From individual transformation to community-wide impact, we are
              building a culture of brain wellness in Rwanda.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            <StatCounter value={500} label="Sessions Conducted" />
            <StatCounter value={150} label="Clients Served" />
            <StatCounter value={20} label="Workshops Held" />
            <StatCounter value={10} label="Corporate Partners" />
          </div>

          {/* Impact Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen className="w-5 h-5 text-brand-gold" />,
                title: "Awareness Campaigns",
                description:
                  "Leading mental health awareness initiatives and educational workshops across communities, schools, and workplaces in Rwanda.",
              },
              {
                icon: <Building2 className="w-5 h-5 text-brand-gold" />,
                title: "Corporate Wellness",
                description:
                  "Partnering with organizations to integrate neurofeedback and mental wellness programs into workplace culture for healthier, more productive teams.",
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-brand-gold" />,
                title: "Mental Health Advocacy",
                description:
                  "Championing the shift from reactive treatment to preventive brain care, reducing stigma, and building a movement for mental wellness in East Africa.",
              },
            ].map((area, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-md bg-brand-gold/10 flex items-center justify-center mb-4">
                  {area.icon}
                </div>
                <h3 className="font-semibold text-brand-cream text-base mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        heading="Join the Movement"
        description="Ready to experience the transformative power of neurofeedback? Begin your journey with a free introductory session and discover what your brain is truly capable of."
      />
    </>
  );
}
