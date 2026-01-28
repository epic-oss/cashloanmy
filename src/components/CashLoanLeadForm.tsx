"use client";

import { useState } from "react";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";

interface CashLoanLeadFormProps {
  variant?: "hero" | "inline";
  source?: string;
}

const employmentTypes = [
  "Full-time employee",
  "Self-employed / Business owner",
  "Part-time / Gig worker",
  "Freelancer",
  "Currently unemployed",
  "Retiree",
];

const loanPurposes = [
  "Debt consolidation",
  "Emergency / Medical",
  "Business capital",
  "Education",
  "Home renovation",
  "Wedding / Event",
  "Other",
];

export default function CashLoanLeadForm({
  variant = "hero",
  source = "homepage",
}: CashLoanLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    loanAmount: "",
    employmentType: "",
    loanPurpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validation
    if (!formData.name || !formData.phone || !formData.loanAmount || !formData.employmentType) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Phone validation (Malaysian format)
    const phoneRegex = /^(\+?6?01)[0-9]{8,9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s|-/g, ""))) {
      setError("Please enter a valid Malaysian phone number");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        "Timestamp": new Date().toISOString(),
        "Name": formData.name,
        "WhatsApp": formData.phone.replace(/\s|-/g, ""),
        "Loan Amount": stripCommas(formData.loanAmount),
        "Employment Type": formData.employmentType,
        "Purpose": formData.loanPurpose || "",
        "Lead Type": "cash_loan",
        "Source Site": "CashLoanMY",
        "Source URL": typeof window !== "undefined" ? window.location.href : "",
      };

      const response = await fetch(
        "https://hook.us2.make.com/n6pku9e732yp4epwm1sigt42vli62ipr",
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
      // Show success even if webhook fails temporarily
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`${variant === "hero" ? "bg-white rounded-2xl shadow-xl p-8" : "p-6"} text-center`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
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
          We&apos;ve received your request. Our loan specialist will review your profile and contact you within 24 hours to discuss your options.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 bg-white";

  return (
    <form
      onSubmit={handleSubmit}
      className={`${variant === "hero" ? "bg-white rounded-2xl shadow-xl p-6 md:p-8" : ""}`}
    >
      {variant === "hero" && (
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Get Free Consultation
        </h3>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
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
            WhatsApp Number *
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="e.g., 012-3456789"
            className={inputClasses}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="loan_amount" className="block text-sm font-medium text-gray-700 mb-1">
            How much do you need? (RM) *
          </label>
          <input
            type="text"
            id="loan_amount"
            placeholder="e.g., 30,000"
            className={inputClasses}
            value={formData.loanAmount}
            onChange={(e) => {
              const formatted = formatNumberWithCommas(e.target.value);
              setFormData({ ...formData, loanAmount: formatted });
            }}
          />
        </div>

        <div>
          <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-1">
            Employment Type *
          </label>
          <select
            id="employment_type"
            className={`${inputClasses} text-gray-900 bg-white`}
            value={formData.employmentType}
            onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
          >
            <option value="" className="text-gray-900">Select your employment type</option>
            {employmentTypes.map((type) => (
              <option key={type} value={type} className="text-gray-900">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="loan_purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Loan (Optional)
          </label>
          <select
            id="loan_purpose"
            className={`${inputClasses} text-gray-900 bg-white`}
            value={formData.loanPurpose}
            onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
          >
            <option value="" className="text-gray-900">Select purpose</option>
            {loanPurposes.map((purpose) => (
              <option key={purpose} value={purpose} className="text-gray-900">
                {purpose}
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
          className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
            "Get Free Consultation"
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Your information is secure. We only work with licensed banks and financial institutions.
      </p>
    </form>
  );
}
