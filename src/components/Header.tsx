"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const calculatorData = {
  items: [
    { name: "Refinance Calculator", href: "/calculator" },
    { name: "Cash Out Calculator", href: "/cash-out-calculator" },
    { name: "Debt Consolidation Calculator", href: "/debt-consolidation-calculator" },
    { name: "DSR Calculator", href: "/dsr-calculator" },
  ],
};

const debtConsolidationData = {
  items: [
    { name: "Debt Consolidation Guide", href: "/debt-consolidation-malaysia" },
    { name: "Compare Options", href: "/debt-consolidation-options" },
    { name: "Personal Loan Option", href: "/personal-loan-debt-consolidation" },
    { name: "Find Lenders", href: "/debt-consolidation-lenders-malaysia" },
    { name: "Calculator", href: "/debt-consolidation-calculator" },
    { name: "Penyatuan Hutang (BM)", href: "/penyatuan-hutang-malaysia" },
  ],
};

const guidesData = {
  ms: {
    label: "Bahasa Malaysia",
    items: [
      { name: "Bank Terbaik Refinance", href: "/bank-terbaik-refinance-rumah", active: true },
      { name: "Kelebihan & Keburukan", href: "/kelebihan-keburukan-refinance-rumah", active: true },
      { name: "Contoh Kiraan", href: "/contoh-kiraan-refinance-rumah", active: true },
      { name: "Dokumen Diperlukan", href: "/dokumen-refinance-rumah", active: true },
      { name: "Bila Boleh Refinance", href: "/berapa-tahun-boleh-refinance-rumah", active: true },
    ],
  },
  en: {
    label: "English",
    items: [
      { name: "Best Refinance Banks", href: "/en/best-refinance-banks", active: true },
      { name: "Pros & Cons", href: "/en/pros-cons-refinancing", active: true },
      { name: "Calculation Examples", href: "/en/refinance-calculation-examples", active: true },
      { name: "Documents Required", href: "/en/documents-required", active: true },
      { name: "When to Refinance", href: "/en/when-to-refinance", active: true },
    ],
  },
  zh: {
    label: "中文",
    comingSoon: false,
    items: [
      { name: "什么是再融资", href: "/cn/shenme-shi-refinance", active: true },
      { name: "好处与坏处", href: "/cn/refinance-haochu-huaichu", active: true },
      { name: "所需资料", href: "/cn/refinance-xuyao-ziliao", active: true },
      { name: "多久可以Refinance", href: "/cn/duojiu-keyi-refinance", active: true },
      { name: "最佳银行", href: "/cn/zuijia-refinance-yinhang", active: true },
    ],
  },
  banks: {
    label: "Banks",
    items: [
      { name: "Maybank", href: "/maybank-refinance-home-loan", active: true },
      { name: "CIMB", href: "/cimb-refinance-home-loan", active: true },
      { name: "Public Bank", href: "/public-bank-refinance-home-loan", active: true },
      { name: "RHB", href: "/rhb-refinance-home-loan", active: true },
      { name: "Hong Leong", href: "/hong-leong-refinance-home-loan", active: true },
      { name: "AmBank", href: "/ambank-refinance-home-loan", active: true },
    ],
  },
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [debtOpen, setDebtOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);
  const [mobileDebtOpen, setMobileDebtOpen] = useState(false);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debtDropdownRef = useRef<HTMLDivElement>(null);
  const calcDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setGuidesOpen(false);
      }
      if (debtDropdownRef.current && !debtDropdownRef.current.contains(event.target as Node)) {
        setDebtOpen(false);
      }
      if (calcDropdownRef.current && !calcDropdownRef.current.contains(event.target as Node)) {
        setCalcOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-icon.png"
                alt="Refinance Home Loan MY"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold text-blue-900">
                Refinance Home Loan MY
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-800 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Calculator Dropdown */}
            <div className="relative" ref={calcDropdownRef}>
              <button
                onClick={() => setCalcOpen(!calcOpen)}
                onMouseEnter={() => setCalcOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-800 font-medium transition-colors"
              >
                Calculator
                <svg
                  className={`w-4 h-4 transition-transform ${calcOpen ? "rotate-180" : ""}`}
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

              {/* Calculator Dropdown Menu */}
              {calcOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
                  onMouseLeave={() => setCalcOpen(false)}
                >
                  <ul className="space-y-1">
                    {calculatorData.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 block py-2 px-3 rounded transition-colors"
                          onClick={() => setCalcOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/cash-out-refinance-malaysia"
              className="text-primary-600 hover:text-primary-800 font-semibold transition-colors"
            >
              Cash Out
            </Link>

            {/* Debt Consolidation Dropdown */}
            <div className="relative" ref={debtDropdownRef}>
              <button
                onClick={() => setDebtOpen(!debtOpen)}
                onMouseEnter={() => setDebtOpen(true)}
                className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Debt Consolidation
                <svg
                  className={`w-4 h-4 transition-transform ${debtOpen ? "rotate-180" : ""}`}
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

              {/* Debt Dropdown Menu */}
              {debtOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
                  onMouseLeave={() => setDebtOpen(false)}
                >
                  <ul className="space-y-1">
                    {debtConsolidationData.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 block py-2 px-3 rounded transition-colors"
                          onClick={() => setDebtOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Guides Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                onMouseEnter={() => setGuidesOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-800 font-medium transition-colors"
              >
                Guides
                <svg
                  className={`w-4 h-4 transition-transform ${guidesOpen ? "rotate-180" : ""}`}
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

              {/* Dropdown Menu */}
              {guidesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[750px] bg-white rounded-xl shadow-xl border border-gray-200 p-6"
                  onMouseLeave={() => setGuidesOpen(false)}
                >
                  <div className="grid grid-cols-4 gap-6">
                    {/* Bahasa Malaysia */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        {guidesData.ms.label}
                      </h3>
                      <ul className="space-y-2">
                        {guidesData.ms.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 block py-1.5 px-2 rounded transition-colors"
                              onClick={() => setGuidesOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* English */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        {guidesData.en.label}
                      </h3>
                      <ul className="space-y-2">
                        {guidesData.en.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 block py-1.5 px-2 rounded transition-colors"
                              onClick={() => setGuidesOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Chinese */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        {guidesData.zh.label}
                      </h3>
                      <ul className="space-y-2">
                        {guidesData.zh.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 block py-1.5 px-2 rounded transition-colors"
                              onClick={() => setGuidesOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Banks */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        {guidesData.banks.label}
                      </h3>
                      <ul className="space-y-2">
                        {guidesData.banks.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 block py-1.5 px-2 rounded transition-colors"
                              onClick={() => setGuidesOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Links */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href="/guides"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-700"
                      onClick={() => setGuidesOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      View All Guides
                    </Link>
                    <Link
                      href="/#quote-form"
                      className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                      onClick={() => setGuidesOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Get Free Quote
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#quote-form"
              className="btn-primary text-sm py-2 px-4"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-800 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Calculator Accordion */}
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={() => setMobileCalcOpen(!mobileCalcOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary-800 font-medium py-2"
                >
                  <span>Calculator</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileCalcOpen ? "rotate-180" : ""}`}
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

                {mobileCalcOpen && (
                  <ul className="pl-4 space-y-1 mt-2">
                    {calculatorData.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-600 hover:text-primary-600 block py-1.5"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileCalcOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                href="/cash-out-refinance-malaysia"
                className="text-primary-600 hover:text-primary-800 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cash Out
              </Link>

              {/* Mobile Debt Consolidation Accordion */}
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={() => setMobileDebtOpen(!mobileDebtOpen)}
                  className="flex items-center justify-between w-full text-green-600 hover:text-green-700 font-semibold py-2"
                >
                  <span>Debt Consolidation</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileDebtOpen ? "rotate-180" : ""}`}
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

                {mobileDebtOpen && (
                  <ul className="pl-4 space-y-1 mt-2">
                    {debtConsolidationData.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-600 hover:text-green-600 block py-1.5"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileDebtOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Mobile Guides Accordion */}
              <div className="border-t border-b border-gray-100 py-2">
                <button
                  onClick={() => setMobileGuidesOpen(!mobileGuidesOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary-800 font-medium py-2"
                >
                  <span>Guides</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileGuidesOpen ? "rotate-180" : ""}`}
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

                {mobileGuidesOpen && (
                  <div className="pl-4 space-y-4 mt-2">
                    {/* Bahasa Malaysia */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        {guidesData.ms.label}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {guidesData.ms.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 block py-1.5"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileGuidesOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* English */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        {guidesData.en.label}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {guidesData.en.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 block py-1.5"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileGuidesOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Chinese */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        {guidesData.zh.label}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {guidesData.zh.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 block py-1.5"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileGuidesOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Banks */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        {guidesData.banks.label}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {guidesData.banks.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-primary-600 block py-1.5"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileGuidesOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* View All Guides Link */}
                    <div className="pt-2 border-t border-gray-100">
                      <Link
                        href="/guides"
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 block py-2"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileGuidesOpen(false);
                        }}
                      >
                        View All Guides →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/#quote-form"
                className="btn-primary text-center text-sm py-2 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
