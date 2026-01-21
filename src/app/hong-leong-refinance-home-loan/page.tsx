"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, getBanksSortedByRate } from "@/lib/constants";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ArrowRight, Check, X, Clock, FileText, AlertTriangle } from "lucide-react";

const bank = SITE_CONFIG.bankRates.hongLeong;
const { currentYear } = SITE_CONFIG;

// Get competitor banks for comparison
const allBanks = getBanksSortedByRate();
const competitors = allBanks.filter(b =>
  ["Maybank", "Public Bank", "CIMB"].includes(b.name)
).slice(0, 3);

const faqs = [
  {
    question: "What is Hong Leong's refinance rate in 2025?",
    answer: `Hong Leong Bank offers refinance rates starting from ${bank.rateFrom} p.a. for qualified borrowers. Their Base Rate is currently ${bank.rateBLR}. Actual rates depend on your profile and loan characteristics.`,
  },
  {
    question: "What is Hong Leong HomeSmart?",
    answer: "HomeSmart is Hong Leong's flagship home loan product offering features like flexible payments, redraw facility, and step-up options. It's designed for borrowers who want control over their repayment strategy.",
  },
  {
    question: "Is Hong Leong good for first-time refinancers?",
    answer: "Yes, Hong Leong is particularly suitable for first-time refinancers due to their helpful customer service, clear processes, and step-up facility that can accommodate growing incomes. They also offer good rates for smaller loan amounts.",
  },
  {
    question: "What is Hong Leong's lock-in period?",
    answer: `Hong Leong has a ${bank.lockIn}-year lock-in period. Early settlement within this period attracts a penalty of ${bank.earlySettlement} of the outstanding loan balance.`,
  },
  {
    question: "Does Hong Leong offer online refinance application?",
    answer: "Hong Leong has good digital capabilities and you can initiate applications online through their website. However, document submission and certain steps may still require branch visits for verification.",
  },
];

