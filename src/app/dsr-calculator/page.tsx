"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import LeadForm from "@/components/LeadForm";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";
import {
  ArrowRight,
  Calculator,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  HelpCircle,
  Building2,
  Percent,
  DollarSign,
  CreditCard,
  Car,
  Home,
  Wallet,
  Info,
} from "lucide-react";

const { currentYear } = SITE_CONFIG;

const bankDSRData = [
  { bank: "Maybank", employed: "70%", selfEmployed: "65%", href: "/maybank-refinance-home-loan" },
  { bank: "Public Bank", employed: "70%", selfEmployed: "60%", href: "/public-bank-refinance-home-loan" },
  { bank: "CIMB", employed: "70%", selfEmployed: "65%", href: "/cimb-refinance-home-loan" },
  { bank: "Hong Leong", employed: "75%", selfEmployed: "65%", href: "/hong-leong-refinance-home-loan" },
  { bank: "RHB", employed: "70%", selfEmployed: "60%", href: "/rhb-refinance-home-loan" },
  { bank: "AmBank", employed: "70%", selfEmployed: "65%", href: "/ambank-refinance-home-loan" },
];

const faqs = [
  {
    question: "What is a good DSR ratio in Malaysia?",
    answer: "A good DSR is below 60%, which gives you excellent approval chances with most banks. DSR between 60-70% is still acceptable for most lenders. Above 70% is considered high risk, and you may face rejection or limited options. Some banks like Hong Leong may accept up to 75% for employed applicants with strong profiles.",
  },
  {
    question: "What's the typical DSR limit for a mortgage in Malaysia?",
    answer: "Most Malaysian banks set the DSR limit at 70% for salaried employees and 60-65% for self-employed applicants. This means your total monthly debt payments (including the new loan) should not exceed 70% of your gross monthly income. Bank Negara Malaysia recommends banks use DSR as a key affordability measure.",
  },
  {
    question: "How do I calculate DSR for housing loan?",
    answer: "DSR = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100. For example, if your monthly income is RM10,000 and your total debt payments are RM6,000, your DSR is 60%. Include all loans: home loan, car loan, personal loans, credit card minimum payments, and any other monthly commitments.",
  },
  {
    question: "Can I get a loan with high DSR above 70%?",
    answer: "It's difficult but not impossible. Options include: (1) Hong Leong Bank accepts up to 75% for strong profiles, (2) Add a co-borrower to increase combined income, (3) Pay off smaller debts first to reduce DSR, (4) Consolidate high-interest debt into your refinance to lower overall payments, (5) Choose a longer tenure to reduce monthly payments.",
  },
  {
    question: "What is the DSR limit set by Bank Negara Malaysia?",
    answer: "Bank Negara Malaysia (BNM) doesn't set a fixed DSR limit but requires banks to assess borrowers' debt serviceability. Most banks interpret this as a 70% maximum for employed borrowers. BNM's responsible lending guidelines emphasize that borrowers should have sufficient income after debt payments to cover living expenses.",
  },
  {
    question: "Does refinancing improve my DSR?",
    answer: "Often yes! Refinancing to a lower interest rate reduces your monthly payment, which lowers your DSR. For example, reducing your home loan rate from 5% to 4% on a RM500,000 loan could save RM300+/month, reducing your DSR by 3-5%. This is especially helpful if you're looking to take on additional financing.",
  },
];

function getDSRStatus(dsr: number) {
  if (dsr < 60) {
    return {
      status: "Excellent",
      message: "High approval chances with all banks",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      icon: CheckCircle,
    };
  } else if (dsr < 70) {
    return {
      status: "Good",
      message: "Most banks will approve",
      color: "yellow",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      icon: CheckCircle,
    };
  } else if (dsr < 80) {
    return {
      status: "Moderate",
      message: "Limited bank options available",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      icon: AlertTriangle,
    };
  } else {
    return {
      status: "High",
      message: "May need debt reduction first",
      color: "red",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      icon: X,
    };
  }
}

