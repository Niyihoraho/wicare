"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, PlayCircle, X } from "lucide-react";
import { CTASection } from "@/components/layout/CTASection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getContentData, Video, BlogPost } from "@/actions/content";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    getContentData().then(data => {
      setVideos(data.videos);
      setBlogsList(data.blogs);
    });
  }, []);

  return (
    <>
      {/* Hero Section — BlackPenEdu-inspired layout with topography bg */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background: light gray/cream base + topography pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-mist via-brand-cream to-brand-cream" />

        {/* Topography pattern overlay — radiating from center like BlackPenEdu */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Subtle radial gradient overlay — light center, faded edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(234,240,247,0.6)_70%,_rgba(249,245,238,0.9)_100%)]" />

        {/* Decorative gold/navy blurred orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-navy-mid/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: "3s" }} />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
          {/* Main Headline — BlackPenEdu style: bold first line, accent color second line */}
          <h1
            className={`mt-8 sm:mt-10 transition-all duration-700 delay-150 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-navy leading-[1.05] tracking-tight">
              Train Your Brain.
            </span>
            <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-gold leading-[1.05] tracking-tight mt-1 sm:mt-2">
              Transform Your Life.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-brand-navy/60 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            Advanced brain training for everyone. Experience natural self-regulation,
            greater resilience, and peak cognitive performance with a system that matches
            your brain&apos;s unique potential.
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[450ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <Link
              href="/book-session"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-brand-gold text-brand-navy font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-brand-gold-light"
            >
              Book Intro Session
            </Link>

            <Link
              href="/neurofeedback"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white border border-gray-200 text-brand-navy font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-50 hover:border-gray-300"
            >
              Discover NeurOptimal
            </Link>
          </div>
        </div>

        {/* Bottom fade — smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />
      </section>

      {/* Intro Section — "Why NeurOptimal?" — Premium Dark Navy */}
      <section className="relative py-24 sm:py-32 bg-brand-navy overflow-hidden">
        {/* Subtle topography texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Subtle radial glow from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,58,108,0.4)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left side: Text & Pillars */}
            <div className="lg:col-span-6 space-y-8">
              {/* Section label */}
              <span className="inline-block text-brand-gold/80 text-xs font-semibold tracking-[0.2em] uppercase">
                The Science of Self-Organization
              </span>

              <div className="space-y-5">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-brand-cream leading-[1.15]">
                  A Natural Mirror for{" "}
                  <span className="text-brand-gold">Optimal Flow</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
                  Using NeurOptimal is like having a &ldquo;defrag&rdquo; of your hard drive. It acts as a mirror for the brain, providing real-time mathematical feedback that helps it release points of stuckness, self-organize, and function at its natural best.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30 transition-all duration-300">
                  <div className="w-9 h-9 rounded-md bg-brand-gold/10 flex items-center justify-center mb-3">
                    <svg className="w-4.5 h-4.5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-brand-cream text-base mb-1.5">Anyone With a Brain</h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    Used from toddlers to our oldest citizens, by the sick and the well, and by those looking to excel. There are no circumstances that preclude its use.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30 transition-all duration-300">
                  <div className="w-9 h-9 rounded-md bg-brand-gold/10 flex items-center justify-center mb-3">
                    <svg className="w-4.5 h-4.5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-brand-cream text-base mb-1.5">Effortless & Safe</h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    No conscious effort, no diagnosis, and no telling the brain what to do. Simply relax, listen to music, and let the dynamical feedback do the work.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Pinterest Image Collage */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Left Column — stacked */}
                <div className="col-span-6 space-y-4">
                  <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 group aspect-[4/3]">
                    <Image
                      src="/wicare-focus.png"
                      alt="Focused professional at work"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
                  </div>
                  <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 group aspect-square">
                    <Image
                      src="/wicare-study.png"
                      alt="Dedicated student studying"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
                  </div>
                </div>

                {/* Right Column — tall offset */}
                <div className="col-span-6 pt-8">
                  <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 group aspect-[3/4]">
                    <Image
                      src="/wicare-peace.png"
                      alt="Wellness and mindfulness in Kigali"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Step 2: Kigali Center Highlights Section */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <span className="inline-block text-brand-gold font-semibold tracking-[0.2em] uppercase text-xs">
                Our Sanctuary
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight">
                Rwanda&apos;s First <br />
                NeurOptimal Center
              </h2>
              <p className="text-lg text-brand-navy/70 leading-relaxed">
                Located in the heart of Kigali, WiCare NeurOptimal Center is a pioneer wellness and mental health sanctuary. We are dedicated to providing a premium, tranquil environment where clients can easily access dynamic neurofeedback training and preventive self-care.
              </p>

              <ul className="space-y-4">
                {[
                  "Dynamic Neurofeedback (NeurOptimal)",
                  "Mental Wellness & Stress Management",
                  "Cognitive Performance & Emotional Wellbeing",
                  "Workplace Wellbeing Programs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span className="text-brand-navy/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-white border border-gray-200 text-brand-navy font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-50 hover:border-gray-300"
                >
                  More About Our Center
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-cream/50 rounded-[2rem] transform -rotate-3 transition-transform duration-500 hover:rotate-0" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] ring-1 ring-brand-navy/5">
                <Image
                  src="/wicare-center.png"
                  alt="WiCare NeurOptimal Center Kigali"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section — Using Testimonials Design Pattern */}
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
            <SectionLabel dark>Discover More</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream leading-tight mt-4">
              Our Video <span className="text-brand-gold">Library</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mt-5">
              Watch these insightful videos to learn more about our process, success stories, and how neurofeedback can benefit you.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {videos.map((video, index) => (
              <div
                key={index}
                className="w-[85vw] sm:w-[380px] shrink-0 snap-center bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl hover:bg-white/[0.05] hover:border-brand-gold/30 transition-all duration-300 relative group flex flex-col"
              >
                {/* Video Thumbnail */}
                <div
                  className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 85vw, 380px"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-navy/40 group-hover:bg-brand-navy/20 transition-colors duration-300 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="px-2 pb-2 flex-grow flex flex-col">
                  <h3 className="font-display font-bold text-brand-cream text-xl mb-3">
                    {video.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow">
                    {video.description}
                  </p>

                  {/* Action */}
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="text-brand-gold text-sm font-semibold hover:text-brand-gold-light transition-colors flex items-center gap-2"
                    >
                      Watch Video
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section — White Background (Testimonials Design Pattern) */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        {/* Subtle topography texture overlay for consistency, but very faint on white */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Our Insights</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4">
              Latest from the <span className="text-brand-gold">Blog</span>
            </h2>
            <p className="text-lg text-brand-navy/60 leading-relaxed mt-5">
              Explore our articles on brain health, wellness, and the science behind neurofeedback.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {blogsList.map((blog) => (
              <div
                key={blog.id}
                className="w-[85vw] sm:w-[380px] shrink-0 snap-center bg-white border border-gray-100 shadow-sm p-4 rounded-2xl hover:shadow-md hover:border-brand-gold/30 transition-all duration-300 relative group flex flex-col"
              >
                {/* Blog Image */}
                <Link href={`/blog/${blog.slug}`} className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 block">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 640px) 85vw, 380px"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-navy text-xs font-semibold px-2 py-1 rounded shadow-sm">
                    {blog.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="px-2 pb-2 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-brand-navy/50 mb-3 font-medium">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="font-display font-bold text-brand-navy text-xl mb-3 group-hover:text-brand-gold transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-brand-navy/60 text-sm leading-relaxed mb-6 flex-grow">
                    {blog.excerpt}
                  </p>

                  {/* Action */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link href={`/blog/${blog.slug}`} className="text-brand-gold text-sm font-semibold hover:text-brand-gold-light transition-colors flex items-center gap-2">
                      Read Article
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Blogs Button */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-white border border-gray-200 text-brand-navy font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-50 hover:border-gray-300 gap-2"
            >
              View More Blogs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        heading="Ready to Optimize Your Brain?"
        description="Join hundreds of others who have transformed their lives with dynamical neurofeedback."
      />

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {activeVideo.videoUrl ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-white/60 flex flex-col items-center">
                  <PlayCircle className="w-16 h-16 mb-4 opacity-50" />
                  <p>Video file not available</p>
                </div>
              )}
            </div>
            <div className="p-6 bg-brand-navy border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">{activeVideo.title}</h3>
              <p className="text-white/70 text-sm">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
