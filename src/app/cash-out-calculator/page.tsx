"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import CashOutCalculatorWidget, { CashOutCalculatorValues } from "@/components/CashOutCalculatorWidget";
import CashOutLeadForm, { CashOutLeadFormInitialValues } from "@/components/CashOutLeadForm";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import {
  ArrowRight,
  X,
  Calculator,
  Home,
  CreditCard,
  Hammer,
  TrendingUp,
  Heart,
  HelpCircle,
  CheckCircle,
  Info,
} from "lucide-react";

const { currentYear } = SITE_CONFIG;

const faqs = [
  {
    question: "How much cash can I take out from my property?",
    answer: "The maximum cash you can access is: (Property Value × 90%) − Outstanding Loan. For example, if your property is worth RM500,000 and you owe RM200,000, you can potentially access up to RM250,000 (RM450,000 minus RM200,000). Actual amount depends on bank valuation and your credit profile.",
  },
  {
    question: "What is the maximum LTV for cash out refinance in Malaysia?",
    answer: "The maximum Loan-to-Value (LTV) ratio for cash-out refinance in Malaysia is typically 90% for your first and second property. For third property onwards, the maximum LTV is reduced to 70% under BNM guidelines. Some banks may also have lower limits based on property type or location.",
  },
  {
    question: "How long does cash out refinance take?",
    answer: "The entire process typically takes 6-10 weeks: 1-2 weeks for property valuation, 2-3 weeks for credit approval, and 3-5 weeks for legal documentation and disbursement. You can speed up the process by having all documents ready and responding promptly to bank requests.",
  },
  {
    question: "Is cash out refinance a good idea?",
    answer: "Cash-out refinance is a good idea if you use the funds for value-adding purposes like home renovations (which can increase property value), debt consolidation (replacing 18% credit card debt with 4% mortgage), or investments with returns higher than your mortgage rate. It's not recommended for lifestyle spending or depreciating assets.",
  },
  {
    question: "Does the calculator show the exact amount I'll receive?",
    answer: "This calculator provides an estimate based on 90% LTV. Your actual cash-out amount may differ based on: (1) Bank's property valuation (which may be lower than market value), (2) Your debt service ratio and credit score, (3) BNM's 10-year rule for cash-out portion, and (4) Bank-specific policies. Get a quote to confirm your exact amount.",
  },
];

const exampleCalculations = [
  {
    propertyValue: 400000,
    outstandingLoan: 200000,
    maxLoan: 360000,
    cashOut: 160000,
    equity: 200000,
    scenario: "Starter Home",
  },
  {
    propertyValue: 600000,
    outstandingLoan: 300000,
    maxLoan: 540000,
    cashOut: 240000,
    equity: 300000,
    scenario: "Mid-Range Property",
  },
  {
    propertyValue: 800000,
    outstandingLoan: 400000,
    maxLoan: 720000,
    cashOut: 320000,
    equity: 400000,
    scenario: "Premium Property",
  },
];

const useCases = [
  {
    icon: CreditCard,
    title: "Debt Consolidation",
    description: "Pay off high-interest credit cards and personal loans at a fraction of the interest rate.",
    link: "/debt-consolidation-malaysia",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: Hammer,
    title: "Home Renovation",
    description: "Upgrade your home and potentially increase its value. Kitchen and bathroom renovations often add 70-80% ROI.",
    link: "/cash-out-refinance-malaysia#renovation",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: TrendingUp,
    title: "Investment",
    description: "Use low-cost funds for investments that can generate returns higher than your mortgage rate.",
    link: "/cash-out-refinance-malaysia#investment",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: Heart,
    title: "Emergency Funds",
    description: "Access cash for medical emergencies or unexpected expenses at lower rates than personal loans.",
    link: "/cash-out-refinance-malaysia#emergency",
    color: "text-red-600 bg-red-100",
  },
];

