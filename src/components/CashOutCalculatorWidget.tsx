"use client";

import { useState } from "react";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";
import { Calculator, ArrowRight } from "lucide-react";

interface CashOutCalculatorWidgetProps {
  onGetQuote?: () => void;
}

export default function CashOutCalculatorWidget({ onGetQuote }: CashOutCalculatorWidgetProps) {
  const [propertyValue, setPropertyValue] = useState("");
  const [outstandingLoan, setOutstandingLoan] = useState("");

  const propertyValueNum = parseFloat(stripCommas(propertyValue)) || 0;
  const outstandingLoanNum = parseFloat(stripCommas(outstandingLoan)) || 0;

  const maxLoanAt90 = propertyValueNum * 0.9;
  const maxCashOut = Math.max(0, maxLoanAt90 - outstandingLoanNum);
  const equity = Math.max(0, propertyValueNum - outstandingLoanNum);

  const hasInput = propertyValueNum > 0 && outstandingLoanNum > 0;

  return (
    <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-6 md:p-8 border border-secondary-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Cash Out Calculator</h3>
          <p className="text-sm text-gray-600">Estimate your available cash-out amount</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="calc_property_value" className="block text-sm font-medium text-gray-700 mb-2">
            Property Current Value (RM)
          </label>
          <input
            type="text"
            id="calc_property_value"
            placeholder="e.g., 500,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all text-lg"
            value={propertyValue}
            onChange={(e) => setPropertyValue(formatNumberWithCommas(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="calc_outstanding" className="block text-sm font-medium text-gray-700 mb-2">
            Outstanding Loan Balance (RM)
          </label>
          <input
            type="text"
            id="calc_outstanding"
            placeholder="e.g., 300,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all text-lg"
            value={outstandingLoan}
            onChange={(e) => setOutstandingLoan(formatNumberWithCommas(e.target.value))}
          />
        </div>
      </div>

      {hasInput && (
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-secondary-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Maximum Cash Out (90% LTV)</p>
              <p className="text-3xl font-bold text-secondary-700">
                RM {maxCashOut.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Your Total Equity</p>
              <p className="text-3xl font-bold text-primary-700">
                RM {equity.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Calculation:</strong></p>
              <p>Max Loan (90% of RM {propertyValueNum.toLocaleString()}) = RM {maxLoanAt90.toLocaleString()}</p>
              <p>Minus Outstanding (RM {outstandingLoanNum.toLocaleString()}) = <strong className="text-secondary-700">RM {maxCashOut.toLocaleString()}</strong></p>
            </div>
          </div>

          {maxCashOut <= 0 && outstandingLoanNum > 0 && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Your outstanding loan is close to or exceeds the maximum loan amount at 90% LTV.
                You may have limited cash-out available. Consider a rate-only refinance to save on interest instead.
              </p>
            </div>
          )}
        </div>
      )}

      {!hasInput && (
        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 text-center">
          <p className="text-gray-500">Enter your property value and outstanding loan to see your potential cash-out amount</p>
        </div>
      )}

      <button
        onClick={onGetQuote}
        className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
      >
        Get Exact Quote from Banks
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        This is an estimate. Actual amount depends on bank valuation, credit assessment, and BNM guidelines.
      </p>
    </div>
  );
}
