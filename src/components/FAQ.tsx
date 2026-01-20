"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  title?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "What is home loan refinancing?",
    answer:
      "Home loan refinancing means switching your existing mortgage to a new loan with better terms - usually a lower interest rate. This can reduce your monthly payments and save you thousands over the loan tenure.",
  },
  {
    question: "How much can I save by refinancing?",
    answer:
      "Savings vary based on your current rate, outstanding loan amount, and the new rate you qualify for. On average, Malaysian homeowners save RM300-700 per month, or RM50,000-150,000 over the remaining loan tenure.",
  },
  {
    question: "When should I consider refinancing?",
    answer:
      "Consider refinancing when: (1) Interest rates have dropped since you took your loan, (2) Your lock-in period has ended, (3) You want to consolidate debts, or (4) You need to change your loan tenure. Generally, a rate difference of 0.5% or more makes refinancing worthwhile.",
  },
  {
    question: "What are the costs involved in refinancing?",
    answer:
      "Refinancing costs typically include: legal fees (around RM2,000-5,000), valuation fees (RM300-1,000), stamp duty (0.5% of loan amount, may be waived), and MRTA/MLTA. Many banks offer packages that cover some or all of these costs.",
  },
  {
    question: "How long does the refinancing process take?",
    answer:
      "The entire refinancing process typically takes 2-3 months from application to disbursement. This includes property valuation, loan approval, legal documentation, and fund disbursement.",
  },
  {
    question: "Is your service really free?",
    answer:
      "Yes, our comparison and consultation service is 100% free. We earn a referral fee from banks when you successfully refinance through our platform. This doesn't affect the rates you receive.",
  },
];

export default function FAQ({ faqs = defaultFaqs, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-12">{title}</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
