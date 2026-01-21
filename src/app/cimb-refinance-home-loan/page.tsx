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

const bank = SITE_CONFIG.bankRates.cimb;
const { currentYear } = SITE_CONFIG;

// Get competitor banks for comparison
const allBanks = getBanksSortedByRate();
const competitors = allBanks.filter(b =>
  ["Maybank", "Public Bank", "Hong Leong"].includes(b.name)
).slice(0, 3);

const faqs = [
  {
    question: "What is CIMB's lowest refinance rate in 2025?",
    answer: `CIMB's refinance rates start from ${bank.rateFrom} p.a. for well-qualified borrowers. Your actual rate depends on credit profile, loan-to-value ratio, and income stability. CIMB uses a Base Rate (BR) system, currently at ${bank.rateBLR}.`,
  },
  {
    question: "How long does CIMB refinance take to approve?",
    answer: "CIMB typically processes refinance applications within 2-3 weeks for approval. The complete process from application to disbursement takes 6-8 weeks. CIMB is known for relatively efficient processing compared to some competitors.",
  },
  {
    question: "Does CIMB offer cash-out refinancing?",
    answer: "Yes, CIMB offers cash-out refinancing through their FlexiHome product. You can access equity up to 90% of property value minus outstanding loan. This is popular for debt consolidation, renovations, or investment purposes.",
  },
  {
    question: "What is CIMB's lock-in period for home loans?",
    answer: `CIMB's standard lock-in period is ${bank.lockIn} years. Early settlement within this period incurs a penalty of ${bank.earlySettlement} of the outstanding balance. Some promotional packages may have different lock-in terms.`,
  },
  {
    question: "Can I refinance to CIMB if I have an existing CIMB loan?",
    answer: "Yes, existing CIMB customers can do internal refinancing (repricing). This is often faster and may have lower costs as it doesn't require new legal documentation. Contact CIMB to discuss your repricing options.",
  },
];

