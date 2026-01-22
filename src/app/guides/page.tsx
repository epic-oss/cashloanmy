"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import LeadForm from "@/components/LeadForm";
import { ArrowRight, Search, BookOpen, Calculator, Building2, Landmark, Globe, X } from "lucide-react";

const currentYear = new Date().getFullYear();

const guidesData = {
  refinanceBM: {
    title: "Refinancing Guides (Bahasa Malaysia)",
    icon: Globe,
    color: "blue",
    items: [
      {
        title: "Bank Terbaik Refinance Rumah",
        description: "Perbandingan bank terbaik untuk refinance di Malaysia",
        href: "/bank-terbaik-refinance-rumah",
        readTime: "8 min",
      },
      {
        title: "Kelebihan & Keburukan Refinance",
        description: "Ketahui pros dan cons sebelum membuat keputusan",
        href: "/kelebihan-keburukan-refinance-rumah",
        readTime: "6 min",
      },
      {
        title: "Contoh Kiraan Refinance",
        description: "Contoh pengiraan dengan jumlah sebenar",
        href: "/contoh-kiraan-refinance-rumah",
        readTime: "5 min",
      },
      {
        title: "Dokumen Diperlukan",
        description: "Senarai lengkap dokumen untuk permohonan",
        href: "/dokumen-refinance-rumah",
        readTime: "4 min",
      },
      {
        title: "Bila Boleh Refinance",
        description: "Tempoh minimum sebelum boleh refinance",
        href: "/berapa-tahun-boleh-refinance-rumah",
        readTime: "5 min",
      },
    ],
  },
  refinanceEN: {
    title: "Refinancing Guides (English)",
    icon: BookOpen,
    color: "indigo",
    items: [
      {
        title: "Best Refinance Banks in Malaysia",
        description: "Compare top banks for home loan refinancing",
        href: "/en/best-refinance-banks",
        readTime: "8 min",
      },
      {
        title: "Pros & Cons of Refinancing",
        description: "Understand the benefits and drawbacks",
        href: "/en/pros-cons-refinancing",
        readTime: "6 min",
      },
      {
        title: "Refinance Calculation Examples",
        description: "Real examples with actual numbers",
        href: "/en/refinance-calculation-examples",
        readTime: "5 min",
      },
      {
        title: "Documents Required",
        description: "Complete checklist for your application",
        href: "/en/documents-required",
        readTime: "4 min",
      },
      {
        title: "When to Refinance",
        description: "Timing your refinance for maximum savings",
        href: "/en/when-to-refinance",
        readTime: "5 min",
      },
    ],
  },
  refinanceCN: {
    title: "中文指南 (Chinese Guides)",
    icon: Globe,
    color: "red",
    items: [
      {
        title: "什么是再融资",
        description: "全面了解房屋再融资的基础知识",
        href: "/cn/shenme-shi-refinance",
        readTime: "7 min",
      },
      {
        title: "好处与坏处",
        description: "再融资的优点和缺点分析",
        href: "/cn/refinance-haochu-huaichu",
        readTime: "6 min",
      },
      {
        title: "所需资料",
        description: "申请再融资需要准备的文件清单",
        href: "/cn/refinance-xuyao-ziliao",
        readTime: "4 min",
      },
      {
        title: "多久可以Refinance",
        description: "了解再融资的最佳时机",
        href: "/cn/duojiu-keyi-refinance",
        readTime: "5 min",
      },
      {
        title: "最佳银行",
        description: "马来西亚最佳再融资银行比较",
        href: "/cn/zuijia-refinance-yinhang",
        readTime: "8 min",
      },
    ],
  },
  cashOut: {
    title: "Cash Out Refinance",
    icon: Calculator,
    color: "purple",
    items: [
      {
        title: "Cash Out Refinance Guide",
        description: "Complete guide to extracting equity from your home",
        href: "/cash-out-refinance-malaysia",
        readTime: "10 min",
      },
      {
        title: "Cash Out Calculator",
        description: "Calculate how much cash you can extract",
        href: "/cash-out-calculator",
        readTime: "2 min",
      },
    ],
  },
  debtConsolidation: {
    title: "Debt Consolidation",
    icon: Building2,
    color: "green",
    items: [
      {
        title: "Debt Consolidation Guide",
        description: "Learn how to combine multiple debts into one",
        href: "/debt-consolidation-malaysia",
        readTime: "10 min",
      },
      {
        title: "Compare Consolidation Options",
        description: "Home equity vs personal loan vs balance transfer",
        href: "/debt-consolidation-options",
        readTime: "8 min",
      },
      {
        title: "Personal Loan Option",
        description: "Consolidation for non-property owners",
        href: "/personal-loan-debt-consolidation",
        readTime: "7 min",
      },
      {
        title: "Find Lenders",
        description: "Top banks and lenders for debt consolidation",
        href: "/debt-consolidation-lenders-malaysia",
        readTime: "6 min",
      },
      {
        title: "Penyatuan Hutang (BM)",
        description: "Panduan penyatuan hutang dalam Bahasa Malaysia",
        href: "/penyatuan-hutang-malaysia",
        readTime: "8 min",
      },
    ],
  },
  banks: {
    title: "Bank Guides",
    icon: Landmark,
    color: "amber",
    items: [
      {
        title: "Maybank Refinance",
        description: "Rates, requirements & application process",
        href: "/maybank-refinance-home-loan",
        readTime: "7 min",
      },
      {
        title: "CIMB Refinance",
        description: "Rates, requirements & application process",
        href: "/cimb-refinance-home-loan",
        readTime: "7 min",
      },
      {
        title: "Public Bank Refinance",
        description: "Rates, requirements & application process",
        href: "/public-bank-refinance-home-loan",
        readTime: "7 min",
      },
      {
        title: "RHB Refinance",
        description: "Rates, requirements & application process",
        href: "/rhb-refinance-home-loan",
        readTime: "7 min",
      },
      {
        title: "Hong Leong Refinance",
        description: "Rates, requirements & application process",
        href: "/hong-leong-refinance-home-loan",
        readTime: "7 min",
      },
      {
        title: "AmBank Refinance",
        description: "Rates, requirements & application process",
        href: "/ambank-refinance-home-loan",
        readTime: "7 min",
      },
    ],
  },
};

