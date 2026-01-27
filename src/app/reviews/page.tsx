import { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/mdx";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Loan App & Lender Reviews Malaysia ${currentYear} | CashLoanMY`,
  description:
    "Honest reviews of personal loan apps, banks, and money lenders in Malaysia. Find out which are legit and worth using.",
};

export default function ReviewsPage() {
  const reviews = getAllContent("reviews");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Loan App & Lender Reviews
          </h1>
          <p className="text-xl text-gray-300">
            Honest reviews of personal loan apps, banks, and money lenders in
            Malaysia. Find out which are legit and worth using.
          </p>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600">
              No reviews available yet. Check back soon!
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Link
                  key={review.slug}
                  href={`/reviews/${review.slug}`}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      {review.category && (
                        <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                          {review.category}
                        </span>
                      )}
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {review.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3">
                        {review.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{review.readingTime}</span>
                        <span>
                          {new Date(review.publishedAt).toLocaleDateString(
                            "en-MY",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center text-primary-600 font-medium text-sm">
                        Read Review
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Not Sure Which Lender to Choose?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Tell us your situation and we&apos;ll recommend the best options for
            your profile.
          </p>
          <Link
            href="/#quote-form"
            className="btn-primary inline-block text-lg px-8 py-4 bg-secondary-500 hover:bg-secondary-600"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
