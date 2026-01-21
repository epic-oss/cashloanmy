"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import DebtConsolidationCalculator, { DebtConsolidationCalculatorValues } from "@/components/DebtConsolidationCalculator";
import DebtConsolidationLeadForm from "@/components/DebtConsolidationLeadForm";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import {
  ArrowRight,
  X,
  Calculator,
  CreditCard,
  Wallet,
  Car,
  ShoppingBag,
  HelpCircle,
  CheckCircle,
  Info,
  TrendingDown,
} from "lucide-react";

const { currentYear } = SITE_CONFIG;

const faqs = [
  {
    question: "How does this debt consolidation calculator work?",
    answer: "The calculator compares your current interest cost to what you'd pay with a cash-out refinance at 4%. It multiplies your total debt by your current rate (e.g., 18%) to get yearly interest, then compares to 4% rate. The difference is your potential savings. For example, RM50,000 at 18% = RM9,000/year interest, at 4% = RM2,000/year. Savings: RM7,000/year.",
  },
  {
    question: "Is the 4% cash-out refinance rate accurate?",
    answer: "Yes, most Malaysian banks currently offer cash-out refinance rates between 3.65% to 4.5% (as of " + SITE_CONFIG.lastUpdatedEn + "). We use 4% as a conservative average. Your actual rate may be lower depending on your credit profile, property value, and the bank you choose.",
  },
  {
    question: "What types of debt can I consolidate?",
    answer: "You can consolidate almost any type of debt through cash-out refinancing: credit cards (18%), personal loans (6-12%), car loans, BNPL debt (Shopee/Grab PayLater), overdraft, education loans, medical bills, and even outstanding taxes. The only requirement is having enough equity in your property.",
  },
  {
    question: "Are these savings guaranteed?",
    answer: "The savings shown are estimates based on interest rate differences. Actual savings depend on: (1) Your approved cash-out rate (may vary by bank/profile), (2) Loan tenure and fees, (3) Your ability to stop accumulating new debt after consolidation. However, the interest rate gap between credit cards (18%) and mortgages (4%) is real and significant.",
  },
];

const debtTypes = [
  {
    icon: CreditCard,
    name: "Credit Cards",
    rate: "15-18% p.a.",
    description: "Highest priority to consolidate due to very high interest rates",
    color: "text-red-600 bg-red-100",
  },
  {
    icon: ShoppingBag,
    name: "BNPL Debt",
    rate: "18-24% p.a.",
    description: "Shopee PayLater, Grab PayLater, Atome - often overlooked high-interest debt",
    color: "text-pink-600 bg-pink-100",
  },
  {
    icon: Wallet,
    name: "Personal Loans",
    rate: "6-12% p.a.",
    description: "Can save thousands by consolidating into mortgage rate",
    color: "text-orange-600 bg-orange-100",
  },
  {
    icon: Car,
    name: "Car Loans",
    rate: "3-5% p.a.",
    description: "Rates similar to mortgage, but consolidating simplifies payments",
    color: "text-blue-600 bg-blue-100",
  },
];

export default function DebtConsolidationCalculatorPage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formInitialDebt, setFormInitialDebt] = useState<string | undefined>(undefined);

  const handleCalculatorQuote = (values: DebtConsolidationCalculatorValues) => {
    setFormInitialDebt(values.totalDebt);
    setShowForm(true);
  };

  const handleRegularQuote = () => {
    setFormInitialDebt(undefined);
    setShowForm(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-green-200 mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm">Free Calculator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Debt Consolidation Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            See how much you can save by consolidating your high-interest debts into one low-interest payment through cash-out refinancing.
          </p>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DebtConsolidationCalculator onGetQuote={handleCalculatorQuote} />
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* How This Calculator Works */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Info className="w-7 h-7 text-green-600" />
              How This Calculator Works
            </h2>

            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Enter Your Total Debt</h4>
                    <p className="text-gray-600 text-sm">Add up all high-interest debts you want to consolidate (credit cards, personal loans, BNPL, etc.)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Select Your Current Interest Rate</h4>
                    <p className="text-gray-600 text-sm">Choose from presets (18% for credit cards, 15% for personal loans) or enter a custom rate</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">See Your Potential Savings</h4>
                    <p className="text-gray-600 text-sm">The calculator compares your current interest to a 4% cash-out refinance rate and shows monthly, yearly, and 10-year savings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>The Math:</strong> If you have RM50,000 in credit card debt at 18%,
                you&apos;re paying RM9,000/year in interest alone. With cash-out refinancing at 4%,
                that drops to RM2,000/year. That&apos;s <strong className="text-green-600">RM7,000 saved every year</strong> - or RM583/month you can put toward actually paying off your debt.
              </p>
            </div>
          </section>

          {/* Types of Debt You Can Consolidate */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Types of Debt You Can Consolidate
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {debtTypes.map((debt) => (
                <div key={debt.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${debt.color}`}>
                      <debt.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{debt.name}</h3>
                      <p className="text-sm font-medium text-red-600 mb-1">{debt.rate}</p>
                      <p className="text-sm text-gray-600">{debt.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Cash-Out Has Lower Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Cash-Out Refinance Has Lower Rates
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Secured by Property</h4>
                  <p className="text-gray-600 text-sm">Your home serves as collateral, dramatically reducing the bank&apos;s risk compared to unsecured credit card debt</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Longer Tenure</h4>
                  <p className="text-gray-600 text-sm">Mortgage rates benefit from spreading repayment over 20-30 years, resulting in lower monthly payments</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Government-Regulated Rates</h4>
                  <p className="text-gray-600 text-sm">BNM regulates mortgage rates, keeping them competitive. Credit card rates have no such caps in Malaysia</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Cash-out refinancing requires you to own a property with sufficient equity.
                If you don&apos;t own property, consider a debt consolidation personal loan (6-12% rate) or AKPK debt management program.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="my-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <TrendingDown className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to Become Debt-Free?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
              Get a personalized quote to see exactly how much you can save by consolidating your debts.
            </p>
            <button
              onClick={handleRegularQuote}
              className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get My Debt-Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-green-600" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/debt-consolidation-malaysia"
                className="block p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-200"
              >
                <h3 className="font-semibold text-green-800 mb-2">Complete Debt Consolidation Guide</h3>
                <p className="text-sm text-green-700">Learn everything about debt consolidation options in Malaysia</p>
              </Link>
              <Link
                href="/cash-out-refinance-malaysia"
                className="block p-6 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors border border-secondary-200"
              >
                <h3 className="font-semibold text-secondary-800 mb-2">Cash Out Refinance Guide</h3>
                <p className="text-sm text-secondary-700">Understand how to access your property equity</p>
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Final CTA */}
      <section className="bg-green-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take Control of Your Debt Today
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Stop paying high interest. Get a free quote and start your journey to debt freedom.
          </p>
          <button
            onClick={handleRegularQuote}
            className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Get Free Debt Consolidation Quote
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

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
              <DebtConsolidationLeadForm
                variant="modal"
                source="debt-consolidation-calculator"
                initialValues={formInitialDebt ? { totalDebt: formInitialDebt } : undefined}
              />
            </div>
          </div>
        </div>
      )}

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Debt Consolidation Calculator Malaysia",
            "description": "Free calculator to estimate savings from consolidating high-interest debt through cash-out refinancing in Malaysia.",
            "url": "https://refinancehomeloanmy.com/debt-consolidation-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "MYR"
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />

      <BackToTop />
      <StickyMobileCTA
        onCtaClick={handleRegularQuote}
        text="Calculate your savings"
        buttonText="Get Quote"
      />
    </>
  );
}
