// Generate Article schema
export function generateArticleSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  author,
  url,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: author || "CashLoanMY",
      url: "https://cashloanmy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CashLoanMY",
      url: "https://cashloanmy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://cashloanmy.com/logo-icon.png",
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

// Generate FAQ schema
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
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
}

// Generate Organization schema (for homepage)
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CashLoanMY",
    url: "https://cashloanmy.com",
    description:
      "Helping Malaysians with bad credit or low income get approved for cash loans through proper bank channels.",
    logo: {
      "@type": "ImageObject",
      url: "https://cashloanmy.com/logo-icon.png",
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Malay"],
    },
  };
}

// Generate WebApplication schema (for calculator)
export function generateWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cash Loan Calculator Malaysia",
    url: "https://cashloanmy.com/calculator",
    description:
      "Free DSR calculator to check your loan eligibility in Malaysia. Calculate your Debt Service Ratio and see how much you can borrow.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MYR",
    },
  };
}

// Common FAQ questions for loan guides
export const loanGuideFAQs = [
  {
    question: "How do I get a loan if the bank rejected me in Malaysia?",
    answer:
      "If banks rejected your loan application, you can try licensed money lenders, digital lending apps like TNG GOpinjam or AEON iCash, or work with loan specialists who can help improve your DSR and CCRIS before reapplying. Avoid unlicensed lenders (Ah Long).",
  },
  {
    question: "What is the minimum salary to get a personal loan in Malaysia?",
    answer:
      "Most banks require a minimum salary of RM2,000-3,000 per month for personal loans. However, some digital lenders and licensed money lenders accept lower income levels starting from RM1,500 per month.",
  },
  {
    question: "Can I get a loan with bad CTOS or CCRIS in Malaysia?",
    answer:
      "Yes, some lenders accept applicants with impaired CCRIS or CTOS records, though at higher interest rates. Licensed money lenders and certain fintech apps have more flexible requirements than traditional banks.",
  },
];

// Common FAQ questions for loan app reviews
export const loanAppReviewFAQs = [
  {
    question: "What are the best loan apps in Malaysia?",
    answer:
      "The best loan apps in Malaysia include TNG GOpinjam (backed by Touch 'n Go), AEON iCash, Atome Cash, and ShopeePay Pinjam. These are legitimate apps backed by established companies with reasonable interest rates ranging from 12-24% p.a.",
  },
  {
    question: "Are loan apps safe to use in Malaysia?",
    answer:
      "Major loan apps backed by established companies (TNG, AEON, Atome) are generally safe. Avoid apps that ask for upfront fees, guarantee 100% approval, or request excessive phone permissions. Always check if the lender is licensed by Bank Negara Malaysia.",
  },
  {
    question: "What interest rates do loan apps charge in Malaysia?",
    answer:
      "Loan app interest rates in Malaysia typically range from 12% to 36% per annum, depending on your credit profile. This is higher than bank rates (6-8% p.a.) but more accessible for those who don't qualify for bank loans.",
  },
];
