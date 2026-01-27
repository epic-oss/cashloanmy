"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-icon.png"
                alt="CashLoanMY"
                width={32}
                height={32}
                className="w-8 h-8 flex-shrink-0"
                unoptimized
              />
              <span className="text-xl font-semibold text-blue-900">
                CashLoanMY
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

            <Link
              href="/calculator"
              className="text-gray-700 hover:text-primary-800 font-medium transition-colors"
            >
              Calculator
            </Link>

            <Link
              href="/guides"
              className="text-gray-700 hover:text-primary-800 font-medium transition-colors"
            >
              Guides
            </Link>

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

              <Link
                href="/calculator"
                className="text-gray-700 hover:text-primary-800 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculator
              </Link>

              <Link
                href="/guides"
                className="text-gray-700 hover:text-primary-800 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guides
              </Link>

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