export default function CashOutCalculatorPage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formInitialValues, setFormInitialValues] = useState<CashOutLeadFormInitialValues | undefined>(undefined);

  // Handler for when user clicks "Get Exact Quote" from calculator
  const handleCalculatorQuote = (values: CashOutCalculatorValues) => {
    setFormInitialValues({
      propertyValue: values.propertyValue,
      outstandingLoan: values.outstandingLoan,
      cashOutNeeded: values.maxCashOut > 0 ? values.maxCashOut.toLocaleString("en-MY") : "",
      calculatedMaxCashout: values.maxCashOut,
      calculatedEquity: values.equity,
    });
    setShowForm(true);
  };

  // Handler for regular CTA clicks (no pre-fill)
  const handleRegularQuote = () => {
    setFormInitialValues(undefined);
    setShowForm(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-700 to-secondary-800 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-secondary-200 mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm">Free Calculator</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cash Out Refinance Calculator Malaysia {currentYear}
          </h1>
          <p className="text-lg text-secondary-100 max-w-2xl mx-auto">
            Calculate how much cash you can access from your property equity.
            Enter your property value and outstanding loan to see your potential cash-out amount instantly.
          </p>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CashOutCalculatorWidget onGetQuote={handleCalculatorQuote} />
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* How to Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-secondary-600" />
              How to Use This Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">Enter Property Value</h3>
                <p className="text-sm text-gray-600">
                  Enter your property&apos;s current market value. Use recent similar property sales or bank valuation as reference.
                </p>
              </div>
              <div className="bg-secondary-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">Enter Outstanding Loan</h3>
                <p className="text-sm text-gray-600">
                  Enter your current home loan balance. Check your latest loan statement for the exact amount.
                </p>
              </div>
              <div className="bg-secondary-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">View Your Results</h3>
                <p className="text-sm text-gray-600">
                  See your maximum cash-out amount (at 90% LTV) and total equity. Then get a quote for exact figures.
                </p>
              </div>
            </div>
          </section>

          {/* Understanding Your Results */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Info className="w-7 h-7 text-blue-600" />
              Understanding Your Results
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">What is LTV (Loan-to-Value)?</h3>
                <p className="text-gray-700">
                  LTV is the ratio of your loan amount to your property&apos;s value. A 90% LTV means the bank will lend
                  up to 90% of your property&apos;s value. For example, if your property is worth RM500,000, the maximum
                  loan is RM450,000 (90% × RM500,000).
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Why 90% Maximum?</h3>
                <p className="text-gray-700">
                  Bank Negara Malaysia (BNM) limits the maximum LTV to 90% for first and second properties to maintain
                  financial stability. This 10% buffer protects both banks and borrowers against property value
                  fluctuations. Third property onwards is limited to 70% LTV.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">What Affects Your Actual Cash-Out Amount?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Bank Valuation:</strong> Banks conduct their own valuation which may differ from market price</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Credit Score:</strong> Your CCRIS/CTOS record affects approval and maximum loan amount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Debt Service Ratio:</strong> Your monthly commitments must stay below 60-70% of income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Property Type:</strong> High-rise, landed, commercial properties have different limits</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Example Calculations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Example Calculations
            </h2>

            <p className="text-gray-700 mb-6">
              Here are three example scenarios showing how cash-out amounts vary based on property value and outstanding loan:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {exampleCalculations.map((example) => (
                <div key={example.scenario} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-secondary-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-3 text-center">{example.scenario}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Value:</span>
                      <span className="font-medium">RM {example.propertyValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Outstanding Loan:</span>
                      <span className="font-medium">RM {example.outstandingLoan.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Loan (90%):</span>
                      <span className="font-medium">RM {example.maxLoan.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Your Equity:</span>
                        <span className="font-medium text-blue-600">RM {example.equity.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-900 font-semibold">Cash Out:</span>
                        <span className="font-bold text-secondary-600">RM {example.cashOut.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-700 text-sm">
                <strong>Formula:</strong> Cash Out = (Property Value × 90%) − Outstanding Loan
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="my-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Get Your Exact Cash Out Amount
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
              This calculator gives you an estimate. Get a personalized quote from banks to know your exact cash-out amount.
            </p>
            <button
              onClick={handleRegularQuote}
              className="inline-flex items-center gap-2 bg-white text-secondary-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get My Exact Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* What Can You Use Cash Out For */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Can You Use Cash Out For?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <Link
                  key={useCase.title}
                  href={useCase.link}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${useCase.color}`}>
                    <useCase.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{useCase.title}</h3>
                    <p className="text-sm text-gray-600">{useCase.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                        openFaqIndex === index ? "rotate-180" : ""
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
                  {openFaqIndex === index && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/cash-out-refinance-malaysia"
                className="block p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <h3 className="font-semibold text-secondary-900">Cash Out Refinance Guide</h3>
                <p className="text-sm text-secondary-700">Complete guide to cash-out refinancing in Malaysia</p>
              </Link>
              <Link
                href="/debt-consolidation-malaysia"
                className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-green-900">Debt Consolidation</h3>
                <p className="text-sm text-green-700">Use cash-out to pay off high-interest debts</p>
              </Link>
              <Link
                href="/calculator"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-blue-900">Refinance Calculator</h3>
                <p className="text-sm text-blue-700">Calculate monthly payments and interest savings</p>
              </Link>
              <Link
                href="/en/best-refinance-banks"
                className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <h3 className="font-semibold text-purple-900">Best Refinance Banks</h3>
                <p className="text-sm text-purple-700">Compare bank rates and cash-out features</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary-700 to-secondary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Your Cash Out?
          </h2>
          <p className="text-xl text-secondary-100 mb-8">
            Get a free quote and find out exactly how much cash you can access from your property.
          </p>
          <button
            onClick={handleRegularQuote}
            className="inline-flex items-center gap-2 bg-white text-secondary-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Get Free Cash Out Quote
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
              <CashOutLeadForm variant="modal" source="cash-out-calculator" initialValues={formInitialValues} />
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
            name: `Cash Out Refinance Calculator Malaysia ${currentYear}`,
            description: "Free cash-out refinance calculator. Find out how much cash you can access from your property equity.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "MYR",
            },
            provider: {
              "@type": "Organization",
              name: "RefinanceHomeLoanMY",
              url: "https://refinancehomeloanmy.com",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <BackToTop />
      <StickyMobileCTA
        onCtaClick={handleRegularQuote}
        text="Calculate your cash out"
        buttonText="Get Quote"
      />
    </>
  );
}
