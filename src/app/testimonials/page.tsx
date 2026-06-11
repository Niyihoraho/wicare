"use client";

import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Quote, Star } from "lucide-react";

export default function TestimonialsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Corporate Executive",
      content:
        "After years of chronic stress and struggling to sleep, NeurOptimal at WiCare changed everything. Within 10 sessions, my sleep completely transformed. I wake up feeling rested and handle high-pressure meetings with a calm I haven't felt in a decade.",
      rating: 5,
    },
    {
      name: "David K.",
      role: "University Student",
      content:
        "I was dealing with severe focus issues and exam anxiety. The brain training sessions were like hitting a reset button. My concentration improved drastically, and the anxiety simply faded into the background. I highly recommend it.",
      rating: 5,
    },
    {
      name: "Aline U.",
      role: "Mother of two",
      content:
        "We brought our 8-year-old son in because he was having trouble regulating his emotions at school. The non-invasive nature of the training put me at ease. He loved the sessions, and his teachers have noted a massive improvement in his patience and focus.",
      rating: 5,
    },
    {
      name: "Dr. Emmanuel R.",
      role: "Healthcare Professional",
      content:
        "As someone in the medical field, I was initially skeptical. But the science behind dynamical neurofeedback is solid. I used it for burnout recovery and the results were profound. It is a vital tool for mental hygiene.",
      rating: 5,
    },
    {
      name: "Marie J.",
      role: "Entrepreneur",
      content:
        "Running a startup left me constantly on edge. WiCare became my sanctuary. The center is beautiful, the staff are incredibly warm, and the neurofeedback gave me my clarity back.",
      rating: 5,
    },
    {
      name: "Patrick N.",
      role: "Athlete",
      content:
        "I use NeurOptimal purely for peak performance. The mental edge, the reaction time, and the ability to stay in the 'zone' during competitions has noticeable improved since I started my training blocks.",
      rating: 5,
    },
  ];

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Client"
        titleAccent="Stories"
        subtitle="Real experiences from individuals, families, and professionals who have transformed their mental wellness and cognitive performance with WiCare."
        primaryCTA={{ label: "Start Your Journey", href: "/book-session" }}
        backgroundImage="/testimonials-hero.png"
      />

      {/* Testimonials Grid — Dark Navy */}
      <section className="relative py-24 sm:py-32 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.15)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel dark>Testimonials</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream leading-tight mt-4">
              What Our Clients <span className="text-brand-gold">Say</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mt-5">
              Discover how effortless brain optimization has helped our community find calm, focus, and resilience.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-[85vw] sm:w-[380px] shrink-0 snap-center bg-white/[0.03] border border-white/[0.08] p-8 rounded-2xl hover:bg-white/[0.05] hover:border-brand-gold/30 transition-all duration-300 relative group flex flex-col"
              >
                {/* Decorative Quote Icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors duration-300" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/70 leading-relaxed mb-8 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <div className="font-display font-bold text-brand-cream text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-brand-gold text-sm font-medium">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/40 text-sm italic">
              *Names have been abbreviated to protect client privacy. Individual results may vary.
            </p>
          </div>
        </div>
      </section>

      {/* Leave a Testimony Form Section */}
      <section className="relative py-24 sm:py-32 bg-brand-cream overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Share Your Story</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy mt-4">
              Leave a <span className="text-brand-gold">Testimony</span>
            </h2>
            <p className="text-lg text-brand-navy/70 mt-4">
              Has NeurOptimal helped you? We'd love to hear about your experience. Your story could inspire others to begin their own journey to wellness.
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center transition-all duration-500 animate-fade-in">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-brand-gold fill-brand-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">Thank You!</h3>
              <p className="text-brand-navy/70">
                Your testimony has been submitted successfully. We appreciate you sharing your story with our community.
              </p>
              <button 
                onClick={() => { setIsSubmitted(false); setRating(5); }}
                className="mt-6 text-brand-gold font-semibold hover:text-brand-gold-light transition-colors"
              >
                Submit another story
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 space-y-6 animate-fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-brand-navy">Your Name</label>
                  <input required type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-gray-50/50" placeholder="e.g. Sarah M." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-semibold text-brand-navy">Your Role / Title</label>
                  <input required type="text" id="role" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-gray-50/50" placeholder="e.g. Entrepreneur, Parent" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-navy">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${rating >= star ? "fill-brand-gold text-brand-gold" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="story" className="text-sm font-semibold text-brand-navy">Your Story</label>
                <textarea required id="story" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-gray-50/50 resize-none" placeholder="How has WiCare helped you?"></textarea>
              </div>

              <button type="submit" className="w-full py-4 rounded-lg bg-brand-navy text-white font-semibold hover:bg-brand-navy-light transition-all shadow-sm">
                Submit Testimony
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        heading="Ready to Write Your Own Story?"
        description="Experience the benefits of dynamical neurofeedback for yourself. Schedule a free introductory session today."
      />
    </>
  );
}
