"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Brain,
  Activity,
  Briefcase,
  BatteryCharging,
  Target,
  GraduationCap,
  Users,
  Building2,
  Heart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

/* ——— Animation helpers ——— */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const cardVariants: any = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ——— Data ——— */
const coreServices = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "NeurOptimal Neurofeedback",
    description:
      "Our core offering. A non-invasive, dynamical brain training system that helps your brain self-organize, improving mental flexibility, resilience, and overall cognitive function.",
    tag: "Core",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Mental Wellness Consultation",
    description:
      "Comprehensive initial assessments and ongoing consultations to understand your unique needs and track your progress throughout your brain training journey.",
    tag: "Assessment",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Workplace Wellbeing",
    description:
      "Corporate programs designed to reduce absenteeism, boost productivity, and support the mental health of your workforce through group neurofeedback and education.",
    tag: "Corporate",
  },
  {
    icon: <BatteryCharging className="w-6 h-6" />,
    title: "Stress & Burnout Support",
    description:
      "Specialized training protocols to help high-stress professionals, healthcare workers, and executives recover from burnout and restore nervous system balance.",
    tag: "Recovery",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Performance Optimization",
    description:
      "For athletes, artists, and students looking to gain a competitive edge. Enhance focus, improve sleep quality, and achieve peak cognitive performance.",
    tag: "Performance",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Wellness Education",
    description:
      "Seminars, workshops, and training sessions designed to educate the community on brain health, neuroplasticity, and proactive mental wellness strategies.",
    tag: "Education",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Consult & Assess",
    description:
      "Begin with a complimentary introductory session. We listen to your goals, explain the process, and answer every question so you feel completely comfortable.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    step: "02",
    title: "Train & Relax",
    description:
      "Sit back, listen to music, and let the NeurOptimal system do the work. Sensors read your brainwaves while dynamical feedback gently guides your brain toward optimal function.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    step: "03",
    title: "Transform & Thrive",
    description:
      "Over a series of sessions, you'll notice improved sleep, sharper focus, reduced stress, and a greater sense of calm. Results that last long after training ends.",
    icon: <Zap className="w-5 h-5" />,
  },
];

const additionalServices = [
  {
    icon: <Users className="w-5 h-5 text-brand-gold" />,
    title: "Navigating Adolescence",
    description:
      "Support programs tailored to help youth navigate the emotional and cognitive changes of adolescence.",
  },
  {
    icon: <Building2 className="w-5 h-5 text-brand-gold" />,
    title: "Research & Public Health",
    description:
      "Collaborative public health projects and research initiatives aimed at advancing mental wellness across Rwanda.",
  },
  {
    icon: <Heart className="w-5 h-5 text-brand-gold" />,
    title: "Residential Mental Wellness",
    description:
      "Comprehensive support and capacity building for individuals in need of deeper residential mental wellness care.",
  },
];

const stats = [
  { value: "3M+", label: "Client Hours Worldwide" },
  { value: "30+", label: "Years of Research" },
  { value: "100%", label: "Non-Invasive & Safe" },
  { value: "All Ages", label: "From Toddlers to Seniors" },
];

