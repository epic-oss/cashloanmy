"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, getBanksSortedByRate } from "@/lib/constants";
import CashOutLeadForm from "@/components/CashOutLeadForm";
import CashOutCalculatorWidget from "@/components/CashOutCalculatorWidget";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import {
  ArrowRight,
  Check,
  X,
  Calculator,
  AlertTriangle,
  Home,
  CreditCard,
  PiggyBank,
  Briefcase,
  Clock,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const { currentYear } = SITE_CONFIG;

// Banks that offer good cash-out options
const cashOutBanks = getBanksSortedByRate().filter(b =>
  ["Maybank", "CIMB", "Public Bank", "RHB", "Hong Leong", "AmBank", "OCBC", "UOB"].includes(b.name)
);

const faqs = [
  {
    question: "Is cash-out refinance a good idea?",
    answer: "Cash-out refinance can be a good idea if you use the funds for value-adding purposes like home renovations, debt consolidation at lower rates, or investments with returns higher than your mortgage rate. However, it's not recommended for discretionary spending as you're converting equity into debt. Always calculate the total cost over the loan term before deciding.",
  },
  {
    question: "Can I refinance and get cash out in Malaysia?",
    answer: "Yes, most Malaysian banks offer cash-out refinancing. You can access up to 90% of your property's current market value, minus your outstanding loan balance. For example, if your property is worth RM500,000 and you owe RM200,000, you could potentially access up to RM250,000 (RM450,000 at 90% LTV minus RM200,000 outstanding).",
  },
  {
    question: "How much cash can I take out when refinancing?",
    answer: "The maximum cash you can access depends on: (1) Your property's current market value, (2) The maximum LTV ratio (typically 90% for first/second property), (3) Your outstanding loan balance, and (4) Your income and debt service ratio. Banks will assess all factors before approving your cash-out amount.",
  },
  {
    question: "Does cash-out refinancing hurt my credit score?",
    answer: "Cash-out refinancing itself doesn't directly hurt your credit score. However, taking on more debt increases your debt-to-income ratio, which could affect future loan applications. Making timely payments on your new, larger loan can actually help maintain or improve your credit standing over time.",
  },
  {
    question: "What is the BNM 10-year rule for cash-out refinance in 2025?",
    answer: "Bank Negara Malaysia (BNM) has guidelines that limit cash-out refinance tenure to a maximum of 10 years for the cash-out portion. This means while your property loan can extend to 35 years, the cash-out component may be structured differently. Some banks implement this as a shorter repayment period for the cash-out amount, affecting your monthly payment calculations.",
  },
  {
    question: "What can I use cash-out refinance money for?",
    answer: "You can use cash-out funds for almost any purpose: home renovations and improvements, debt consolidation (paying off high-interest credit cards or personal loans), education expenses, medical emergencies, business investment, or purchasing another property. However, banks may ask about your intended use during application.",
  },
];

export default function CashOutRefinancePage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-700 to-secondary-800 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-secondary-200 mb-4">
            <Home className="w-5 h-5" />
            <span className="text-sm">Property Equity Release</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cash Out Refinance Malaysia {currentYear} - How to Get Cash from Your Property Equity
          </h1>
          <p className="text-lg text-secondary-100 mb-2">
            Turn your home equity into cash. Learn how cash-out refinancing works, how much you can get,
            and which banks offer the best terms.
          </p>
          <p className="text-sm text-secondary-200 mb-6">
            Updated: {SITE_CONFIG.lastUpdatedEn}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-secondary-700 font-semibold px-6 py-3 rounded-full hover:bg-secondary-50 transition-all hover:scale-105"
            >
              Get Cash Out Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#cash-out-calculator"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('cash-out-calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-secondary-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-secondary-500 transition-all border border-secondary-400 cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              Calculate Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-secondary-600">90%</p>
              <p className="text-sm text-gray-600">Max LTV</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary-600">35 yrs</p>
              <p className="text-sm text-gray-600">Max Tenure</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary-600">3.65%</p>
              <p className="text-sm text-gray-600">Rates From</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary-600">6-10 wks</p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* What is Cash Out Refinance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What is Cash Out Refinance?
            </h2>

            <p className="text-gray-700 mb-4">
              <strong>Cash-out refinance</strong> allows you to convert your property equity into cash by
              taking a new, larger mortgage than your current outstanding loan. The difference between
              your new loan amount and your existing loan is given to you as cash.
            </p>

            <div className="bg-secondary-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">How It Works:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-gray-900">Property Valuation</p>
                    <p className="text-gray-600">Bank determines your property&apos;s current market value</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-gray-900">Calculate Available Equity</p>
                    <p className="text-gray-600">Maximum loan (up to 90% LTV) minus your outstanding balance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-gray-900">New Loan Disbursement</p>
                    <p className="text-gray-600">Bank settles your old loan and gives you the cash difference</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Example:</strong> Your property is worth RM600,000. You owe RM250,000 on your current mortgage.
                At 90% LTV, you can borrow up to RM540,000. After settling your existing RM250,000 loan,
                you receive <strong>RM290,000 in cash</strong>.
              </p>
            </div>
          </section>

          {/* Cash Out Calculator Widget */}
          <section id="cash-out-calculator" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cash Out Refinance Calculator
            </h2>
            <CashOutCalculatorWidget onGetQuote={() => setShowForm(true)} />
          </section>

          {/* How Much Can You Get */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How Much Cash Can You Get?
            </h2>

            <p className="text-gray-700 mb-6">
              The amount of cash you can access depends on your property&apos;s <strong>Loan-to-Value (LTV) ratio</strong> and
              your existing loan balance. Here&apos;s how banks calculate your cash-out amount:
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">LTV Limits in Malaysia:</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Property</th>
                      <th className="text-left p-3">Max LTV</th>
                      <th className="text-left p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">1st Property</td>
                      <td className="p-3 font-semibold text-green-600">90%</td>
                      <td className="p-3 text-sm text-gray-600">Best rates available</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">2nd Property</td>
                      <td className="p-3 font-semibold text-green-600">90%</td>
                      <td className="p-3 text-sm text-gray-600">Subject to credit assessment</td>
                    </tr>
                    <tr>
                      <td className="p-3">3rd+ Property</td>
                      <td className="p-3 font-semibold text-yellow-600">70%</td>
                      <td className="p-3 text-sm text-gray-600">BNM policy restriction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-3">Example: High Equity Property</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Property Value: <strong>RM800,000</strong></li>
                  <li>Outstanding Loan: <strong>RM200,000</strong></li>
                  <li>Max Loan (90%): <strong>RM720,000</strong></li>
                  <li className="pt-2 border-t text-green-700 font-semibold">
                    Cash Out Available: <strong>RM520,000</strong>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Example: Lower Equity Property</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Property Value: <strong>RM500,000</strong></li>
                  <li>Outstanding Loan: <strong>RM350,000</strong></li>
                  <li>Max Loan (90%): <strong>RM450,000</strong></li>
                  <li className="pt-2 border-t text-blue-700 font-semibold">
                    Cash Out Available: <strong>RM100,000</strong>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* BNM 10-Year Rule */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              BNM 10-Year Rule for Cash Out Refinance Explained
            </h2>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Policy Update for {currentYear}</h3>
                  <p className="text-gray-700">
                    Bank Negara Malaysia (BNM) has guidelines affecting cash-out refinance tenure.
                    Understanding this rule is crucial for planning your cash-out strategy.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2">What is the 10-Year Rule?</h3>
                <p className="text-gray-700">
                  BNM guidelines suggest that the <strong>cash-out portion</strong> of your refinance should ideally
                  be repaid within 10 years. This doesn&apos;t mean your entire loan is limited to 10 years –
                  only the cash-out component may be structured with this shorter tenure in mind.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How Banks Implement This</h3>
                <p className="text-gray-700 mb-3">
                  Different banks handle this differently:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Some banks split the loan into two portions with different tenures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Some apply a blended rate approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Some have more flexible interpretation based on purpose of funds</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Impact on Your Monthly Payment</h3>
                <p className="text-gray-700">
                  If the 10-year rule applies to your cash-out portion, your monthly payment may be higher
                  than expected. For example, RM200,000 cash-out at 4% over 10 years = RM2,024/month,
                  versus RM955/month if spread over 25 years.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Pro Tip:</strong> Always ask the bank upfront how they structure cash-out loans
                and get the full amortization schedule before committing. Our advisors can help you find
                banks with the most favorable terms.
              </p>
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Cash Out vs Regular Refinance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cash Out vs Regular Refinance - What&apos;s the Difference?
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-left p-4 font-semibold text-secondary-700">Cash Out Refinance</th>
                    <th className="text-left p-4 font-semibold text-primary-700">Regular Refinance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Purpose</td>
                    <td className="p-4">Access equity as cash + lower rate</td>
                    <td className="p-4">Lower interest rate only</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">New Loan Amount</td>
                    <td className="p-4">Larger than existing loan</td>
                    <td className="p-4">Same as or less than existing loan</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Cash Received</td>
                    <td className="p-4 text-green-600 font-semibold">Yes - the difference</td>
                    <td className="p-4 text-gray-500">No</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Interest Rate</td>
                    <td className="p-4">May be slightly higher</td>
                    <td className="p-4">Usually lowest available</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Monthly Payment</td>
                    <td className="p-4">Usually increases</td>
                    <td className="p-4">Usually decreases</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Tenure Rules</td>
                    <td className="p-4">May have 10-year rule on cash portion</td>
                    <td className="p-4">Standard up to 35 years</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Best For</td>
                    <td className="p-4">Accessing funds for specific needs</td>
                    <td className="p-4">Reducing monthly payments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When Does Cash Out Make Sense */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              When Does Cash Out Refinance Make Sense?
            </h2>

            <p className="text-gray-700 mb-6">
              Cash-out refinance is a powerful financial tool, but it&apos;s not right for everyone. Here are
              the scenarios where it typically makes sense:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-secondary-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Home Renovations</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Use equity to upgrade your home, potentially increasing its value. Kitchen and bathroom
                  renovations often return 70-80% of their cost in added property value.
                </p>
                <p className="text-green-600 text-sm font-semibold">
                  ✓ Good use of cash-out funds
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-secondary-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Debt Consolidation</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Pay off high-interest credit cards (18-24%) or personal loans (6-12%) with your
                  mortgage rate (3.5-4.5%). Can save thousands in interest annually.
                </p>
                <p className="text-green-600 text-sm font-semibold">
                  ✓ Often the best use case
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-secondary-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Investment</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Invest in assets that can generate returns higher than your mortgage rate.
                  Common uses: property investment, business capital, education.
                </p>
                <p className="text-yellow-600 text-sm font-semibold">
                  ⚠ Good if returns exceed loan cost
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-secondary-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Emergency Fund</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Medical emergencies, unexpected expenses, or bridging cash flow gaps. Lower cost than
                  personal loans or credit cards.
                </p>
                <p className="text-yellow-600 text-sm font-semibold">
                  ⚠ Consider only for genuine emergencies
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-red-800 mb-2">When NOT to Cash Out:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Lifestyle expenses or vacations (you&apos;re paying interest for years)</li>
                <li>• Buying depreciating assets like cars</li>
                <li>• Speculative investments you don&apos;t fully understand</li>
                <li>• If you can&apos;t afford the potentially higher monthly payments</li>
              </ul>
            </div>
          </section>

          {/* Second CTA */}
          <div className="my-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Find Out Your Cash Out Amount
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
              Get a free assessment of how much cash you can access from your property
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get Free Cash Out Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Banks Offering Cash Out */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Which Banks Offer Cash Out Refinance in Malaysia?
            </h2>

            <p className="text-gray-700 mb-6">
              Most major Malaysian banks offer cash-out refinancing. Here are the top options with their
              current rates and features:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold">Bank</th>
                    <th className="text-left p-3 font-semibold">Rate From</th>
                    <th className="text-left p-3 font-semibold">Max LTV</th>
                    <th className="text-left p-3 font-semibold">Cash Out Feature</th>
                  </tr>
                </thead>
                <tbody>
                  {cashOutBanks.slice(0, 6).map((bank, index) => (
                    <tr key={bank.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3">
                        <Link
                          href={`/${bank.name.toLowerCase().replace(' ', '-')}-refinance-home-loan`}
                          className="text-primary-600 hover:underline font-medium"
                        >
                          {bank.name}
                        </Link>
                      </td>
                      <td className="p-3 font-semibold text-secondary-600">{bank.rateFrom}</td>
                      <td className="p-3">{bank.maxLTV}%</td>
                      <td className="p-3 text-sm">{bank.features.find(f => f.toLowerCase().includes('cash') || f.toLowerCase().includes('flexi')) || 'Available'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Compare individual banks: {" "}
              <Link href="/maybank-refinance-home-loan" className="text-primary-600 hover:underline">Maybank</Link>, {" "}
              <Link href="/cimb-refinance-home-loan" className="text-primary-600 hover:underline">CIMB</Link>, {" "}
              <Link href="/public-bank-refinance-home-loan" className="text-primary-600 hover:underline">Public Bank</Link>, {" "}
              <Link href="/rhb-refinance-home-loan" className="text-primary-600 hover:underline">RHB</Link>, {" "}
              <Link href="/hong-leong-refinance-home-loan" className="text-primary-600 hover:underline">Hong Leong</Link>, {" "}
              <Link href="/ambank-refinance-home-loan" className="text-primary-600 hover:underline">AmBank</Link>
            </p>
          </section>

          {/* Eligibility & Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cash Out Refinance Eligibility & Documents Required
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Eligibility Requirements
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Malaysian citizen or PR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Age 21-65 years (loan ends by age 70)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Minimum income: RM3,000/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>DSR below 70% (including new loan)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Clean CCRIS/CTOS record</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Sufficient property equity</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Documents Required
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>IC (MyKad) - front and back</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Salary slips (3 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Bank statements (6 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>EA form / Tax returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Current loan statement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Property title / S&amp;P agreement</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step by Step Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              The Cash Out Refinance Process Step-by-Step
            </h2>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-secondary-200"></div>

              <div className="space-y-6">
                {[
                  {
                    step: "Assess Your Equity",
                    time: "Day 1",
                    desc: "Calculate approximately how much cash you can access. Property value minus outstanding loan, up to 90% LTV.",
                  },
                  {
                    step: "Compare Banks & Rates",
                    time: "Day 1-3",
                    desc: "Different banks have different terms for cash-out. We can help compare multiple banks simultaneously.",
                  },
                  {
                    step: "Submit Application",
                    time: "Day 3-5",
                    desc: "Apply to your chosen bank(s) with complete documentation. Applying to multiple banks increases approval chances.",
                  },
                  {
                    step: "Property Valuation",
                    time: "Week 1-2",
                    desc: "Bank sends a valuer to assess your property's current market value. This determines your maximum cash-out.",
                  },
                  {
                    step: "Credit Approval",
                    time: "Week 2-4",
                    desc: "Bank reviews your application, income, and property valuation. They'll confirm your approved cash-out amount.",
                  },
                  {
                    step: "Accept Loan Offer",
                    time: "Week 4-5",
                    desc: "Review the Letter of Offer carefully. Confirm the cash-out amount, rate, and monthly payment.",
                  },
                  {
                    step: "Legal Process",
                    time: "Week 5-8",
                    desc: "Lawyers prepare loan and security documentation. Sign all required documents.",
                  },
                  {
                    step: "Disbursement",
                    time: "Week 8-10",
                    desc: "Bank settles your old loan. Cash-out amount credited to your account. Done!",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 ml-4">
                    <div className="relative">
                      <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-sm -ml-4">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 -mt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-secondary-600" />
                        <span className="text-sm font-semibold text-secondary-700">{item.time}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{item.step}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Risks Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Risks & Things to Watch Out For
            </h2>

            <p className="text-gray-700 mb-6">
              While cash-out refinancing can be beneficial, it&apos;s important to understand the risks:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Higher Total Interest Over Time</h3>
                  <p className="text-gray-700">
                    You&apos;re borrowing more money for potentially longer. Even at a lower rate,
                    you may pay more total interest over the life of the loan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Increased Monthly Payments</h3>
                  <p className="text-gray-700">
                    Your new loan is larger, so monthly payments typically increase.
                    Ensure you can comfortably afford the new payment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Reduced Home Equity</h3>
                  <p className="text-gray-700">
                    You&apos;re trading equity for cash. This reduces your ownership stake and could
                    affect your ability to sell if property values drop.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">New Lock-in Period</h3>
                  <p className="text-gray-700">
                    Most cash-out refinances come with a new 3-5 year lock-in period.
                    Early exit means paying penalties.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Costs Add Up</h3>
                  <p className="text-gray-700">
                    Legal fees, valuation, stamp duty, and other costs can total 2-5% of loan amount.
                    Factor these into your decision.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Our Advice:</strong> Cash-out refinancing makes sense when you&apos;re using the funds
                for value-adding purposes (renovations, high-interest debt payoff, or investments with returns
                above your mortgage rate) and you can comfortably afford the new monthly payment.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About Cash Out Refinance
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
              Related Guides
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/calculator"
                className="block p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <h3 className="font-semibold text-secondary-900">Refinance Calculator</h3>
                <p className="text-sm text-secondary-700">Calculate your cash-out amount and savings</p>
              </Link>
              <Link
                href="/en/best-refinance-banks"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">Best Refinance Banks</h3>
                <p className="text-sm text-primary-700">Compare banks with best cash-out terms</p>
              </Link>
              <Link
                href="/en/refinance-calculation-examples"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-blue-900">Refinance Calculations</h3>
                <p className="text-sm text-blue-700">Real examples with numbers explained</p>
              </Link>
              <Link
                href="/en/documents-required"
                className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <h3 className="font-semibold text-purple-900">Documents Required</h3>
                <p className="text-sm text-purple-700">Complete document checklist</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary-700 to-secondary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Access Your Property Equity?
          </h2>
          <p className="text-xl text-secondary-100 mb-8">
            Get a free assessment of how much cash you can access from your home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-secondary-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get Free Cash Out Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-secondary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-secondary-500 transition-colors text-lg border border-secondary-400"
            >
              <Calculator className="w-5 h-5" />
              Calculate Now
            </Link>
          </div>
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
              <CashOutLeadForm variant="modal" source="cash-out-refinance" />
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
            headline: `Cash Out Refinance Malaysia ${currentYear} - How to Get Cash from Your Property Equity`,
            description: "Complete guide to cash-out refinancing in Malaysia. Learn how much cash you can access from your property equity, bank comparisons, BNM 10-year rule, and step-by-step process.",
            datePublished: "2025-12-15",
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
        text="Get cash from your equity"
        buttonText="Get Quote"
      />
    </>
  );
}
