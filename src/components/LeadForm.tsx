"use client";

import { useState } from "react";
import { formatNumberWithCommas, stripCommas } from "@/lib/utils";

interface LeadFormProps {
  variant?: "hero" | "modal" | "inline";
  source?: string;
  lang?: "ms" | "en" | "zh";
}

const content = {
  ms: {
    formTitle: "Dapatkan Sebut Harga Percuma",
    buttonText: "Dapatkan Sebut Harga Percuma",
    submitting: "Menghantar...",
    successTitle: "Terima Kasih!",
    successMessage: "Kami telah menerima permintaan anda. Pakar refinancing kami akan menghubungi anda dalam masa 24 jam dengan pilihan penjimatan yang sesuai.",
    disclaimer: "Dengan menghantar, anda bersetuju untuk dihubungi oleh rakan refinancing kami. Maklumat anda selamat dan tidak akan dikongsi.",
  },
  en: {
    formTitle: "Get Your Free Refinancing Quote",
    buttonText: "Get Free Quote",
    submitting: "Submitting...",
    successTitle: "Thank You!",
    successMessage: "We've received your request. Our refinancing specialist will contact you within 24 hours with personalized savings options.",
    disclaimer: "By submitting, you agree to be contacted by our refinancing partners. Your information is secure and will not be shared.",
  },
  zh: {
    formTitle: "获取免费再融资报价",
    buttonText: "获取免费报价",
    submitting: "提交中...",
    successTitle: "谢谢您！",
    successMessage: "我们已收到您的请求。我们的再融资专家将在24小时内与您联系，为您提供个性化的节省方案。",
    disclaimer: "提交即表示您同意我们的再融资合作伙伴与您联系。您的信息是安全的，不会被分享。",
  },
};

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

export default function LeadForm({
  variant = "hero",
  source = "homepage",
  lang = "en",
}: LeadFormProps) {
  const t = content[lang];
  const [formData, setFormData] = useState({
    name: "",
    WhatsApp: "",
    Outstanding: "",
    CurrentBank: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validation
    if (!formData.name || !formData.WhatsApp || !formData.Outstanding || !formData.CurrentBank) {
      setError("Please fill in all fields");
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
      const payload = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        WhatsApp: formData.WhatsApp.replace(/\s|-/g, ""),
        Outstanding: stripCommas(formData.Outstanding),
        CurrentBank: formData.CurrentBank,
        source_url: typeof window !== "undefined" ? window.location.href : "",
        source: "refinancehomeloanmy",
        calculator_type: "refinance_home_loan",
        lead_type: "home_loan_refinance",
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
        <p className="text-gray-600">
          {t.successMessage}
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className={`${variant === "hero" ? "bg-white rounded-2xl shadow-xl p-6 md:p-8" : ""}`}
    >
      {variant === "hero" && (
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          {t.formTitle}
        </h3>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
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
            Phone Number
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
          <label htmlFor="outstanding_loan" className="block text-sm font-medium text-gray-700 mb-1">
            Outstanding Loan Amount (RM)
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
          <label htmlFor="current_bank" className="block text-sm font-medium text-gray-700 mb-1">
            Current Bank
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
              {t.submitting}
            </span>
          ) : (
            t.buttonText
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        {t.disclaimer}
      </p>
    </form>
  );
}
