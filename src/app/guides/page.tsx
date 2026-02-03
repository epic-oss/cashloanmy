import { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/mdx";
import GuidesFilter from "@/components/GuidesFilter";

export const metadata: Metadata = {
  title: "Loan Guides | CashLoanMY",
  description:
    "Helpful guides on personal loans, getting approved, improving your credit score, and more.",
};

export default function GuidesPage() {
  const guides = getAllContent("guides");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Loan Guides
          </h1>
          <p className="text-xl text-gray-300">
            Learn how to get approved, improve your credit, and make smart
            borrowing decisions.
          </p>
        </div>
      </section>

      {/* Guides List with Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GuidesFilter guides={guides} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Personal Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our specialists can review your situation and guide you to the
            right loan.
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
