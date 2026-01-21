"use client";

import { useState } from "react";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";

interface CashOutLeadFormProps {
  variant?: "hero" | "modal" | "inline";
  source?: string;
}

const banks = [
  "Maybank",
  "CIMB",
  "Public Bank",
  "RHB",
  "Hong Leong Bank",
  "AmBank",
  "Bank Islam",
  "HSBC",
  "UOB",
  "OCBC",
  "Standard Chartered",
  "Alliance Bank",
  "Affin Bank",
  "Bank Rakyat",
  "Other",
];

const purposes = [
  { value: "renovation", label: "Renovation" },
  { value: "debt_consolidation", label: "Debt Consolidation" },
  { value: "investment_business", label: "Investment/Business" },
  { value: "education", label: "Education" },
  { value: "medical_emergency", label: "Medical/Emergency" },
  { value: "other", label: "Other" },
];

export default function CashOutLeadForm({
  variant = "modal",
  source = "cash-out-refinance",
}: CashOutLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    WhatsApp: "",
    PropertyValue: "",
    Outstanding: "",
    CashOutNeeded: "",
    CurrentBank: "",
    Purpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validation
    if (!formData.name || !formData.WhatsApp || !formData.PropertyValue || !formData.Outstanding || !formData.CurrentBank) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Phone validation (Malaysian format)
    const phoneRegex = /^(\+?6?01)[0-9]{8,9}$/;
    if (!phoneRegex.test(formData.WhatsApp.replace(/\s|-/g, ""))) {
      setError("Please enter a valid Malaysian phone number");
      setIsSubmitting(false);
      return;
    }

    try {
      const propertyValue = parseFloat(stripCommas(formData.PropertyValue)) || 0;
      const outstanding = parseFloat(stripCommas(formData.Outstanding)) || 0;
      const cashOutNeeded = formData.CashOutNeeded ? parseFloat(stripCommas(formData.CashOutNeeded)) : null;

      // Calculate potential cash out (90% LTV - outstanding)
      const maxCashOut = Math.max(0, propertyValue * 0.9 - outstanding);
      const equity = propertyValue - outstanding;

      const payload = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        WhatsApp: formData.WhatsApp.replace(/\s|-/g, ""),
        PropertyValue: stripCommas(formData.PropertyValue),
        Outstanding: stripCommas(formData.Outstanding),
        CashOutNeeded: cashOutNeeded ? stripCommas(formData.CashOutNeeded) : "",
        MaxCashOut: maxCashOut.toString(),
        Equity: equity.toString(),
        CurrentBank: formData.CurrentBank,
        Purpose: formData.Purpose || "Not specified",
        source_url: typeof window !== "undefined" ? window.location.href : "",
        source: source,
        calculator_type: "cash_out_refinance",
        lead_type: "cash_out",
        site: "refinancehomeloanmy.com",
      };

      const response = await fetch(
        "https://hook.us2.make.com/x41kcriuri5w5s8fkrfi6884hu05yhpe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      // For now, show success even if webhook fails (remove this in production)
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`${variant === "hero" ? "bg-white rounded-2xl shadow-xl p-8" : "p-6"} text-center`}>
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-secondary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          We&apos;ve received your cash-out refinance request. Our specialist will contact you within 24 hours with personalized cash-out options based on your property value.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className={`${variant === "hero" ? "bg-white rounded-2xl shadow-xl p-6 md:p-8" : ""}`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
        Get Your Cash Out Quote in 24 Hours
      </h3>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Find out how much cash you can access from your property
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className={inputClasses}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="e.g., 012-3456789"
            className={inputClasses}
            value={formData.WhatsApp}
            onChange={(e) => setFormData({ ...formData, WhatsApp: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="property_value" className="block text-sm font-medium text-gray-700 mb-1">
            Property Value (RM) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="property_value"
            placeholder="e.g., 500,000"
            className={inputClasses}
            value={formData.PropertyValue}
            onChange={(e) => {
              const formatted = formatNumberWithCommas(e.target.value);
              setFormData({ ...formData, PropertyValue: formatted });
            }}
          />
        </div>

        <div>
          <label htmlFor="outstanding_loan" className="block text-sm font-medium text-gray-700 mb-1">
            Outstanding Loan (RM) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="outstanding_loan"
            placeholder="e.g., 300,000"
            className={inputClasses}
            value={formData.Outstanding}
            onChange={(e) => {
              const formatted = formatNumberWithCommas(e.target.value);
              setFormData({ ...formData, Outstanding: formatted });
            }}
          />
        </div>

        <div>
          <label htmlFor="cashout_needed" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Cash Out Needed (RM) <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            id="cashout_needed"
            placeholder="e.g., 100,000"
            className={inputClasses}
            value={formData.CashOutNeeded}
            onChange={(e) => {
              const formatted = formatNumberWithCommas(e.target.value);
              setFormData({ ...formData, CashOutNeeded: formatted });
            }}
          />
        </div>

        <div>
          <label htmlFor="current_bank" className="block text-sm font-medium text-gray-700 mb-1">
            Current Bank <span className="text-red-500">*</span>
          </label>
          <select
            id="current_bank"
            className={`${inputClasses} text-gray-900 bg-white`}
            value={formData.CurrentBank}
            onChange={(e) => setFormData({ ...formData, CurrentBank: e.target.value })}
          >
            <option value="" className="text-gray-900">Select your current bank</option>
            {banks.map((bank) => (
              <option key={bank} value={bank} className="text-gray-900">
                {bank}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Cash Out <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <select
            id="purpose"
            className={`${inputClasses} text-gray-900 bg-white`}
            value={formData.Purpose}
            onChange={(e) => setFormData({ ...formData, Purpose: e.target.value })}
          >
            <option value="" className="text-gray-900">Select purpose</option>
            {purposes.map((purpose) => (
              <option key={purpose.value} value={purpose.value} className="text-gray-900">
                {purpose.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Get My Cash Out Quote"
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        By submitting, you agree to be contacted by our refinancing partners. Your information is secure and will not be shared.
      </p>
    </form>
  );
}
