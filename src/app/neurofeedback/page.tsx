"use client";

import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Brain,
  Headphones,
  Sparkles,
  Zap,
  Heart,
  Moon,
  Target,
  Users,
  GraduationCap,
  Briefcase,
  Activity,
  Trophy,
  ChevronDown,
  Shield,
  RefreshCcw,
  Eye,
  Baby,
} from "lucide-react";

/* ============================================================
   FAQ Accordion
   ============================================================ */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-gold/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-brand-cream/30 transition-colors duration-300"
      >
        <span className="font-semibold text-brand-navy text-base pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 pb-5 text-brand-navy/60 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Step Card for "How a Session Works"
   ============================================================ */
function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group">
      {/* Step number badge */}
      <div className="absolute -top-3 -left-1 w-8 h-8 rounded-full bg-brand-gold text-brand-navy font-bold text-sm flex items-center justify-center shadow-md z-10">
        {step}
      </div>
      <div className="p-6 pt-8 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 h-full">
        <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
          {title}
        </h3>
        <p className="text-brand-navy/55 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Neurofeedback Page
   ============================================================ */
export default function NeurofeedbackPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How many sessions do I need?",
      answer:
        "There is no set number — every brain is unique. Many people notice shifts after just a few sessions, while others prefer ongoing training for continued optimization. We recommend starting with a block of 10 sessions to give your brain the best opportunity to begin its self-organization process. Your trainer will help guide you based on your personal goals.",
    },
    {
      question: "Is NeurOptimal safe for children?",
      answer:
        "Absolutely. NeurOptimal is used with people of all ages, from toddlers to the elderly. Because it is completely non-invasive and non-directive — it doesn't tell the brain what to do — there are no age restrictions. Children often respond remarkably well, and many parents notice improvements in focus, emotional regulation, and sleep.",
    },
    {
      question: "What does a session feel like?",
      answer:
        "Most people describe sessions as deeply relaxing. You simply sit comfortably, listen to music or watch a video, and let the system do its work. You may notice brief micro-pauses in the music — these are the feedback signals that help your brain self-organize. Many clients feel calmer, clearer, and more centered after a session.",
    },
    {
      question: "How is NeurOptimal different from other neurofeedback?",
      answer:
        "Unlike conventional (linear) neurofeedback that requires a diagnosis and tells the brain what to do, NeurOptimal is dynamical and non-directive. It uses advanced mathematical processing to simply mirror the brain's activity back to itself, allowing natural self-organization. There's no diagnosis, no protocol, and no conscious effort required from the client.",
    },
    {
      question: "Are there any side effects?",
      answer:
        "NeurOptimal is remarkably free of side effects because it doesn't push the brain in any direction. It simply provides information that allows the brain to self-organize at its own pace. Occasionally, some people may feel a bit tired after their first session as the brain processes the training, but this is rare and temporary.",
    },
    {
      question: "Do I need a diagnosis to use NeurOptimal?",
      answer:
        "No. NeurOptimal is a training tool, not a medical treatment. No diagnosis is needed. Whether you're dealing with stress, seeking peak performance, or simply want to optimize your brain function, NeurOptimal works by helping your brain become more flexible and resilient — regardless of the starting point.",
    },
    {
      question: "Can I use NeurOptimal alongside other treatments?",
      answer:
        "Yes. Because NeurOptimal is non-invasive and doesn't interfere with other therapies or medications, it can be used as a complement to any existing treatment plan. Many healthcare professionals recommend it as an adjunct to therapy, coaching, or wellness programs.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Discover"
        titleAccent="NeurOptimal"
        subtitle="Advanced dynamical neurofeedback — a natural mirror for your brain. Non-invasive, drug-free, and effortless brain training technology trusted by millions of client hours worldwide."
        primaryCTA={{ label: "Book Intro Session", href: "/book-session" }}
        secondaryCTA={{
          label: "Contact on WhatsApp",
          href: "https://wa.me/250788000000",
          external: true,
        }}
        backgroundImage="/neurofeedback-hero.png"
      />

      {/* Section 2 — What is NeurOptimal? — Dark Navy */}
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
            <div className="space-y-8">
              <SectionLabel dark>The Technology</SectionLabel>

              <div className="space-y-5">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-brand-cream leading-[1.15]">
                  A Mirror for{" "}
                  <span className="text-brand-gold">Your Brain</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                  NeurOptimal is an advanced, dynamical neurofeedback system developed by Zengar Institute. Think of it as a &ldquo;defrag&rdquo; for your brain — it acts as a mirror, providing real-time mathematical feedback that helps your brain release points of &ldquo;stuckness,&rdquo; self-organize, and function at its natural best.
                </p>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                  Unlike conventional approaches that diagnose and try to &ldquo;fix&rdquo; specific conditions, NeurOptimal is <strong className="text-white/80">non-directive</strong> — it doesn&apos;t tell your brain what to do. Instead, it simply gives your brain information about itself, and your brain does the rest. The result? Natural, effortless optimization.
                </p>
              </div>

              {/* Key differentiators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30 transition-all duration-300">
                  <div className="w-9 h-9 rounded-md bg-brand-gold/10 flex items-center justify-center mb-3">
                    <Shield className="w-4 h-4 text-brand-gold" />
                  </div>
                  <h3 className="font-semibold text-brand-cream text-base mb-1.5">
                    100% Non-Invasive
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    No electricity enters the brain. No drugs. No side effects. Simply sensors that read your brain&apos;s electrical activity, like a stethoscope listens to your heart.
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30 transition-all duration-300">
                  <div className="w-9 h-9 rounded-md bg-brand-gold/10 flex items-center justify-center mb-3">
                    <RefreshCcw className="w-4 h-4 text-brand-gold" />
                  </div>
                  <h3 className="font-semibold text-brand-cream text-base mb-1.5">
                    Non-Directive
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    No diagnosis. No protocol. No telling the brain what to do. The system simply holds up a mirror, and your brain self-organizes naturally.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Visual */}
            <div className="space-y-6">
              {/* Large visual card */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-navy-mid/40 to-brand-navy-mid/20 border border-white/[0.08] p-8 sm:p-10">
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-brand-gold/5 blur-[40px]" />

                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-brand-gold" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-brand-cream">
                    How It Works
                  </h3>

                  <div className="space-y-4">
                    {[
                      "Sensors read your brain's electrical activity (EEG)",
                      "Advanced math processes the signal 256 times per second",
                      "Micro-pauses in music give your brain instant feedback",
                      "Your brain recognizes its own patterns and self-corrects",
                      "Natural self-organization occurs — effortlessly",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-brand-gold text-xs font-bold">
                            {i + 1}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  <div className="font-display text-2xl font-bold text-brand-gold">
                    33ms
                  </div>
                  <p className="text-white/40 text-xs mt-1">Feedback Speed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  <div className="font-display text-2xl font-bold text-brand-gold">
                    0
                  </div>
                  <p className="text-white/40 text-xs mt-1">Side Effects</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  <div className="font-display text-2xl font-bold text-brand-gold">
                    M+
                  </div>
                  <p className="text-white/40 text-xs mt-1">Client Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — How a Session Works — White */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Your Experience</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
              How a Session{" "}
              <span className="text-brand-gold">Works</span>
            </h2>
            <p className="text-lg text-brand-navy/60 leading-relaxed mt-5">
              A NeurOptimal session is one of the most effortless experiences
              you&apos;ll ever have. Here&apos;s what to expect during your visit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              step={1}
              icon={<Users className="w-6 h-6 text-brand-gold" />}
              title="Arrive & Settle In"
              description="You'll be welcomed into our tranquil Kigali center. We'll briefly discuss how you're feeling and answer any questions about the process."
            />
            <StepCard
              step={2}
              icon={<Activity className="w-6 h-6 text-brand-gold" />}
              title="Simple Setup"
              description="Two tiny sensors are placed on your scalp and three on your ears — painless and non-invasive. They simply read your brain's natural electrical activity."
            />
            <StepCard
              step={3}
              icon={<Headphones className="w-6 h-6 text-brand-gold" />}
              title="Relax & Listen"
              description="Sit back comfortably, close your eyes, and listen to music for about 33 minutes. The system provides real-time feedback through brief micro-pauses in the audio."
            />
            <StepCard
              step={4}
              icon={<Sparkles className="w-6 h-6 text-brand-gold" />}
              title="Feel the Shift"
              description="After the session, most people feel calmer, clearer, and more centered. There's nothing you need to do — your brain handles the optimization naturally."
            />
          </div>
        </div>
      </section>

      {/* Section 4 — Who Can Benefit — Cream */}
      <section className="relative py-24 sm:py-32 bg-brand-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.25] mix-blend-multiply"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.1)_0%,_transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>For Everyone</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
              Anyone With a Brain{" "}
              <span className="text-brand-gold">Can Benefit</span>
            </h2>
            <p className="text-lg text-brand-navy/60 leading-relaxed mt-5">
              From toddlers to our oldest citizens, by the sick and the well, and
              by those looking to excel — there are no circumstances that preclude
              its use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-5 h-5 text-brand-gold" />,
                title: "Stress & Anxiety",
                description:
                  "Release accumulated tension and find your natural calm. Many clients report feeling significantly more relaxed after just a few sessions.",
              },
              {
                icon: <Target className="w-5 h-5 text-brand-gold" />,
                title: "Focus & Concentration",
                description:
                  "Sharpen mental clarity and sustain attention more naturally. Ideal for professionals, students, and anyone seeking better cognitive performance.",
              },
              {
                icon: <Moon className="w-5 h-5 text-brand-gold" />,
                title: "Sleep Quality",
                description:
                  "Train your brain to transition into restful sleep more easily. Clients often notice improved sleep patterns as one of the first benefits.",
              },
              {
                icon: <Sparkles className="w-5 h-5 text-brand-gold" />,
                title: "Emotional Regulation",
                description:
                  "Develop greater resilience and emotional flexibility. Respond to life's challenges with more balance and less reactivity.",
              },
              {
                icon: <Trophy className="w-5 h-5 text-brand-gold" />,
                title: "Peak Performance",
                description:
                  "Optimize brain function for athletic, creative, or professional excellence. Used by athletes, artists, and high-performers worldwide.",
              },
              {
                icon: <Zap className="w-5 h-5 text-brand-gold" />,
                title: "Burnout Recovery",
                description:
                  "Restore depleted mental resources and rebuild cognitive resilience. Essential for healthcare workers, executives, and anyone feeling overwhelmed.",
              },
              {
                icon: <GraduationCap className="w-5 h-5 text-brand-gold" />,
                title: "Students & Learning",
                description:
                  "Enhance learning capacity, information retention, and test performance. Safe and effective for students of all ages.",
              },
              {
                icon: <Briefcase className="w-5 h-5 text-brand-gold" />,
                title: "Workplace Wellness",
                description:
                  "Improve team performance, reduce absenteeism, and create a culture of mental wellbeing in your organization.",
              },
              {
                icon: <Baby className="w-5 h-5 text-brand-gold" />,
                title: "Children & Families",
                description:
                  "Safe for all ages with no side effects. Help children with attention, emotional regulation, and navigating the changes of adolescence.",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-brand-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-brand-navy/55 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — The Science — Dark Navy */}
      <section className="relative py-24 sm:py-32 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — Text */}
            <div className="space-y-8">
              <SectionLabel dark>The Science</SectionLabel>

              <div className="space-y-5">
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream leading-[1.15]">
                  Non-Linear.{" "}
                  <span className="text-brand-gold">Non-Directive.</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                  NeurOptimal represents a paradigm shift in neurofeedback. While conventional systems use static or dynamic thresholds that tell the brain what to do, NeurOptimal uses <strong className="text-white/80">dynamical thresholds</strong> that adjust themselves microsecond by microsecond, creating an intimate dance with the brain.
                </p>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                  This dynamical process allows the brain to release its &ldquo;points of stuckness&rdquo; — the same-old patterns of feelings and behavior that are so difficult to change through conscious effort. The brain doesn&apos;t need to be told what to do; it simply needs accurate information about itself.
                </p>
              </div>
            </div>

            {/* Right — Science pillars */}
            <div className="space-y-5">
              {[
                {
                  icon: <Eye className="w-5 h-5 text-brand-gold" />,
                  title: "Dynamical Thresholds",
                  description:
                    "Unlike static goal-setting or periodic dynamic adjustments, NeurOptimal's thresholds interact with the brain in real-time — adjusting microsecond by microsecond to create an astounding self-organizing effect.",
                },
                {
                  icon: <RefreshCcw className="w-5 h-5 text-brand-gold" />,
                  title: "AutoNavigation",
                  description:
                    "The system automatically adjusts training difficulty in real-time, far more efficiently than any human operator could. This ensures each session is precisely calibrated to your brain's current state.",
                },
                {
                  icon: <Activity className="w-5 h-5 text-brand-gold" />,
                  title: "ZenModes",
                  description:
                    "Proprietary mathematical rubrics that control how the two sides of the brain interact during training — from independent exploration to synchronized precision — progressively deepening the training effect.",
                },
                {
                  icon: <Shield className="w-5 h-5 text-brand-gold" />,
                  title: "In-Line De-Noising",
                  description:
                    "Advanced signal processing routines ensure only genuine brain activity is processed, filtering out artifacts and interference for the purest possible feedback signal.",
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-cream text-base mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-white/45 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ — White */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
              Frequently Asked{" "}
              <span className="text-brand-gold">Questions</span>
            </h2>
            <p className="text-lg text-brand-navy/60 leading-relaxed mt-5">
              Everything you need to know about NeurOptimal neurofeedback
              training at WiCare.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        heading="Experience It Yourself"
        description="The best way to understand NeurOptimal is to experience it. Book your free introductory session and discover what effortless brain optimization feels like."
      />
    </>
  );
}
