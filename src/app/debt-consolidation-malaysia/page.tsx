"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import DebtConsolidationLeadForm from "@/components/DebtConsolidationLeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import {
  ArrowRight,
  Check,
  X,
  Calculator,
  AlertTriangle,
  CreditCard,
  Wallet,
  Car,
  ShoppingBag,
  Building2,
  TrendingDown,
  Shield,
  Clock,
  FileText,
  CircleDollarSign,
  Heart,
} from "lucide-react";

const { currentYear } = SITE_CONFIG;

const faqs = [
  {
    question: "Is getting a loan to consolidate debt a good idea?",
    answer: "Yes, if you can secure a lower interest rate than what you're currently paying. For example, consolidating RM50,000 of credit card debt at 18% into a cash-out refinance at 4% can save you over RM7,000 per year in interest alone. The key is to stop accumulating new debt after consolidation and commit to paying off the consolidated loan.",
  },
  {
    question: "Which banks offer debt consolidation loans in Malaysia?",
    answer: "Most major banks offer debt consolidation through cash-out refinancing if you own property: Maybank, CIMB, Public Bank, RHB, Hong Leong, AmBank, UOB, and OCBC. For unsecured debt consolidation personal loans, options include Maybank, CIMB, Public Bank, and RHB, though rates are typically 6-12% compared to 3.5-4.5% for cash-out refinance.",
  },
  {
    question: "Does debt consolidation hurt your credit?",
    answer: "Cash-out refinancing for debt consolidation generally doesn't hurt your credit score directly. In fact, it can improve your credit over time by lowering your credit utilization ratio (after paying off credit cards) and converting multiple payments into one. However, your credit may be temporarily affected during the loan application process.",
  },
  {
    question: "How to settle debt fast in Malaysia?",
    answer: "The fastest ways to settle debt in Malaysia: (1) Cash-out refinance to pay off all high-interest debt at once with a lower rate, (2) Debt avalanche method - pay minimums on all debts, put extra money toward highest-interest debt first, (3) Balance transfer to 0% credit card promotions, (4) AKPK debt management program if you're struggling. Cash-out refinance is usually the most effective if you own property.",
  },
  {
    question: "Can I consolidate debt if I have bad credit?",
    answer: "It's more challenging but possible. For cash-out refinance, banks primarily look at your property equity and income stability, not just credit score. If you have consistent income and sufficient home equity, you may still qualify. Some banks like RHB and AmBank are known to be more flexible. AKPK is also an option if traditional lenders reject you.",
  },
  {
    question: "How much can I save by consolidating debt?",
    answer: "Savings depend on your current interest rates and the consolidation rate. Typical savings: Credit card debt (18% → 4%) saves ~RM700/year per RM50,000. Personal loan (8% → 4%) saves ~RM200/year per RM50,000. The bigger your debt and the higher your current rates, the more you'll save. Plus, you get the convenience of one monthly payment instead of juggling multiple bills.",
  },
];

const debtTypes = [
  { icon: CreditCard, name: "Credit Cards", rate: "15-18%", color: "text-red-500" },
  { icon: Wallet, name: "Personal Loans", rate: "6-12%", color: "text-orange-500" },
  { icon: Car, name: "Car Loans", rate: "3-5%", color: "text-yellow-600" },
  { icon: ShoppingBag, name: "BNPL (Shopee/Grab)", rate: "18-24%", color: "text-pink-500" },
  { icon: Building2, name: "Overdraft", rate: "7-9%", color: "text-purple-500" },
];