const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string; icon: string }> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    hover: "hover:border-blue-400",
    icon: "text-blue-600",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    hover: "hover:border-indigo-400",
    icon: "text-indigo-600",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    hover: "hover:border-red-400",
    icon: "text-red-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    hover: "hover:border-purple-400",
    icon: "text-purple-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    hover: "hover:border-green-400",
    icon: "text-green-600",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    hover: "hover:border-amber-400",
    icon: "text-amber-600",
  },
};

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Filter guides based on search query
  const filterGuides = (items: typeof guidesData.refinanceBM.items) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  };

  const hasResults = (items: typeof guidesData.refinanceBM.items) => {
    return filterGuides(items).length > 0;
  };

  const totalGuides = Object.values(guidesData).reduce(
    (acc, category) => acc + category.items.length,
    0
  );

  // Schema markup
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Refinancing & Debt Consolidation Guides Malaysia ${currentYear}`,
    description: "Complete guides on home loan refinancing, cash-out refinance, and debt consolidation in Malaysia.",
    url: "https://refinancehomeloanmy.com/guides",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalGuides,
      itemListElement: Object.values(guidesData).flatMap((category, catIndex) =>
        category.items.map((item, itemIndex) => ({
          "@type": "ListItem",
          position: catIndex * 10 + itemIndex + 1,
          url: `https://refinancehomeloanmy.com${item.href}`,
          name: item.title,
        }))
      ),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Refinancing & Debt Consolidation Guides Malaysia {currentYear}
              </h1>
              <p className="text-lg text-blue-100 mb-8">
                Your complete guide to refinancing in Malaysia. Expert guides to help you make smarter financial decisions.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>

              {/* Stats */}
              <div className="mt-8 flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalGuides}</div>
                  <div className="text-blue-200 text-sm">Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-blue-200 text-sm">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">6</div>
                  <div className="text-blue-200 text-sm">Banks Covered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guide Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Refinancing Guides - BM */}
            {hasResults(guidesData.refinanceBM.items) && (
              <GuideCategory
                data={guidesData.refinanceBM}
                filteredItems={filterGuides(guidesData.refinanceBM.items)}
              />
            )}

            {/* Refinancing Guides - EN */}
            {hasResults(guidesData.refinanceEN.items) && (
              <GuideCategory
                data={guidesData.refinanceEN}
                filteredItems={filterGuides(guidesData.refinanceEN.items)}
              />
            )}

            {/* Chinese Guides */}
            {hasResults(guidesData.refinanceCN.items) && (
              <GuideCategory
                data={guidesData.refinanceCN}
                filteredItems={filterGuides(guidesData.refinanceCN.items)}
              />
            )}

            {/* Cash Out Refinance */}
            {hasResults(guidesData.cashOut.items) && (
              <GuideCategory
                data={guidesData.cashOut}
                filteredItems={filterGuides(guidesData.cashOut.items)}
              />
            )}

            {/* Debt Consolidation */}
            {hasResults(guidesData.debtConsolidation.items) && (
              <GuideCategory
                data={guidesData.debtConsolidation}
                filteredItems={filterGuides(guidesData.debtConsolidation.items)}
              />
            )}

            {/* Bank Guides */}
            {hasResults(guidesData.banks.items) && (
              <GuideCategory
                data={guidesData.banks}
                filteredItems={filterGuides(guidesData.banks.items)}
              />
            )}

            {/* No Results */}
            {searchQuery &&
              !Object.values(guidesData).some((cat) => hasResults(cat.items)) && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No guides found for &quot;{searchQuery}&quot;
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                </div>
              )}
          </div>
        </section>

        {/* Calculators Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Free Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CalculatorCard
                title="Refinance Calculator"
                description="Calculate potential savings from refinancing"
                href="/calculator"
              />
              <CalculatorCard
                title="Cash Out Calculator"
                description="See how much equity you can extract"
                href="/cash-out-calculator"
              />
              <CalculatorCard
                title="Debt Consolidation Calculator"
                description="Calculate consolidated payment savings"
                href="/debt-consolidation-calculator"
              />
              <CalculatorCard
                title="DSR Calculator"
                description="Check your debt service ratio eligibility"
                href="/dsr-calculator"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Personalized Advice?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Our experts can help you find the best refinancing solution for your situation.
              Get a free consultation with no obligation.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-all hover:scale-105 text-lg"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              <LeadForm variant="modal" source="guides-page" />
            </div>
          </div>
        </div>
      )}
      <Footer />
      <BackToTop />
    </>
  );
}

// Guide Category Component
function GuideCategory({
  data,
  filteredItems,
}: {
  data: {
    title: string;
    icon: React.ElementType;
    color: string;
    items: { title: string; description: string; href: string; readTime: string }[];
  };
  filteredItems: { title: string; description: string; href: string; readTime: string }[];
}) {
  const Icon = data.icon;
  const colors = colorClasses[data.color];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Icon className={`w-6 h-6 ${colors.icon}`} />
        {data.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <GuideCard key={item.href} item={item} color={data.color} />
        ))}
      </div>
    </div>
  );
}

// Guide Card Component
function GuideCard({
  item,
  color,
}: {
  item: { title: string; description: string; href: string; readTime: string };
  color: string;
}) {
  const colors = colorClasses[color];

  return (
    <Link
      href={item.href}
      className={`block bg-white border ${colors.border} rounded-xl p-6 ${colors.hover} transition-all hover:shadow-md group`}
    >
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{item.readTime} read</span>
        <span className={`text-sm font-medium ${colors.text} flex items-center gap-1 group-hover:gap-2 transition-all`}>
          Read Guide
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

// Calculator Card Component
function CalculatorCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-gradient-to-br from-gray-50 to-blue-50 border border-blue-100 rounded-xl p-6 hover:border-blue-300 transition-all hover:shadow-md group"
    >
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Calculator className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
        Use Calculator
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