/* ——— Page ——— */
export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        title="Our"
        titleAccent="Services"
        subtitle="Comprehensive brain optimization and mental wellness solutions tailored for individuals, families, and organizations in Rwanda."
        primaryCTA={{ label: "Book Session", href: "/book-session" }}
        secondaryCTA={{ label: "Discover NeurOptimal", href: "/neurofeedback" }}
        backgroundImage="/services-hero.png"
      />

      {/* ── Stats Banner ── */}
      <section className="relative bg-brand-navy border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-brand-gold">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm mt-1.5 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Section 1 — Core Services ── */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        {/* Decorative background orb */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-gold/[0.03] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel>What We Offer</SectionLabel>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
                Core <span className="text-brand-gold">Offerings</span>
              </h2>
              <p className="text-lg text-brand-navy/60 leading-relaxed mt-5">
                At WiCare NeurOptimal Center, we provide a holistic approach to
                mental wellness, centered around our advanced dynamical
                neurofeedback technology.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-gold/30 transition-all duration-500"
              >
                {/* Number watermark */}
                <span className="absolute top-5 right-6 font-display text-6xl font-bold text-brand-navy/[0.04] leading-none select-none group-hover:text-brand-gold/[0.08] transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Tag */}
                <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full mb-5">
                  {service.tag}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-navy to-brand-navy-mid flex items-center justify-center mb-5 text-brand-gold group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="font-bold text-brand-navy text-lg mb-2.5 group-hover:text-brand-navy transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-navy/55 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Learn more link */}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Section 2 — How It Works ── */}
      <section className="relative py-24 sm:py-32 bg-brand-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.2] mix-blend-multiply"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel>Your Journey</SectionLabel>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
                How It <span className="text-brand-gold">Works</span>
              </h2>
              <p className="text-lg text-brand-navy/60 leading-relaxed mt-5">
                Getting started is simple. Our streamlined process ensures you
                feel informed, comfortable, and empowered at every step.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div key={i} variants={cardVariants} className="relative">
                {/* Connecting line (desktop only) */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-brand-gold/40 to-brand-gold/10 z-0" />
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="w-28 h-28 rounded-full bg-white shadow-lg border border-brand-gold/20 flex flex-col items-center justify-center mb-6 group hover:shadow-xl hover:border-brand-gold/50 transition-all duration-500">
                    <div className="text-brand-gold mb-1">{step.icon}</div>
                    <span className="font-display text-2xl font-bold text-brand-navy">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-brand-navy text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-brand-navy/55 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Section 3 — Our Approach (Dark Navy) ── */}
      <section className="relative py-24 sm:py-32 bg-brand-navy overflow-hidden">
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
            <FadeUp>
              <div className="space-y-8">
                <SectionLabel dark>Our Approach</SectionLabel>

                <div className="space-y-5">
                  <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream leading-[1.15]">
                    More Than Just{" "}
                    <span className="text-brand-gold">A Clinic</span>
                  </h2>
                  <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                    We believe that true wellness is proactive, not just
                    reactive. Rather than simply managing symptoms, our services
                    are designed to address the root of mental distress by
                    optimizing how your brain processes information.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    "No side effects or medications",
                    "Completely non-invasive and painless",
                    "Suitable for all ages and conditions",
                    "Results that last long after training stops",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                      <span className="text-white/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/neurofeedback"
                  className="inline-flex items-center gap-2 text-brand-gold font-semibold hover:gap-3 transition-all duration-300 mt-2"
                >
                  Learn about NeurOptimal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>

            {/* Right — Glassmorphism card */}
            <FadeUp delay={0.2}>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.1] p-8 sm:p-10 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-navy-mid/20 blur-[60px] rounded-full" />

                <div className="relative z-10 space-y-8">
                  <h3 className="font-display text-2xl font-bold text-brand-cream border-b border-white/10 pb-4">
                    The WiCare Difference
                  </h3>
                  <div className="space-y-7">
                    {[
                      {
                        title: "State-of-the-Art Technology",
                        desc: "We use the latest NeurOptimal version 3.0 systems, the most advanced dynamical neurofeedback available globally.",
                      },
                      {
                        title: "Expert Guidance",
                        desc: "Our certified trainers have deep expertise in brain optimization and compassionate, personalized client care.",
                      },
                      {
                        title: "Sanctuary Environment",
                        desc: "Our Kigali center is designed to be a peaceful retreat from the noise of the city, fostering deep relaxation and safety.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative pl-5 border-l-2 border-brand-gold/30 hover:border-brand-gold transition-colors duration-300">
                        <div className="text-brand-gold font-bold text-lg mb-1.5">
                          {item.title}
                        </div>
                        <p className="text-white/55 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Section 4 — Specialized Programs ── */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — Image */}
            <FadeUp className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-3 bg-brand-cream rounded-[2rem] transform rotate-2 transition-transform duration-500 hover:rotate-0" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] ring-1 ring-brand-navy/5">
                  <Image
                    src="/wicare-peace.png"
                    alt="Peaceful wellness environment at WiCare"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent" />
                </div>
              </div>
            </FadeUp>

            {/* Right — Content */}
            <div className="lg:col-span-7 space-y-8">
              <FadeUp>
                <SectionLabel>Beyond the Core</SectionLabel>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
                  Specialized{" "}
                  <span className="text-brand-gold">Programs</span>
                </h2>
                <p className="text-lg text-brand-navy/60 leading-relaxed mt-5 max-w-xl">
                  We extend our expertise beyond individual sessions to serve
                  families, institutions, and communities with targeted programs.
                </p>
              </FadeUp>

              <StaggerContainer className="space-y-5">
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="flex gap-5 p-6 rounded-xl bg-brand-cream/50 border border-brand-navy/5 hover:border-brand-gold/30 hover:bg-white hover:shadow-md transition-all duration-500 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy text-lg mb-1.5">
                        {service.title}
                      </h3>
                      <p className="text-brand-navy/55 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <CTASection
        heading="Ready to Optimize Your Brain?"
        description="Whether you're seeking relief from stress or aiming for peak performance, we're here to help you achieve your goals. Take the first step today."
      />
    </>
  );
}
