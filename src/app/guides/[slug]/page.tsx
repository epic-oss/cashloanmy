import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getContentBySlug, getAllSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import BackToTop from "@/components/BackToTop";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("guides");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug("guides", slug);

  if (!content) {
    return {
      title: "Guide Not Found | CashLoanMY",
    };
  }

  return {
    title: `${content.title} | CashLoanMY`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      publishedTime: content.publishedAt,
      modifiedTime: content.updatedAt,
      authors: [content.author || "CashLoanMY Team"],
      siteName: "CashLoanMY",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug("guides", slug);

  if (!content) {
    notFound();
  }

  const publishedDate = new Date(content.publishedAt).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedDate = content.updatedAt
    ? new Date(content.updatedAt).toLocaleDateString("en-MY", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {content.category && (
            <span className="inline-block bg-primary-700 text-primary-100 text-sm px-3 py-1 rounded-full mb-4">
              {content.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{content.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {content.author}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {content.readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {updatedDate && (
            <p className="text-sm text-gray-500 mb-8 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Updated: {updatedDate}
            </p>
          )}

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={content.content} components={mdxComponents} />
          </div>

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Help Getting Approved?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our specialists can review your profile and guide you to the right loan.
          </p>
          <Link
            href="/#quote-form"
            className="btn-primary inline-block text-lg px-8 py-4 bg-secondary-500 hover:bg-secondary-600"
          >
            Get Free Consultation
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            No obligation. We help you understand your options.
          </p>
        </div>
      </section>

      <BackToTop />
    </>
  );
}