export default function DSRCalculatorPage() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Calculator state
  const [grossIncome, setGrossIncome] = useState("");
  const [homeLoan, setHomeLoan] = useState("");
  const [carLoan, setCarLoan] = useState("");
  const [personalLoan, setPersonalLoan] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [otherLoans, setOtherLoans] = useState("");
  const [newLoanPayment, setNewLoanPayment] = useState("");

  // Parse values
  const grossIncomeNum = parseFloat(stripCommas(grossIncome)) || 0;
  const homeLoanNum = parseFloat(stripCommas(homeLoan)) || 0;
  const carLoanNum = parseFloat(stripCommas(carLoan)) || 0;
  const personalLoanNum = parseFloat(stripCommas(personalLoan)) || 0;
  const creditCardNum = parseFloat(stripCommas(creditCard)) || 0;
  const otherLoansNum = parseFloat(stripCommas(otherLoans)) || 0;
  const newLoanPaymentNum = parseFloat(stripCommas(newLoanPayment)) || 0;

  // Calculations
  const totalCurrentDebt = homeLoanNum + carLoanNum + personalLoanNum + creditCardNum + otherLoansNum;
  const totalNewDebt = totalCurrentDebt + newLoanPaymentNum;
  const currentDSR = grossIncomeNum > 0 ? (totalCurrentDebt / grossIncomeNum) * 100 : 0;
  const newDSR = grossIncomeNum > 0 ? (totalNewDebt / grossIncomeNum) * 100 : 0;

  // Max loan calculation (based on 70% DSR)
  const maxMonthlyPayment = grossIncomeNum * 0.7 - totalCurrentDebt;
  const hasInput = grossIncomeNum > 0;

  const currentStatus = getDSRStatus(currentDSR);
  const newStatus = getDSRStatus(newDSR);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Percent className="w-5 h-5" />
            <span className="text-sm">Eligibility Check</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            DSR Calculator Malaysia {currentYear} - Check Your Refinancing Eligibility
          </h1>
          <p className="text-lg text-blue-100 mb-2">
            Can you qualify for refinancing? Check your Debt Service Ratio (DSR) in 30 seconds
            and find out your approval chances.
          </p>
          <p className="text-sm text-blue-200 mb-6">
            Updated: {SITE_CONFIG.lastUpdatedEn}
          </p>
          <div className="grid grid-cols-2 gap-4 text-center max-w-md">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">70%</p>
              <p className="text-xs text-blue-200">Max DSR for Most Banks</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">30 sec</p>
              <p className="text-xs text-blue-200">Quick Check</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* DSR Calculator */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">DSR Calculator</h2>
                  <p className="text-sm text-gray-600">Enter your income and debts to check eligibility</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Inputs */}
                <div className="space-y-6">
                  {/* Income */}
                  <div>
                    <label htmlFor="gross_income" className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Monthly Gross Income (RM) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="gross_income"
                      placeholder="e.g., 8,000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(formatNumberWithCommas(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">Your salary before EPF/tax deductions</p>
                  </div>

                  {/* Existing Commitments */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Debt Payments</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="home_loan" className="block text-xs text-gray-600 mb-1">
                          <Home className="w-3 h-3 inline mr-1" />
                          Current Home Loan (RM)
                        </label>
                        <input
                          type="text"
                          id="home_loan"
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          value={homeLoan}
                          onChange={(e) => setHomeLoan(formatNumberWithCommas(e.target.value))}
                        />
                      </div>
                      <div>
                        <label htmlFor="car_loan" className="block text-xs text-gray-600 mb-1">
                          <Car className="w-3 h-3 inline mr-1" />
                          Car Loan (RM)
                        </label>
                        <input
                          type="text"
                          id="car_loan"
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          value={carLoan}
                          onChange={(e) => setCarLoan(formatNumberWithCommas(e.target.value))}
                        />
                      </div>
                      <div>
                        <label htmlFor="personal_loan" className="block text-xs text-gray-600 mb-1">
                          <Wallet className="w-3 h-3 inline mr-1" />
                          Personal Loan (RM)
                        </label>
                        <input
                          type="text"
                          id="personal_loan"
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          value={personalLoan}
                          onChange={(e) => setPersonalLoan(formatNumberWithCommas(e.target.value))}
                        />
                      </div>
                      <div>
                        <label htmlFor="credit_card" className="block text-xs text-gray-600 mb-1">
                          <CreditCard className="w-3 h-3 inline mr-1" />
                          Credit Card Min Payment (RM)
                        </label>
                        <input
                          type="text"
                          id="credit_card"
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          value={creditCard}
                          onChange={(e) => setCreditCard(formatNumberWithCommas(e.target.value))}
                        />
                        <p className="text-xs text-gray-400 mt-0.5">Usually 5% of outstanding balance</p>
                      </div>
                      <div>
                        <label htmlFor="other_loans" className="block text-xs text-gray-600 mb-1">
                          Other Monthly Commitments (RM)
                        </label>
                        <input
                          type="text"
                          id="other_loans"
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          value={otherLoans}
                          onChange={(e) => setOtherLoans(formatNumberWithCommas(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* New Loan Simulation */}
                  <div className="pt-4 border-t border-gray-200">
                    <label htmlFor="new_loan" className="block text-sm font-medium text-gray-700 mb-2">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      New Loan Monthly Payment (RM) <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="new_loan"
                      placeholder="e.g., 2,500"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      value={newLoanPayment}
                      onChange={(e) => setNewLoanPayment(formatNumberWithCommas(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter to simulate refinance impact on DSR</p>
                  </div>
                </div>

                {/* Right: Results */}
                <div>
                  {hasInput ? (
                    <div className="space-y-4">
                      {/* Current DSR */}
                      <div className={`${currentStatus.bgColor} ${currentStatus.borderColor} border rounded-xl p-5`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Current DSR</span>
                          <currentStatus.icon className={`w-5 h-5 ${currentStatus.textColor}`} />
                        </div>
                        <p className={`text-4xl font-bold ${currentStatus.textColor}`}>
                          {currentDSR.toFixed(1)}%
                        </p>
                        <p className={`text-sm ${currentStatus.textColor} mt-1`}>
                          {currentStatus.status} - {currentStatus.message}
                        </p>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            Total monthly debt: <strong>RM {totalCurrentDebt.toLocaleString()}</strong>
                          </p>
                        </div>
                      </div>

                      {/* New DSR (if simulating) */}
                      {newLoanPaymentNum > 0 && (
                        <div className={`${newStatus.bgColor} ${newStatus.borderColor} border rounded-xl p-5`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">New DSR (After Refinance)</span>
                            <newStatus.icon className={`w-5 h-5 ${newStatus.textColor}`} />
                          </div>
                          <p className={`text-4xl font-bold ${newStatus.textColor}`}>
                            {newDSR.toFixed(1)}%
                          </p>
                          <p className={`text-sm ${newStatus.textColor} mt-1`}>
                            {newStatus.status} - {newStatus.message}
                          </p>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-600">
                              New total monthly debt: <strong>RM {totalNewDebt.toLocaleString()}</strong>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Max Loan Info */}
                      <div className="bg-white rounded-xl p-5 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Maximum Additional Monthly Payment
                        </h4>
                        <p className="text-2xl font-bold text-blue-600">
                          RM {Math.max(0, maxMonthlyPayment).toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Based on 70% DSR limit with your current debts
                        </p>
                      </div>

                      {/* DSR Breakdown */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <details className="text-sm">
                          <summary className="cursor-pointer font-medium text-gray-700 hover:text-blue-600">
                            See calculation breakdown
                          </summary>
                          <div className="mt-3 space-y-1 text-gray-600">
                            <p>Monthly Income: <strong>RM {grossIncomeNum.toLocaleString()}</strong></p>
                            <p>Total Monthly Debt: <strong>RM {totalCurrentDebt.toLocaleString()}</strong></p>
                            <p>DSR Formula: (RM {totalCurrentDebt.toLocaleString()} ÷ RM {grossIncomeNum.toLocaleString()}) × 100</p>
                            <p>Current DSR: <strong className={currentStatus.textColor}>{currentDSR.toFixed(1)}%</strong></p>
                          </div>
                        </details>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
                      >
                        Get Personalized Assessment
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-8 border border-gray-200 text-center h-full flex flex-col justify-center">
                      <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Enter your monthly income to calculate your DSR</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* What is DSR */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What is DSR (Debt Service Ratio)?
            </h2>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Simple Explanation
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>DSR</strong> measures how much of your income goes toward paying debts each month.
                Banks use this to determine if you can afford a new loan.
              </p>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-center font-mono text-lg">
                  DSR = (Total Monthly Debt ÷ Monthly Income) × 100
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Why Banks Use DSR</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Ensures you can afford loan repayments
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Leaves room for living expenses
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Reduces risk of default
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Required by Bank Negara guidelines
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">DSR Thresholds</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Below 60%</span>
                    <span className="text-green-600 font-semibold">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">60% - 70%</span>
                    <span className="text-yellow-600 font-semibold">Good</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">70% - 80%</span>
                    <span className="text-orange-600 font-semibold">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Above 80%</span>
                    <span className="text-red-600 font-semibold">High Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bank DSR Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              DSR Requirements by Bank
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold">Bank</th>
                    <th className="text-left p-4 font-semibold">Max DSR (Employed)</th>
                    <th className="text-left p-4 font-semibold">Max DSR (Self-Employed)</th>
                    <th className="text-left p-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {bankDSRData.map((bank, index) => (
                    <tr key={bank.bank} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 font-medium">{bank.bank}</td>
                      <td className="p-4">
                        <span className={bank.employed === "75%" ? "text-green-600 font-semibold" : ""}>
                          {bank.employed}
                        </span>
                      </td>
                      <td className="p-4">{bank.selfEmployed}</td>
                      <td className="p-4">
                        <Link href={bank.href} className="text-blue-600 hover:underline text-sm">
                          View Rates →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              * DSR limits are approximate and may vary based on individual credit profile and loan type. Hong Leong offers the highest DSR limit for employed applicants.
            </p>
          </section>

          {/* Mid-page CTA */}
          <div className="my-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Not Sure if You Qualify?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
              Get a personalized assessment from our refinancing experts. We&apos;ll review your full financial picture.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Get Expert Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* How to Improve DSR */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Improve Your DSR
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Pay Off Small Debts First</h3>
                    <p className="text-sm text-gray-700">
                      Clear credit cards and small personal loans. This quickly reduces your monthly commitments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Consolidate High-Interest Debt</h3>
                    <p className="text-sm text-gray-700">
                      Roll multiple debts into your refinance at lower rates.
                      <Link href="/debt-consolidation-malaysia" className="text-green-600 hover:underline ml-1">
                        Learn more →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Add a Co-Borrower</h3>
                    <p className="text-sm text-gray-700">
                      Adding a spouse or family member combines incomes, effectively lowering your DSR.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Choose Longer Tenure</h3>
                    <p className="text-sm text-gray-700">
                      Extending your loan tenure reduces monthly payments, improving DSR (though you&apos;ll pay more interest overall).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Document All Income</h3>
                    <p className="text-sm text-gray-700">
                      Include overtime, bonuses, rental income, and side income. Higher documented income = lower DSR.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Close Unused Credit Cards</h3>
                    <p className="text-sm text-gray-700">
                      Some banks count credit limit as potential debt. Closing unused cards can help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DSR for Refinancing vs New Loan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              DSR for Refinancing vs New Loan
            </h2>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                Refinancing Often Improves Your DSR
              </h3>
              <p className="text-gray-700 mb-4">
                When you refinance to a lower interest rate, your monthly payment decreases. This means your DSR goes down,
                potentially allowing you to qualify for additional financing or cash-out.
              </p>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-gray-900 mb-3">Example:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-red-700 mb-2">Before Refinance</p>
                    <p className="text-gray-700">Loan: RM500,000 @ 5%</p>
                    <p className="text-gray-700">Monthly: RM2,923</p>
                    <p className="text-gray-700">Income: RM10,000</p>
                    <p className="text-red-700 font-semibold mt-2">DSR: 29.2%</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-700 mb-2">After Refinance</p>
                    <p className="text-gray-700">Loan: RM500,000 @ 3.8%</p>
                    <p className="text-gray-700">Monthly: RM2,569</p>
                    <p className="text-gray-700">Income: RM10,000</p>
                    <p className="text-green-700 font-semibold mt-2">DSR: 25.7% (3.5% lower!)</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  This 3.5% DSR reduction could allow for additional financing of up to RM350/month in new commitments.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About DSR
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

          {/* Related Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Calculators & Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/calculator"
                className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-blue-900">Refinance Calculator</h3>
                <p className="text-sm text-blue-700">Calculate monthly savings from refinancing</p>
              </Link>
              <Link
                href="/cash-out-calculator"
                className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <h3 className="font-semibold text-purple-900">Cash Out Calculator</h3>
                <p className="text-sm text-purple-700">See how much equity you can access</p>
              </Link>
              <Link
                href="/debt-consolidation-calculator"
                className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-green-900">Debt Consolidation Calculator</h3>
                <p className="text-sm text-green-700">Calculate savings from combining debts</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure About Your Eligibility?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get expert assessment from our refinancing specialists. We&apos;ll review your full financial situation.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Get Expert Assessment
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
              <LeadForm variant="modal" source="dsr-calculator" />
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
            name: `DSR Calculator Malaysia ${currentYear}`,
            description: "Free DSR calculator for Malaysia. Check if your Debt Service Ratio qualifies you for home loan refinancing.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "MYR",
            },
            author: {
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
        text="Check your DSR eligibility"
        buttonText="Get Assessment"
      />
    </>
  );
}