export default function CIMBRefinancePage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-700 to-red-800 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            {bank.logo && (
              <div className="bg-white rounded-lg p-2">
                <Image
                  src={bank.logo}
                  alt="CIMB logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            CIMB Refinance Home Loan {currentYear} - Rates, Review & Calculator
          </h1>
          <p className="text-lg text-red-100 mb-2">
            Complete guide to CIMB home loan refinancing with current rates, honest review, and comparison with other banks.
          </p>
          <p className="text-sm text-red-200">
            Updated: {SITE_CONFIG.lastUpdatedEn}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 bg-white text-red-700 font-semibold px-6 py-3 rounded-full hover:bg-red-50 transition-all hover:scale-105"
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
              CIMB Refinance Interest Rates {currentYear}
            </h2>

            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Rate From</p>
                  <p className="text-3xl font-bold text-red-700">{bank.rateFrom}</p>
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
              Calculator: Estimate Your CIMB Refinance Savings
            </h2>
            <div className="bg-primary-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Use our free calculator to estimate how much you could save by refinancing with CIMB.
                Enter your current loan details and compare with CIMB&apos;s competitive rates.
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
              Is CIMB Good for Refinancing? Honest Review
            </h2>

            <p className="text-gray-700 mb-6">
              CIMB Bank is one of Malaysia&apos;s largest banks with strong digital banking capabilities and competitive mortgage products.
              Here&apos;s our honest assessment:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" /> Pros
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>High loan amounts</strong> - Willing to approve larger loans for qualified borrowers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>FlexiHome flexibility</strong> - Cash-out, redraw, and flexible payment features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Good digital banking</strong> - Easy online loan management via CIMB Clicks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Islamic option available</strong> - Shariah-compliant home financing</span>
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
                    <span><strong>Slightly higher rates</strong> - Not always the lowest rate in market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span><strong>Stricter DSR requirements</strong> - May be harder for high-debt applicants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span><strong>{bank.lockIn}-year lock-in</strong> - Standard penalty for early exit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                    <span><strong>Branch visits required</strong> - Some processes still need in-person visits</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="font-semibold text-red-800 mb-1">Best For:</p>
              <p className="text-gray-700">
                {bank.bestFor}. Also ideal for borrowers seeking larger loan amounts, those who value
                digital banking convenience, and applicants interested in Islamic financing options.
                CIMB Preferred customers may get preferential rates.
              </p>
            </div>
          </section>

          {/* Eligibility Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Who Gets Approved? CIMB Refinance Eligibility
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
                    Minimum income: RM3,500/month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Clean CCRIS/CTOS record
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-5">
                <h3 className="font-semibold text-green-800 mb-3">Higher Approval Chances</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>- Income above RM6,000/month</li>
                  <li>- CIMB Preferred or Priority banking customer</li>
                  <li>- Property in prime locations</li>
                  <li>- Low DSR (below 60%)</li>
                  <li>- Stable employment with established company</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-5">
                <h3 className="font-semibold text-red-800 mb-3">May Face Challenges</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>- Self-employed less than 2 years</li>
                  <li>- Properties in less developed areas</li>
                  <li>- DSR above 70%</li>
                  <li>- Previous late payment records</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Comparison Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              CIMB vs Other Banks Comparison
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
                  <tr className="bg-red-50 border-b">
                    <td className="p-3 font-semibold">CIMB</td>
                    <td className="p-3 text-red-700 font-semibold">{bank.rateFrom}</td>
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
              <Link href="/public-bank-refinance-home-loan" className="text-primary-600 hover:underline">Public Bank</Link>, {" "}
              <Link href="/rhb-refinance-home-loan" className="text-primary-600 hover:underline">RHB</Link>, {" "}
              <Link href="/hong-leong-refinance-home-loan" className="text-primary-600 hover:underline">Hong Leong</Link>, {" "}
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
                    {bank.earlySettlement} of outstanding balance if settled within {bank.lockIn}-year lock-in period.
                    On a RM500,000 loan, this could be RM10,000-15,000.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Legal Fees</h3>
                  <p className="text-gray-600">
                    Typically {SITE_CONFIG.costs.legalFeesText}. CIMB occasionally offers zero legal fee packages during promotions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Valuation Fee</h3>
                  <p className="text-gray-600">
                    {SITE_CONFIG.costs.valuationFeesText} depending on property value and location.
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
                  <h3 className="font-semibold text-gray-900">MRTA/MLTA Insurance</h3>
                  <p className="text-gray-600">
                    CIMB may bundle MRTA with loan packages. Compare standalone insurance policies
                    for potentially better coverage at lower cost.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Time Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How Fast is CIMB Refinance Processing?
            </h2>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-red-200"></div>

              <div className="space-y-6">
                {[
                  { step: "Document Submission", time: "Day 1", desc: "Submit complete application via branch or online" },
                  { step: "Initial Assessment", time: "1-2 days", desc: "CIMB reviews application and runs credit checks" },
                  { step: "Property Valuation", time: "1-2 weeks", desc: "Valuer appointed to assess property value" },
                  { step: "Credit Approval", time: "2-3 weeks", desc: "Faster than average bank processing time" },
                  { step: "Letter of Offer", time: "3-4 weeks", desc: "Receive and accept loan offer" },
                  { step: "Legal Documentation", time: "4-6 weeks", desc: "Lawyer handles loan documentation" },
                  { step: "Disbursement", time: "6-8 weeks", desc: "Funds released, refinance completed" },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 ml-4">
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm -ml-4">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 -mt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-700">{item.time}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{item.step}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Pro Tip:</strong> CIMB Preferred and Priority customers often experience faster processing.
                Submit complete documents to avoid delays.
              </p>
            </div>
          </section>

          {/* How to Apply Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Apply for CIMB Refinance
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Check Eligibility & Calculate Savings",
                  desc: "Use our calculator to determine if refinancing with CIMB is beneficial for you."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  desc: "IC, salary slips (3 months), bank statements (6 months), EA form, existing loan statement, property documents."
                },
                {
                  step: 3,
                  title: "Submit Application",
                  desc: "Apply at CIMB branch, online via CIMB Clicks, or through our comparison service."
                },
                {
                  step: 4,
                  title: "Property Valuation",
                  desc: "CIMB arranges property valuation. Ensure property is accessible for inspection."
                },
                {
                  step: 5,
                  title: "Review & Accept Offer",
                  desc: "Carefully review the Letter of Offer including rates, fees, and terms."
                },
                {
                  step: 6,
                  title: "Legal Process",
                  desc: "Complete loan agreement and mortgage documentation with appointed lawyer."
                },
                {
                  step: 7,
                  title: "Disbursement",
                  desc: "CIMB settles your existing loan. Cash-out amount (if any) credited to your account."
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
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
                href="/hong-leong-refinance-home-loan"
                className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-green-900">Hong Leong Refinance</h3>
                <p className="text-sm text-green-700">Compare Hong Leong rates and features</p>
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
      <section className="py-16 bg-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Refinance with CIMB?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Get a free quote and compare with other banks in 24 hours.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-block text-lg px-8 py-4 bg-white text-red-700 hover:bg-red-50"
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
              <LeadForm variant="modal" source="cimb-refinance" lang="en" />
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
            headline: `CIMB Refinance Home Loan ${currentYear} - Rates, Review & Calculator`,
            description: `Complete guide to CIMB home loan refinancing. Current rates from ${bank.rateFrom}, honest review, eligibility requirements, and comparison with other banks.`,
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
        text="Compare CIMB rates"
        buttonText="Get Free Quote"
      />
    </>
  );
}
