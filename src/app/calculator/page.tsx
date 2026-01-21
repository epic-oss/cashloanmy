"use client";

import { useState, useEffect } from "react";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { SITE_CONFIG, getBanksSortedByRate } from "@/lib/constants";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";

const { currentYear, costs } = SITE_CONFIG;

// Note: Metadata must be in a separate layout.tsx or use generateMetadata for server components
// For client components, we set document title directly
const pageTitle = `Home Loan Refinancing Calculator Malaysia ${currentYear} - Calculate Your Savings`;

const calculatorFaqs = [
  {
    question: "How accurate is this refinancing calculator?",
    answer:
      "This calculator provides a good estimate based on standard loan calculations. Actual rates and savings may vary depending on your credit profile, property type, and the bank's current promotions. For an exact quote, submit your details and our specialists will provide personalized options.",
  },
  {
    question: "What interest rate should I use for my current loan?",
    answer:
      "Check your latest bank statement or loan agreement for your current interest rate. Most Malaysian home loans are on Base Rate (BR) or Base Lending Rate (BLR) plus a spread. If you're unsure, use 4.5-5% as a rough estimate for older loans.",
  },
  {
    question: "Are there any hidden costs in refinancing?",
    answer: `Refinancing costs include legal fees (${costs.legalFeesText}), valuation fees (${costs.valuationFeesText}), and stamp duty (may be exempted for certain loans). Many banks offer packages that cover or reimburse these costs. Our calculator shows net savings after estimated costs.`,
  },
  {
    question: "What's the minimum savings that makes refinancing worthwhile?",
    answer:
      "Generally, a difference of 0.5% or more in interest rates makes refinancing worthwhile, especially if you have more than 10 years remaining on your loan. Our calculator helps you see if the savings justify the refinancing costs.",
  },
];

// Get bank rates from constants (sorted by lowest rate)
const bankRates = getBanksSortedByRate().slice(0, 5).map((bank) => ({
  bank: bank.name,
  rate: bank.rateFrom,
  bestFor: bank.bestFor,
}));

const refinancingCosts = [
  { title: "Legal Fees", amount: costs.legalFeesText, icon: "scale" },
  { title: "Valuation Fees", amount: costs.valuationFeesText, icon: "home" },
  { title: "Stamp Duty", amount: `${costs.stampDutyText} (may be exempted)`, icon: "file" },
  { title: "MRTA/MLTA", amount: "Optional", icon: "shield" },
];