export default function HongLeongRefinancePage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            {bank.logo && (
              <div className="bg-white rounded-lg p-2">
                <Image
                  src={bank.logo}
                  alt="Hong Leong logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Hong Leong Refinance Home Loan {currentYear} - Rates, Review & Calculator
          </h1>
          <p className="text-lg text-green-100 mb-2">
            Complete guide to Hong Leong home loan refinancing with current rates, honest review, and comparison with other banks.
          </p>
          <p className="text-sm text-green-200">
            Updated: {SITE_CONFIG.lastUpdatedEn}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-all hover:scale-105"
          >
            Get Free Quote
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Current Rates Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Hong Leong Refinance Interest Rates {currentYear}
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Rate From</p>
                  <p className="text-3xl font-bold text-green-700">{bank.rateFrom}</p>
                  <p className="text-xs text-gray-500">p.a.</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Base Rate (BR)</p>
                  <p className="text-3xl font-bold text-gray-700">{bank.rateBLR}</p>
                  <p className="text-xs text-gray-500">Current</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Spread</p>
                  <p className="text-3xl font-bold text-green-600">{bank.spreadFrom}</p>
                  <p className="text-xs text-gray-500">to {bank.spreadTo}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">Loan Details</p>
                <ul className="space-y-2 text-gray-600">
                  <li>Min Loan: RM{bank.minLoan.toLocaleString()}</li>
                  <li>Max Loan: RM{bank.maxLoan.toLocaleString()}</li>
                  <li>Max Tenure: {bank.maxTenure} years</li>
                  <li>Max LTV: {bank.maxLTV}%</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">Fees & Penalties</p>
                <ul className="space-y-2 text-gray-600">
                  <li>Processing Fee: {bank.processingFee}</li>
                  <li>Lock-in Period: {bank.lockIn} years</li>
                  <li>Early Settlement: {bank.earlySettlement}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Calculator Link Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Calculator: Estimate Your Hong Leong Refinance Savings
            </h2>
            <div className="bg-primary-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Use our free calculator to estimate how much you could save by refinancing with Hong Leong Bank.
                Their competitive rates and HomeSmart features can help reduce your monthly payments.
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Open Refinance Calculator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>

          {/* Honest Review Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Is Hong Leong Good for Refinancing? Honest Review
            </h2>

            <p className="text-gray-700 mb-6">
              Hong Leong Bank is known for customer-focused banking and competitive home loan products.
              They&apos;re particularly popular among first-time refinancers. Here&apos;s our honest assessment:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" /> Pros
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>HomeSmart features</strong> - Flexible repayment with step-up option</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Great for first-timers</strong> - Helpful staff, clear process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Competitive rates</strong> - Starting from {bank.rateFrom}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Good digital banking</strong> - Easy loan management online</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" /> Cons
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span><strong>Smaller network</strong> - Fewer branches than top 3 banks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span><strong>Less aggressive on pricing</strong> - May not match lowest market rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span><strong>{bank.lockIn}-year lock-in</strong> - Standard penalty terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span><strong>Limited promotions</strong> - Less frequent zero-cost packages</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="font-semibold text-green-800 mb-1">Best For:</p>
              <p className="text-gray-700">
                {bank.bestFor}. Hong Leong is ideal if you appreciate personalized service,
                want flexible repayment options, or are new to refinancing and prefer a supportive process.
                The step-up facility is great for those expecting income growth.
              </p>
            </div>
          </section>

          {/* Eligibility Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Who Gets Approved? Hong Leong Refinance Eligibility
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Basic Requirements</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Age: 21 - 65 years old
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Malaysian citizen or PR
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Minimum income: RM3,000/month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Clean credit history
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-5">
                <h3 className="font-semibold text-green-800 mb-3">Higher Approval Chances</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>- Young professionals with growth potential</li>
                  <li>- Existing Hong Leong customers</li>
                  <li>- Stable employment (1+ years)</li>
                  <li>- Properties in urban and suburban areas</li>
                  <li>- Low to moderate DSR</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-5">
                <h3 className="font-semibold text-red-800 mb-3">May Face Challenges</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>- Self-employed with less than 2 years track record</li>
                  <li>- Commission-only income</li>
                  <li>- Properties in very rural areas</li>
                  <li>- High existing debt levels</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Comparison Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Hong Leong vs Other Banks Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold">Bank</th>
                    <th className="text-left p-3 font-semibold">Rate From</th>
                    <th className="text-left p-3 font-semibold">Lock-in</th>
                    <th className="text-left p-3 font-semibold">Max Tenure</th>
                    <th className="text-left p-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 border-b">
                    <td className="p-3 font-semibold">Hong Leong</td>
                    <td className="p-3 text-green-700 font-semibold">{bank.rateFrom}</td>
                    <td className="p-3">{bank.lockIn} years</td>
                    <td className="p-3">{bank.maxTenure} years</td>
                    <td className="p-3 text-sm">{bank.bestFor}</td>
                  </tr>
                  {competitors.map((comp) => (
                    <tr key={comp.name} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <Link
                          href={`/${comp.name.toLowerCase().replace(' ', '-')}-refinance-home-loan`}
                          className="text-primary-600 hover:underline"
                        >
                          {comp.name}
                        </Link>
                      </td>
                      <td className="p-3 font-semibold">{comp.rateFrom}</td>
                      <td className="p-3">{comp.lockIn} years</td>
                      <td className="p-3">{comp.maxTenure} years</td>
                      <td className="p-3 text-sm">{comp.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              * Rates are indicative and subject to change. Compare with other banks: {" "}
              <Link href="/maybank-refinance-home-loan" className="text-primary-600 hover:underline">Maybank</Link>, {" "}
              <Link href="/cimb-refinance-home-loan" className="text-primary-600 hover:underline">CIMB</Link>, {" "}
              <Link href="/public-bank-refinance-home-loan" className="text-primary-600 hover:underline">Public Bank</Link>, {" "}
              <Link href="/rhb-refinance-home-loan" className="text-primary-600 hover:underline">RHB</Link>, {" "}
              <Link href="/ambank-refinance-home-loan" className="text-primary-600 hover:underline">AmBank</Link>
            </p>
          </section>

          {/* Hidden Costs Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Hidden Costs & Fees to Watch
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Early Settlement Penalty</h3>
                  <p className="text-gray-600">
                    {bank.earlySettlement} of outstanding balance if you exit during the {bank.lockIn}-year lock-in period.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Legal Fees</h3>
                  <p className="text-gray-600">
                    {SITE_CONFIG.costs.legalFeesText}. Hong Leong occasionally offers promotional subsidies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Valuation Fee</h3>
                  <p className="text-gray-600">
                    {SITE_CONFIG.costs.valuationFeesText} for property assessment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Stamp Duty</h3>
                  <p className="text-gray-600">
                    {SITE_CONFIG.costs.stampDutyText} of loan amount. {SITE_CONFIG.costs.stampDutyNote}.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">MRTA Insurance</h3>
                  <p className="text-gray-600">
                    Hong Leong may require MRTA. Always compare with standalone term life policies
                    which may offer better value.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Time Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How Fast is Hong Leong Refinance Processing?
            </h2>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200"></div>

              <div className="space-y-6">
                {[
                  { step: "Application Submission", time: "Day 1", desc: "Submit documents online or at branch" },
                  { step: "Initial Review", time: "1-3 days", desc: "Credit check and document verification" },
                  { step: "Property Valuation", time: "1-2 weeks", desc: "Valuer inspects property" },
                  { step: "Credit Approval", time: "2-4 weeks", desc: "Loan approval decision" },
                  { step: "Letter of Offer", time: "3-5 weeks", desc: "Review and accept offer" },
                  { step: "Legal Documentation", time: "4-6 weeks", desc: "Complete legal process" },
                  { step: "Disbursement", time: "6-10 weeks", desc: "Funds disbursed, refinance complete" },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 ml-4">
                    <div className="relative">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm -ml-4">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 -mt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">{item.time}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{item.step}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Pro Tip:</strong> Hong Leong values complete applications. Prepare all documents
                before applying to avoid delays. Their staff is helpful if you need guidance.
              </p>
            </div>
          </section>

          {/* How to Apply Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Apply for Hong Leong Refinance
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Check Your Savings",
                  desc: "Use our calculator to see if Hong Leong's rates benefit you."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  desc: "IC, salary slips (3 months), bank statements (6 months), EA form, property documents."
                },
                {
                  step: 3,
                  title: "Apply Online or at Branch",
                  desc: "Hong Leong Connect for online application or visit any branch."
                },
                {
                  step: 4,
                  title: "Property Valuation",
                  desc: "Valuer will assess your property's current market value."
                },
                {
                  step: 5,
                  title: "Review Loan Offer",
                  desc: "Review HomeSmart features and confirm terms suit your needs."
                },
                {
                  step: 6,
                  title: "Legal Process",
                  desc: "Complete documentation with appointed lawyer."
                },
                {
                  step: 7,
                  title: "Disbursement",
                  desc: "Hong Leong settles old loan and your refinance is complete."
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
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
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
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
              Compare Other Banks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/maybank-refinance-home-loan"
                className="block p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <h3 className="font-semibold text-yellow-900">Maybank Refinance</h3>
                <p className="text-sm text-yellow-700">Compare Maybank rates and features</p>
              </Link>
              <Link
                href="/public-bank-refinance-home-loan"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-blue-900">Public Bank Refinance</h3>
                <p className="text-sm text-blue-700">Compare Public Bank rates and features</p>
              </Link>
              <Link
                href="/cimb-refinance-home-loan"
                className="block p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <h3 className="font-semibold text-red-900">CIMB Refinance</h3>
                <p className="text-sm text-red-700">Compare CIMB rates and features</p>
              </Link>
              <Link
                href="/calculator"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">Refinance Calculator</h3>
                <p className="text-sm text-primary-700">Calculate your potential savings</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-16 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Refinance with Hong Leong?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get a free quote and compare with other banks in 24 hours.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-block text-lg px-8 py-4 bg-white text-green-700 hover:bg-green-50"
          >
            Get Free Quote
          </button>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Get Your Free Quote</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <LeadForm variant="modal" source="hong-leong-refinance" lang="en" />
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
            "@type": "Article",
            headline: `Hong Leong Refinance Home Loan ${currentYear} - Rates, Review & Calculator`,
            description: `Complete guide to Hong Leong home loan refinancing. Current rates from ${bank.rateFrom}, honest review, eligibility requirements, and comparison with other banks.`,
            datePublished: "2025-12-01",
            dateModified: "2026-01-22",
            author: {
              "@type": "Organization",
              name: "RefinanceHomeLoanMY",
            },
            publisher: {
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
        onCtaClick={() => setShowForm(true)}
        text="Compare Hong Leong rates"
        buttonText="Get Free Quote"
      />
    </>
  );
}