export default function DebtConsolidationPage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-green-200 mb-4">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm">Debt Relief Solution</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Debt Consolidation Malaysia {currentYear} - Pay Off All Your Debts with One Low-Interest Loan
          </h1>
          <p className="text-lg text-green-100 mb-2">
            Struggling with multiple debts? Combine credit cards, personal loans, and other debts into one
            manageable payment at a much lower interest rate.
          </p>
          <p className="text-sm text-green-200 mb-6">
            Updated: {SITE_CONFIG.lastUpdatedEn}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-all hover:scale-105"
            >
              Get Your Debt-Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition-all border border-green-400"
            >
              <Calculator className="w-5 h-5" />
              Calculate Savings
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-green-600">18%</p>
              <p className="text-sm text-gray-600">Avg Credit Card Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">3.65%</p>
              <p className="text-sm text-gray-600">Cash-Out Rate From</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">RM583</p>
              <p className="text-sm text-gray-600">Monthly Savings*</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">1</p>
              <p className="text-sm text-gray-600">Simple Payment</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">*Based on RM50k debt consolidation example</p>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Drowning in Debt */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Heart className="w-7 h-7 text-red-500" />
              Drowning in Debt? You&apos;re Not Alone
            </h2>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg mb-6">
              <p className="text-gray-700 mb-4">
                If you&apos;re reading this, you probably know the stress of juggling multiple debts - the credit card bills
                that never seem to go down, the personal loan payments, maybe even BNPL that seemed harmless at first.
                <strong> We understand.</strong>
              </p>
              <p className="text-gray-700">
                The good news? If you own a property, there&apos;s a way out that most Malaysians don&apos;t know about.
                You can consolidate all your high-interest debts into your home loan at a fraction of the interest rate.
              </p>
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">Common Debts Malaysians Carry:</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {debtTypes.map((debt) => (
                <div key={debt.name} className="bg-gray-50 rounded-lg p-4 text-center">
                  <debt.icon className={`w-8 h-8 mx-auto mb-2 ${debt.color}`} />
                  <p className="font-medium text-gray-900 text-sm">{debt.name}</p>
                  <p className={`text-sm font-bold ${debt.color}`}>{debt.rate}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What is Debt Consolidation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What is Debt Consolidation?
            </h2>

            <p className="text-gray-700 mb-4">
              <strong>Debt consolidation</strong> means combining multiple debts into a single loan with a lower interest rate.
              Instead of paying 5 different creditors with different due dates and interest rates, you make one payment each month.
            </p>

            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">The Simple Math:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-100 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Before Consolidation</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Credit Card 1: RM15,000 @ 18%</li>
                    <li>Credit Card 2: RM10,000 @ 18%</li>
                    <li>Personal Loan: RM20,000 @ 8%</li>
                    <li>BNPL: RM5,000 @ 24%</li>
                    <li className="pt-2 border-t border-red-200 font-semibold">
                      Total: RM50,000 | 5 payments | Avg ~14% interest
                    </li>
                  </ul>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ After Consolidation</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Cash-Out Refinance: RM50,000</li>
                    <li>Interest Rate: 4%</li>
                    <li>All debts: PAID OFF</li>
                    <li>&nbsp;</li>
                    <li className="pt-2 border-t border-green-200 font-semibold">
                      Total: RM50,000 | 1 payment | 4% interest
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Debt Consolidation Calculator Example */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How Much Can You Save? Real Example
            </h2>

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 md:p-8 text-white mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-8 h-8" />
                <h3 className="text-2xl font-bold">RM50,000 Credit Card Debt</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Paying Credit Card at 18%:</h4>
                  <ul className="space-y-2 text-green-100">
                    <li>Monthly interest: <strong className="text-white">RM750</strong></li>
                    <li>Minimum payment (5%): <strong className="text-white">RM2,500</strong></li>
                    <li>Years to pay off: <strong className="text-white">~10 years</strong></li>
                    <li>Total interest paid: <strong className="text-red-300">RM45,000+</strong></li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Cash-Out Refinance at 4%:</h4>
                  <ul className="space-y-2 text-green-100">
                    <li>Monthly interest: <strong className="text-white">RM167</strong></li>
                    <li>Monthly payment (10yr): <strong className="text-white">RM506</strong></li>
                    <li>Years to pay off: <strong className="text-white">10 years</strong></li>
                    <li>Total interest paid: <strong className="text-green-300">RM10,700</strong></li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg p-4 text-center">
                <p className="text-green-700 text-sm mb-1">Your Monthly Savings</p>
                <p className="text-4xl font-bold text-green-700">RM583</p>
                <p className="text-green-600 text-sm">per month in interest alone</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                Calculate My Savings
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* 3 Ways to Consolidate */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3 Ways to Consolidate Debt in Malaysia
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold">Method</th>
                    <th className="text-left p-4 font-semibold">Interest Rate</th>
                    <th className="text-left p-4 font-semibold">Requirement</th>
                    <th className="text-left p-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-green-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">BEST</span>
                        <Link href="/cash-out-refinance-malaysia" className="font-semibold text-green-700 hover:underline">
                          Cash-Out Refinance
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-green-600">3.5% - 4.5%</td>
                    <td className="p-4 text-sm">Own property with equity</td>
                    <td className="p-4 text-sm">Property owners with significant debt</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Personal Loan</td>
                    <td className="p-4 font-semibold text-yellow-600">6% - 12%</td>
                    <td className="p-4 text-sm">Good credit score</td>
                    <td className="p-4 text-sm">Non-property owners, smaller debts</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">AKPK Program</td>
                    <td className="p-4 font-semibold text-gray-600">0% (frozen)</td>
                    <td className="p-4 text-sm">Financial hardship</td>
                    <td className="p-4 text-sm">Those who can&apos;t get other options</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Note on AKPK:</strong> The AKPK (Agensi Kaunseling dan Pengurusan Kredit) debt management program
                is a last resort option. While it freezes interest, it also affects your credit score and ability
                to get new credit for years. Only consider this if you truly cannot manage your debts otherwise.
              </p>
            </div>
          </section>

          {/* Why Cash-Out is Best */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Cash-Out Refinance is the Best Option for Debt Consolidation
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CircleDollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Lowest Interest Rate</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Home loan rates (3.5-4.5%) are the lowest available. Compare to credit cards (18%)
                  or personal loans (6-12%). Your money works for you, not the bank.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">One Monthly Payment</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  No more juggling multiple due dates, minimum payments, and creditors.
                  Just one payment added to your existing home loan payment.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Lower Monthly Payment</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Longer tenure means lower monthly payments. This frees up cash flow
                  for savings, emergencies, or paying off the loan faster when you can.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">No Credit Score Impact</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Unlike AKPK, cash-out refinance doesn&apos;t negatively impact your credit.
                  In fact, paying off credit cards can improve your utilization ratio.
                </p>
              </div>
            </div>
          </section>

          {/* Mid Page CTA */}
          <div className="my-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to Be Debt-Free?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
              Find out how much you can save by consolidating all your debts into one low-interest payment.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get Your Debt-Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Which Banks */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Which Banks Offer Debt Consolidation in Malaysia?
            </h2>

            <p className="text-gray-700 mb-6">
              Most major banks offer cash-out refinancing which can be used for debt consolidation.
              Here are banks known for their debt consolidation-friendly policies:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {["Maybank", "CIMB", "Public Bank", "RHB", "Hong Leong", "AmBank"].map((bank) => (
                <Link
                  key={bank}
                  href={`/${bank.toLowerCase().replace(' ', '-')}-refinance-home-loan`}
                  className="bg-gray-50 hover:bg-green-50 rounded-lg p-4 text-center transition-colors"
                >
                  <p className="font-semibold text-gray-900">{bank}</p>
                  <p className="text-sm text-green-600">View Rates →</p>
                </Link>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Pro Tip:</strong> Apply to 2-3 banks simultaneously. Different banks have different
                approval criteria - what one rejects, another may approve. Our advisors can help you
                identify the best banks for your specific situation.
              </p>
            </div>
          </section>

          {/* Bad Credit Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Can I Consolidate Debt with Bad Credit?
            </h2>

            <p className="text-gray-700 mb-6">
              Yes, but it&apos;s more challenging. Here are your options based on your situation:
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-5">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  If You Own Property with Equity
                </h3>
                <p className="text-gray-700">
                  This is your best option. Banks focus more on property value and income than credit score
                  for secured loans. Even with some late payments, you may qualify for cash-out refinance.
                  Banks like RHB and AmBank are known to be more flexible.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-5">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  If Your Credit Score is Very Low
                </h3>
                <p className="text-gray-700">
                  Consider improving your credit first: pay all minimums on time for 3-6 months,
                  reduce credit utilization below 30%, and clear any outstanding CCRIS issues.
                  Then try again for cash-out refinance.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Last Resort: AKPK
                </h3>
                <p className="text-gray-700">
                  If all else fails, AKPK (Agensi Kaunseling dan Pengurusan Kredit) can help negotiate
                  with your creditors. They freeze interest and create a repayment plan. Downside:
                  it affects your credit for years and you can&apos;t get new credit during the program.
                </p>
              </div>
            </div>
          </section>

          {/* Documents Required */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Documents Required for Debt Consolidation
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Personal Documents
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>IC (MyKad) - front and back</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Latest 3 months salary slips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Latest 6 months bank statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>EA form / Latest tax return (BE form)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>EPF statement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Property & Debt Documents
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Current home loan statement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Property title / S&amp;P agreement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Credit card statements (all cards)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Personal loan statements (if any)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Other debt statements</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About Debt Consolidation
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
                href="/cash-out-refinance-malaysia"
                className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-green-900">Cash Out Refinance Guide</h3>
                <p className="text-sm text-green-700">Complete guide to accessing your home equity</p>
              </Link>
              <Link
                href="/calculator"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-blue-900">Refinance Calculator</h3>
                <p className="text-sm text-blue-700">Calculate how much you can save</p>
              </Link>
              <Link
                href="/en/best-refinance-banks"
                className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <h3 className="font-semibold text-purple-900">Best Refinance Banks</h3>
                <p className="text-sm text-purple-700">Compare bank rates and features</p>
              </Link>
              <Link
                href="/en/documents-required"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <h3 className="font-semibold text-orange-900">Documents Required</h3>
                <p className="text-sm text-orange-700">Complete checklist for application</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take the First Step to Being Debt-Free
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get a free consultation and find out how much you can save by consolidating your debts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get Your Debt-Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-500 transition-colors text-lg border border-green-400"
            >
              <Calculator className="w-5 h-5" />
              Calculate Savings
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
              <DebtConsolidationLeadForm variant="modal" source="debt-consolidation" />
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
            headline: `Debt Consolidation Malaysia ${currentYear} - Pay Off All Your Debts with One Low-Interest Loan`,
            description: "Complete guide to debt consolidation in Malaysia. Learn how to combine credit cards, personal loans, and other debts into one low-interest payment using cash-out refinance.",
            datePublished: "2026-01-22",
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
        text="Consolidate your debts today"
        buttonText="Get Quote"
      />
    </>
  );
}
