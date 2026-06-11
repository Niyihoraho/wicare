"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/layout/CTASection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getContentData, BlogPost } from "@/actions/content";

export default function BlogListingPage() {
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    getContentData().then(data => setBlogsList(data.blogs));
  }, []);

  const totalPages = Math.ceil(blogsList.length / itemsPerPage);
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogsList.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Our"
        titleAccent="Insights"
        subtitle="Explore our articles on brain health, wellness, and the science behind dynamical neurofeedback. Discover stories and tips to transform your life."
        primaryCTA={{ label: "Book a Session", href: "/book-session" }}
        backgroundImage="/wicare-study.png"
      />

      {/* Blog Grid Section */}
      <section className="relative py-24 sm:py-32 bg-brand-cream overflow-hidden">
        {/* Subtle topography overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Knowledge Base</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy mt-4">
              All <span className="text-brand-gold">Articles</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 relative group flex flex-col h-full overflow-hidden"
              >
                {/* Blog Image */}
                <Link href={`/blog/${blog.slug}`} className="relative w-full aspect-[4/3] block">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-brand-navy text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm">
                    {blog.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-brand-navy/50 mb-4 font-medium uppercase tracking-wide">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="font-display font-bold text-brand-navy text-xl sm:text-2xl mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-brand-navy/60 text-base leading-relaxed mb-8 flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  {/* Action */}
                  <div className="mt-auto pt-5 border-t border-gray-100">
                    <Link href={`/blog/${blog.slug}`} className="text-brand-gold text-sm font-semibold hover:text-brand-gold-light transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300">
                      Read Full Article
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-200 text-brand-navy shadow-sm hover:shadow-md hover:bg-gray-50 hover:border-brand-gold/30"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="text-brand-navy/60 font-medium text-sm">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-200 text-brand-navy shadow-sm hover:shadow-md hover:bg-gray-50 hover:border-brand-gold/30"
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        heading="Experience the Benefits"
        description="Ready to transform your cognitive potential? Book an introductory session and feel the difference of dynamical neurofeedback."
      />
    </>
  );
}
