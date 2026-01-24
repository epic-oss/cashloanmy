import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo-icon.png"
                alt="CashLoanMY"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-white font-semibold">CashLoanMY</span>
            </div>
            <p className="text-sm text-gray-400">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="hover:text-white transition-colors text-sm"
                >
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/#quote-form"
                  className="hover:text-white transition-colors text-sm"
                >
                  Get Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">
                Email: {SITE_CONFIG.contact.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} CashLoanMY. All rights reserved.
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
            CashLoanMY helps connect Malaysians with licensed financial institutions.
            Loan products are provided by respective banks and licensed lenders.
          </p>
        </div>
      </div>
    </footer>
  );
}
