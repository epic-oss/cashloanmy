import LeadForm from "@/components/LeadForm";
import TrustBadges from "@/components/TrustBadges";
import BankLogos from "@/components/BankLogos";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import SocialProof from "@/components/SocialProof";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SocialProof />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Refinance Your Home Loan &{" "}
                <span className="text-secondary-400">Save RM500+/Month</span>
              </h1>
              <p className="text-xl text-gray-300 mt-6">
                Compare refinancing rates from Malaysia&apos;s top banks. Lower your monthly payments
                and save thousands over your loan tenure.
              </p>
              <div className="mt-8">
                <TrustBadges />
              </div>
            </div>

            <div id="quote-form">
              <LeadForm variant="hero" source="homepage-hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Bank Logos */}
      <BankLogos />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Refinance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Refinance Your Home Loan?</h2>
            <p className="section-subtitle">
              Discover the benefits of refinancing with better rates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Lower Monthly Payments",
                description: "Reduce your monthly mortgage by RM300-700 with a lower interest rate",
                icon: "💰",
              },
              {
                title: "Save Over Loan Tenure",
                description: "Total savings of RM50,000-150,000 over your remaining loan period",
                icon: "📈",
              },
              {
                title: "Cash Out Option",
                description: "Access your home equity for renovations, education, or investments",
                icon: "🏦",
              },
              {
                title: "Flexible Terms",
                description: "Adjust your loan tenure or switch between fixed and floating rates",
                icon: "⚡",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Calculate Your Potential Savings</h2>
              <p className="section-subtitle">
                Use our free refinancing calculator to see how much you could save monthly and over your loan tenure.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Instant calculation based on current market rates",
                  "Compare scenarios with different loan amounts",
                  "See total interest savings over loan tenure",
                  "No commitment required",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/calculator" className="btn-primary inline-block mt-8">
                Try the Calculator
              </Link>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Savings Preview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Current Rate</span>
                    <span className="font-semibold text-gray-900">4.75%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">New Rate (as low as)</span>
                    <span className="font-semibold text-secondary-600">3.85%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Monthly Savings</span>
                    <span className="font-semibold text-secondary-600">~RM540</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">20-Year Savings</span>
                    <span className="font-bold text-2xl text-secondary-600">~RM129,600</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  *Based on RM500,000 loan over 20 years. Actual rates may vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of Malaysians who have reduced their mortgage payments through smart refinancing
          </p>
          <Link href="#quote-form" className="btn-primary inline-block text-lg px-8 py-4">
            Get Your Free Quote Now
          </Link>
        </div>
      </section>
    </>
  );
}
