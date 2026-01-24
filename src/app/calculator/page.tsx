"use client";

import { useState, useEffect } from "react";
import CashLoanLeadForm from "@/components/CashLoanLeadForm";
import FAQ from "@/components/FAQ";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";

const currentYear = new Date().getFullYear();
const pageTitle = `Cash Loan Calculator Malaysia ${currentYear} — Calculate Your Monthly Repayment`;

const calculatorFaqs = [
  {
    question: "What interest rate will I get?",
    answer:
      "Personal loan interest rates in Malaysia typically range from 6% to 18% per year, depending on your credit profile, income, and the bank. Those with excellent credit and stable income get rates around 6-8%. If you have credit issues or irregular income, expect rates closer to 12-18%. Our specialists can help you understand what rate you're likely to qualify for.",
  },
  {
    question: "What's the maximum loan amount I can apply for?",
    answer:
      "Most banks offer personal loans from RM1,000 up to RM200,000. The actual amount you qualify for depends on your income and existing commitments (DSR). As a general rule, your total monthly debt payments should not exceed 60-70% of your gross monthly income.",
  },
  {
    question: "How is monthly repayment calculated?",
    answer:
      "Monthly repayment is calculated using a standard reducing balance formula. The calculation takes into account your loan amount, interest rate, and tenure. This calculator uses the same formula banks use, so the results should be very close to actual bank quotes.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "Yes, most personal loans in Malaysia allow early settlement. However, some banks charge an early settlement fee (typically 2-3% of the outstanding balance) if you pay off within the first 1-2 years. After that, early settlement is usually free. Always check your loan agreement for specific terms.",
  },
];

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("8");
  const [tenure, setTenure] = useState("5");
  const [result, setResult] = useState<{
    monthlyRepayment: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
  }, []);

  const calculateRepayment = () => {
    const principal = parseFloat(stripCommas(loanAmount));
    const rate = parseFloat(interestRate);
    const years = parseFloat(tenure);

    if (!principal || principal < 1000 || principal > 200000) {
      alert("Please enter a valid loan amount (RM1,000 - RM200,000)");
      return;
    }
    if (!rate || rate < 1 || rate > 25) {
      alert("Please enter a valid interest rate (1-25%)");
      return;
    }
    if (!years || years < 1 || years > 7) {
      alert("Please enter a valid tenure (1-7 years)");
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;

    const monthlyRepayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalAmount = monthlyRepayment * totalMonths;
    const totalInterest = totalAmount - principal;

    setResult({
      monthlyRepayment: Math.round(monthlyRepayment),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cash Loan Calculator Malaysia {currentYear}
            </h1>
            <p className="text-xl text-gray-300">
              Calculate your monthly repayment before applying. Know exactly what you can afford.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Calculate Your Monthly Repayment</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (RM)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 30,000"
                  value={loanAmount}
                  onChange={(e) => {
                    const formatted = formatNumberWithCommas(e.target.value);
                    setLoanAmount(formatted);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">RM1,000 - RM200,000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% per year)
                </label>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="6">6% (Excellent credit)</option>
                  <option value="7">7%</option>
                  <option value="8">8% (Good credit)</option>
                  <option value="10">10%</option>
                  <option value="12">12% (Average credit)</option>
                  <option value="15">15%</option>
                  <option value="18">18% (Higher risk)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <select
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
                  <option value="7">7 years</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateRepayment}
              className="w-full btn-primary py-4 text-lg mt-8"
            >
              Calculate Repayment
            </button>

            {/* Results */}
            {result && (
              <div className="mt-8">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white text-center mb-6">
                  <p className="text-sm uppercase tracking-wide mb-2">Monthly Repayment</p>
                  <p className="text-5xl font-bold">RM {result.monthlyRepayment.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-gray-900">RM {result.totalInterest.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Amount Payable</p>
                    <p className="text-xl font-bold text-gray-900">RM {result.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> This is an estimate based on the information provided.
                    Actual rates and terms depend on your credit profile and the bank&apos;s assessment.
                  </p>
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary w-full py-4 text-lg"
                >
                  Get Help With Your Application
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
                <h3 className="text-xl font-bold">Get Free Consultation</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CashLoanLeadForm variant="inline" source="calculator" />
            </div>
          </div>
        </div>
      )}

      {/* Section 1: Understanding Personal Loan Rates */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Personal Loan Rates</h2>
            <p className="text-gray-600 mb-6">
              Personal loan interest rates in Malaysia typically range from <strong>6% to 18%</strong> per year.
              The rate you get depends on several factors:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="font-semibold text-green-800 mb-3">Lower Rates (6-10%)</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Clean credit history (no defaults)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Stable employment (2+ years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Higher income bracket</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Low existing debt (DSR below 50%)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-5">
                <h3 className="font-semibold text-orange-800 mb-3">Higher Rates (12-18%)</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Some late payments in history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Self-employed / variable income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>High existing debt (DSR above 60%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Shorter employment history</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How to Improve Your Approval Chances */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Improve Your Approval Chances</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Keep DSR Below 70%",
                description: "Your Debt Service Ratio should not exceed 70% of your gross income. If it's too high, consider paying down existing debts first.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: "Prepare Complete Documents",
                description: "Have your IC, 3-6 months bank statements, payslips, and EPF statements ready. Incomplete documents are a top rejection reason.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                title: "Check CCRIS/CTOS First",
                description: "Get your credit report before applying. If there are issues, you can address them first or explain them upfront to the bank.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "Consider a Guarantor",
                description: "If your profile is weak, having a guarantor with good credit can significantly improve your approval chances.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={calculatorFaqs} title="Cash Loan Calculator FAQ" />

      {/* CTA */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Help Getting Approved?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our specialists can review your profile and guide you to the right loan.
          </p>
          <Link
            href="/#quote-form"
            className="btn-primary inline-block text-lg px-8 py-4 bg-secondary-500 hover:bg-secondary-600"
          >
            Get Free Consultation
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            No obligation. We help you understand your options.
          </p>
        </div>
      </section>

      <BackToTop />
    </>
  );
}
