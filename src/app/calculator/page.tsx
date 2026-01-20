"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";

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
    answer:
      "Refinancing costs include legal fees (RM2,000-5,000), valuation fees (RM300-1,000), and stamp duty (may be exempted for certain loans). Many banks offer packages that cover or reimburse these costs. Our calculator shows net savings after estimated costs.",
  },
  {
    question: "What's the minimum savings that makes refinancing worthwhile?",
    answer:
      "Generally, a difference of 0.5% or more in interest rates makes refinancing worthwhile, especially if you have more than 10 years remaining on your loan. Our calculator helps you see if the savings justify the refinancing costs.",
  },
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
    totalSavings: number;
    breakEvenMonths: number;
  } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const calculateSavings = () => {
    const principal = parseFloat(currentLoanAmount.replace(/,/g, ""));
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

    // Monthly payment calculation: M = P * [r(1+r)^n] / [(1+r)^n-1]
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
    const totalSavings = monthlySavings * totalMonths;

    // Estimated refinancing cost
    const estimatedCost = 5000;
    const breakEvenMonths = Math.ceil(estimatedCost / monthlySavings);

    setResult({
      currentMonthly: Math.round(currentMonthly),
      newMonthly: Math.round(newMonthly),
      monthlySavings: Math.round(monthlySavings),
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
              Home Loan Refinancing Calculator
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
              {/* Current Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outstanding Loan Amount (RM)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 400,000"
                  value={currentLoanAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9,]/g, "");
                    setCurrentLoanAmount(value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Current Rate */}
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

              {/* Remaining Years */}
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

              {/* New Rate */}
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
              <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Your Potential Savings
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Current Monthly Payment</p>
                    <p className="text-2xl font-bold text-gray-900">
                      RM {result.currentMonthly.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">New Monthly Payment</p>
                    <p className="text-2xl font-bold text-secondary-600">
                      RM {result.newMonthly.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-secondary-100 rounded-lg p-4">
                    <p className="text-sm text-secondary-700 mb-1">Monthly Savings</p>
                    <p className="text-3xl font-bold text-secondary-700">
                      RM {result.monthlySavings.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-secondary-100 rounded-lg p-4">
                    <p className="text-sm text-secondary-700 mb-1">Total Savings (Net)</p>
                    <p className="text-3xl font-bold text-secondary-700">
                      RM {result.totalSavings.toLocaleString()}
                    </p>
                  </div>
                </div>

                {result.breakEvenMonths > 0 && (
                  <p className="text-sm text-gray-600 mt-4">
                    Break-even point: <span className="font-semibold">{result.breakEvenMonths} months</span> (after covering estimated refinancing costs of ~RM5,000)
                  </p>
                )}

                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary mt-6 w-full"
                >
                  Get Personalized Quotes from Banks
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

      {/* SEO Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Understanding Home Loan Refinancing in Malaysia</h2>
            <p>
              Home loan refinancing allows you to replace your existing mortgage with a new loan, typically at a better interest rate. With Malaysia&apos;s competitive banking landscape, refinancing can lead to significant savings over your loan tenure.
            </p>

            <h3>When Should You Consider Refinancing?</h3>
            <ul>
              <li><strong>Interest rates have dropped:</strong> If current rates are 0.5% or more lower than your existing rate, refinancing is worth considering.</li>
              <li><strong>Lock-in period has ended:</strong> Most home loans have a 3-5 year lock-in period. Refinancing before this ends may incur penalties.</li>
              <li><strong>You have significant loan balance:</strong> The larger your outstanding loan, the more you can save from a rate reduction.</li>
              <li><strong>You have more than 10 years remaining:</strong> Longer tenure means more time to benefit from lower rates.</li>
              <li><strong>Your financial situation has improved:</strong> Better income or credit score may qualify you for better rates.</li>
            </ul>

            <h3>Current Home Loan Rates in Malaysia (2024)</h3>
            <p>
              As of 2024, home loan rates in Malaysia typically range from 3.65% to 4.5% depending on the bank and your profile. The best rates are usually available for:
            </p>
            <ul>
              <li>Loan amounts above RM500,000</li>
              <li>Properties in prime locations</li>
              <li>Borrowers with excellent credit scores</li>
              <li>Government servants and certain professional categories</li>
            </ul>

            <h3>Refinancing Costs to Consider</h3>
            <ul>
              <li><strong>Legal fees:</strong> RM2,000-5,000 depending on loan amount</li>
              <li><strong>Valuation fees:</strong> RM300-1,000</li>
              <li><strong>Stamp duty:</strong> 0.5% of loan amount (may be exempted)</li>
              <li><strong>MRTA/MLTA:</strong> Optional but often required by banks</li>
            </ul>
            <p>
              Many banks offer packages that cover or reimburse these costs, making refinancing even more attractive.
            </p>
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
    </>
  );
}