export default function CalculatorPage() {
  const [currentLoanAmount, setCurrentLoanAmount] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [remainingYears, setRemainingYears] = useState("");
  const [newRate, setNewRate] = useState("3.85");
  const [result, setResult] = useState<{
    currentMonthly: number;
    newMonthly: number;
    monthlySavings: number;
    yearlySavings: number;
    totalSavings: number;
    breakEvenMonths: number;
  } | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
  }, []);

  const calculateSavings = () => {
    const principal = parseFloat(stripCommas(currentLoanAmount));
    const currentRateNum = parseFloat(currentRate);
    const newRateNum = parseFloat(newRate);
    const years = parseFloat(remainingYears);

    if (!principal || principal < 50000) {
      alert("Please enter a valid loan amount (minimum RM 50,000)");
      return;
    }
    if (!currentRateNum || currentRateNum < 1 || currentRateNum > 15) {
      alert("Please enter a valid current interest rate (1-15%)");
      return;
    }
    if (!years || years < 1 || years > 35) {
      alert("Please enter valid remaining years (1-35)");
      return;
    }

    const monthlyCurrentRate = currentRateNum / 100 / 12;
    const monthlyNewRate = newRateNum / 100 / 12;
    const totalMonths = years * 12;

    const currentMonthly =
      (principal * monthlyCurrentRate * Math.pow(1 + monthlyCurrentRate, totalMonths)) /
      (Math.pow(1 + monthlyCurrentRate, totalMonths) - 1);

    const newMonthly =
      (principal * monthlyNewRate * Math.pow(1 + monthlyNewRate, totalMonths)) /
      (Math.pow(1 + monthlyNewRate, totalMonths) - 1);

    const monthlySavings = currentMonthly - newMonthly;
    const yearlySavings = monthlySavings * 12;
    const totalSavings = monthlySavings * totalMonths;

    const estimatedCost = 5000;
    const breakEvenMonths = Math.ceil(estimatedCost / monthlySavings);

    setResult({
      currentMonthly: Math.round(currentMonthly),
      newMonthly: Math.round(newMonthly),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      totalSavings: Math.round(totalSavings - estimatedCost),
      breakEvenMonths: breakEvenMonths > 0 ? breakEvenMonths : 0,
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Home Loan Refinancing Calculator Malaysia {currentYear}
            </h1>
            <p className="text-xl text-gray-300">
              Calculate your potential savings by refinancing your home loan. See how much you could save monthly and over your loan tenure.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Calculate Your Savings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outstanding Loan Amount (RM)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 400,000"
                  value={currentLoanAmount}
                  onChange={(e) => {
                    const formatted = formatNumberWithCommas(e.target.value);
                    setCurrentLoanAmount(formatted);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 4.75"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remaining Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 20"
                  min="1"
                  max="35"
                  value={remainingYears}
                  onChange={(e) => setRemainingYears(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Interest Rate (%)
                </label>
                <select
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="3.65">3.65% (Best available rate)</option>
                  <option value="3.85">3.85% (Excellent rate)</option>
                  <option value="4.00">4.00% (Good rate)</option>
                  <option value="4.15">4.15% (Average rate)</option>
                  <option value="4.35">4.35% (Standard rate)</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateSavings}
              className="w-full btn-primary py-4 text-lg mt-8"
            >
              Calculate My Savings
            </button>

            {/* Results */}
            {result && (
              <div className="mt-8">
                <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white text-center mb-6">
                  <p className="text-sm uppercase tracking-wide mb-2">Your Monthly Savings</p>
                  <p className="text-5xl font-bold">RM {result.monthlySavings.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Current Monthly</p>
                    <p className="text-lg font-bold text-gray-900">RM {result.currentMonthly.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">New Monthly</p>
                    <p className="text-lg font-bold text-secondary-600">RM {result.newMonthly.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Yearly Savings</p>
                    <p className="text-lg font-bold text-secondary-600">RM {result.yearlySavings.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Savings</p>
                    <p className="text-lg font-bold text-secondary-600">RM {result.totalSavings.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-4 flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Break-even Period</span>
                  </div>
                  <span className="font-bold text-primary-800">{result.breakEvenMonths} months</span>
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary w-full py-4 text-lg"
                >
                  Get Your Personalized Rate
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Get Your Personalized Quote</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <LeadForm variant="modal" source="calculator" />
            </div>
          </div>
        </div>
      )}

      {/* Section 1: When to Refinance */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">When Should You Consider Refinancing?</h2>
            <div className="space-y-4">
              {[
                { title: "Interest rates have dropped", desc: "Current rates are 0.5% or more lower than your existing rate" },
                { title: "Lock-in period has ended", desc: "Most loans have 3-5 year lock-in. Refinancing before may incur penalties" },
                { title: "Significant loan balance", desc: "Larger outstanding loans mean bigger savings from rate reduction" },
                { title: "More than 10 years remaining", desc: "Longer tenure = more time to benefit from lower rates" },
                { title: "Financial situation improved", desc: "Better income or credit score may qualify you for better rates" },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Bank Rates Table */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Home Loan Rates in Malaysia ({currentYear})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Bank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Rate From</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {bankRates.map((bank, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{bank.bank}</td>
                      <td className="py-3 px-4 text-secondary-600 font-semibold">{bank.rate}</td>
                      <td className="py-3 px-4 text-gray-600">{bank.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">* Rates are indicative and subject to change. Final rate depends on your profile.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Refinancing Costs */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Refinancing Costs to Consider</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {refinancingCosts.map((cost, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {cost.icon === "scale" && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  )}
                  {cost.icon === "home" && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {cost.icon === "file" && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {cost.icon === "shield" && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{cost.title}</p>
                <p className="text-secondary-600 font-bold mt-1">{cost.amount}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Many banks offer packages that cover or reimburse these costs!
          </p>
        </div>
      </section>

      {/* Section 4: Who Gets Best Rates */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Gets the Best Rates?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "cash", text: "Loan amounts above RM500,000" },
                { icon: "location", text: "Properties in prime locations" },
                { icon: "star", text: "Excellent credit scores" },
                { icon: "badge", text: "Government servants & professionals" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-primary-50 rounded-lg p-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {item.icon === "cash" && (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {item.icon === "location" && (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {item.icon === "star" && (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                    {item.icon === "badge" && (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={calculatorFaqs} title="Refinancing Calculator FAQ" />

      {/* CTA */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our calculator gives you an estimate. Get exact quotes from Malaysia&apos;s top banks today.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-block text-lg px-8 py-4"
          >
            Get Free Quotes
          </button>
        </div>
      </section>

      <BackToTop />
      <StickyMobileCTA onCtaClick={() => setShowForm(true)} />
    </>
  );
}
