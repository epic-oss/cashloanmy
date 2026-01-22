import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    debtConsolidation: [
      { name: "Debt Consolidation Guide", href: "/debt-consolidation-malaysia" },
      { name: "Compare Options", href: "/debt-consolidation-options" },
      { name: "Personal Loan Option", href: "/personal-loan-debt-consolidation" },
      { name: "Find Lenders", href: "/debt-consolidation-lenders-malaysia" },
      { name: "Penyatuan Hutang (BM)", href: "/penyatuan-hutang-malaysia" },
      { name: "Calculator", href: "/debt-consolidation-calculator" },
    ],
    resources: [
      { name: "Cash Out Refinance", href: "/cash-out-refinance-malaysia" },
      { name: "Refinance Calculator", href: "/calculator" },
      { name: "Cash Out Calculator", href: "/cash-out-calculator" },
      { name: "DSR Calculator", href: "/dsr-calculator" },
    ],
    banks: [
      { name: "Maybank Refinance", href: "/maybank-refinance-home-loan" },
      { name: "CIMB Refinance", href: "/cimb-refinance-home-loan" },
      { name: "Public Bank Refinance", href: "/public-bank-refinance-home-loan" },
      { name: "RHB Refinance", href: "/rhb-refinance-home-loan" },
      { name: "Hong Leong Refinance", href: "/hong-leong-refinance-home-loan" },
      { name: "AmBank Refinance", href: "/ambank-refinance-home-loan" },
    ],
    englishGuides: [
      { name: "Best Banks", href: "/en/best-refinance-banks" },
      { name: "Pros & Cons", href: "/en/pros-cons-refinancing" },
      { name: "Calculation Examples", href: "/en/refinance-calculation-examples" },
      { name: "Documents Required", href: "/en/documents-required" },
      { name: "When to Refinance", href: "/en/when-to-refinance" },
    ],
    panduan: [
      { name: "Bank Terbaik Refinance", href: "/bank-terbaik-refinance-rumah" },
      { name: "Kelebihan & Keburukan", href: "/kelebihan-keburukan-refinance-rumah" },
      { name: "Contoh Kiraan", href: "/contoh-kiraan-refinance-rumah" },
      { name: "Dokumen Diperlukan", href: "/dokumen-refinance-rumah" },
      { name: "Bila Boleh Refinance", href: "/berapa-tahun-boleh-refinance-rumah" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo-icon.png"
                alt="Refinance Home Loan MY"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-white font-semibold">Refinance Home Loan MY</span>
            </div>
            <p className="text-sm text-gray-400">
              Helping Malaysians save money on their home loans through smart refinancing solutions.
            </p>
          </div>

          {/* Debt Consolidation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Debt Consolidation</h3>
            <ul className="space-y-2">
              {footerLinks.debtConsolidation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Banks */}
          <div>
            <h3 className="text-white font-semibold mb-4">Banks</h3>
            <ul className="space-y-2">
              {footerLinks.banks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* English Guides */}
          <div>
            <h3 className="text-white font-semibold mb-4">English Guides</h3>
            <ul className="space-y-2">
              {footerLinks.englishGuides.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Panduan */}
          <div>
            <h3 className="text-white font-semibold mb-4">Panduan</h3>
            <ul className="space-y-2">
              {footerLinks.panduan.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} RefinanceHomeLoanMY. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Rates updated: {SITE_CONFIG.lastUpdatedEn}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
            RefinanceHomeLoanMY is a comparison platform. We work with licensed banks and financial institutions to help you find the best refinancing rates.
            Loan products are provided by respective banks and financial institutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
