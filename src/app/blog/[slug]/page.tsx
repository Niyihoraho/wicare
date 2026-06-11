import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CTASection } from "@/components/layout/CTASection";
import { getContentData } from "@/actions/content";

export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
  const data = await getContentData();
  const blog = data.blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <article className="relative bg-white pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-navy/60 hover:text-brand-gold font-medium mb-10 sm:mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          {/* Header */}
          <header className="mb-12 sm:mb-16 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm font-medium text-brand-navy/50 mb-6 uppercase tracking-wider">
              <span className="bg-brand-cream px-3 py-1 rounded-md text-brand-navy font-semibold">
                {blog.category}
              </span>
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy leading-[1.15] mb-6">
              {blog.title}
            </h1>
            <p className="text-xl text-brand-navy/60 leading-relaxed max-w-3xl">
              {blog.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-12 sm:mb-16 shadow-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-brand-navy/5" />
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-brand-navy prose-p:text-brand-navy/80 prose-a:text-brand-gold hover:prose-a:text-brand-gold-light prose-strong:text-brand-navy prose-strong:font-bold prose-img:rounded-xl">
              {blog.content.map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-brand-navy/80">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Author Info */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center font-display font-bold text-xl shrink-0">
                {blog.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-display font-bold text-brand-navy text-lg">{blog.author}</h4>
                <p className="text-brand-navy/60 text-sm">Author & Wellness Contributor</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <CTASection
        heading="Start Your Own Journey"
        description="Inspired by what you read? Take the first step towards better mental wellness with WiCare."
      />
    </>
  );
}
