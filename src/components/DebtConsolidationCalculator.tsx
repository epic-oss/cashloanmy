"use client";

import { useState } from "react";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";
import { Calculator, ArrowRight, TrendingDown, Percent } from "lucide-react";

export interface DebtConsolidationCalculatorValues {
  totalDebt: string;
  currentRate: number;
  monthlyPayment: string;
  yearlySavings: number;
  monthlySavings: number;
  tenYearSavings: number;
}

interface DebtConsolidationCalculatorProps {
  onGetQuote?: (values: DebtConsolidationCalculatorValues) => void;
}

const CASH_OUT_RATE = 4; // Cash-out refinance rate

const ratePresets = [
  { value: 18, label: "18% (Credit Card)", description: "Typical credit card rate" },
  { value: 15, label: "15% (Personal Loan)", description: "Average personal loan" },
  { value: 12, label: "12% (Car Loan)", description: "Vehicle financing" },
  { value: 8, label: "8% (BNPL)", description: "Buy Now Pay Later" },
  { value: 0, label: "Custom Rate", description: "Enter your own rate" },
];

export default function DebtConsolidationCalculator({ onGetQuote }: DebtConsolidationCalculatorProps) {
  const [totalDebt, setTotalDebt] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(18);
  const [customRate, setCustomRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

  const totalDebtNum = parseFloat(stripCommas(totalDebt)) || 0;
  const currentRate = selectedPreset === 0 ? (parseFloat(customRate) || 0) : selectedPreset;
  const monthlyPaymentNum = parseFloat(stripCommas(monthlyPayment)) || 0;

  // Calculations
  const currentYearlyInterest = totalDebtNum * (currentRate / 100);
  const newYearlyInterest = totalDebtNum * (CASH_OUT_RATE / 100);
  const yearlySavings = currentYearlyInterest - newYearlyInterest;
  const monthlySavings = yearlySavings / 12;
  const tenYearSavings = yearlySavings * 10;

  const hasInput = totalDebtNum > 0 && currentRate > 0;

  const handleGetQuote = () => {
    onGetQuote?.({
      totalDebt,
      currentRate,
      monthlyPayment,
      yearlySavings,
      monthlySavings,
      tenYearSavings,
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Debt Consolidation Savings Calculator</h3>
          <p className="text-sm text-gray-600">See how much you can save by consolidating your debt</p>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        {/* Total Debt Input */}
        <div>
          <label htmlFor="total_debt" className="block text-sm font-medium text-gray-700 mb-2">
            Total Debt Amount (RM) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="total_debt"
            placeholder="e.g., 50,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-lg"
            value={totalDebt}
            onChange={(e) => setTotalDebt(formatNumberWithCommas(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">Enter total of all debts you want to consolidate</p>
        </div>

        {/* Interest Rate Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Interest Rate <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {ratePresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setSelectedPreset(preset.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedPreset === preset.value
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Percent className={`w-4 h-4 ${selectedPreset === preset.value ? "text-green-600" : "text-gray-400"}`} />
                  <span className={`font-semibold ${selectedPreset === preset.value ? "text-green-700" : "text-gray-700"}`}>
                    {preset.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {selectedPreset === 0 && (
            <input
              type="number"
              placeholder="Enter rate (e.g., 10)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
            />
          )}
        </div>

        {/* Monthly Payment (Optional) */}
        <div>
          <label htmlFor="monthly_payment" className="block text-sm font-medium text-gray-700 mb-2">
            Current Monthly Payment (RM) <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            id="monthly_payment"
            placeholder="e.g., 2,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(formatNumberWithCommas(e.target.value))}
          />
        </div>
      </div>

      {/* Results */}
      {hasInput && (
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Current Situation */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Current Situation
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold text-red-700">{currentRate}% p.a.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Yearly Interest:</span>
                  <span className="font-semibold text-red-700">
                    RM {currentYearlyInterest.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                {monthlyPaymentNum > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold text-red-700">RM {monthlyPaymentNum.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* After Consolidation */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                After Cash-Out Refinance
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold text-green-700">{CASH_OUT_RATE}% p.a.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Yearly Interest:</span>
                  <span className="font-semibold text-green-700">
                    RM {newYearlyInterest.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rate Reduction:</span>
                  <span className="font-semibold text-green-700">{currentRate - CASH_OUT_RATE}% lower</span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-6 h-6" />
              <span className="font-semibold">Your Potential Savings</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <p className="text-sm text-green-100 mb-1">Monthly Savings</p>
                <p className="text-2xl font-bold">
                  RM {monthlySavings.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <p className="text-sm text-green-100 mb-1">Yearly Savings</p>
                <p className="text-2xl font-bold">
                  RM {yearlySavings.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-center p-3 bg-white/20 rounded-lg border border-white/30">
                <p className="text-sm text-green-100 mb-1">Over 10 Years</p>
                <p className="text-3xl font-bold">
                  RM {tenYearSavings.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Calculation Breakdown */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <details className="text-sm text-gray-600">
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-green-600">
                See calculation breakdown
              </summary>
              <div className="mt-2 space-y-1 pl-4">
                <p>Current yearly interest: RM {totalDebtNum.toLocaleString()} × {currentRate}% = <strong>RM {currentYearlyInterest.toLocaleString()}</strong></p>
                <p>New yearly interest: RM {totalDebtNum.toLocaleString()} × {CASH_OUT_RATE}% = <strong>RM {newYearlyInterest.toLocaleString()}</strong></p>
                <p>Yearly savings: RM {currentYearlyInterest.toLocaleString()} - RM {newYearlyInterest.toLocaleString()} = <strong className="text-green-600">RM {yearlySavings.toLocaleString()}</strong></p>
              </div>
            </details>
          </div>
        </div>
      )}

      {!hasInput && (
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 text-center">
          <p className="text-gray-500">Enter your total debt amount to see how much you can save</p>
        </div>
      )}

      <button
        onClick={handleGetQuote}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
      >
        Get Your Debt-Free Quote
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Savings shown are estimates based on interest rate difference. Actual savings depend on loan terms, fees, and your credit profile.
      </p>
    </div>
  );
}
