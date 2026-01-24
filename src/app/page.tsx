import { Metadata } from "next";
import CashLoanLeadForm from "@/components/CashLoanLeadForm";
import FAQ from "@/components/FAQ";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Cash Loan Malaysia ${currentYear} — Get Approved Even With Bad Credit | CashLoanMY`,
  description: "Rejected by banks? We help Malaysians with bad credit or low income get approved for cash loans through proper channels. Free consultation.",
  keywords: "cash loan Malaysia, personal loan rejected, bad credit loan, low income loan, loan approval help, pinjaman peribadi",
  openGraph: {
    title: `Cash Loan Malaysia ${currentYear} — Get Approved Even With Bad Credit | CashLoanMY`,
    description: "Rejected by banks? We help Malaysians with bad credit or low income get approved for cash loans through proper channels. Free consultation.",
    type: "website",
    locale: "en_MY",
    siteName: "CashLoanMY",
  },
};

const cashLoanFaqs = [
  {
    question: "I was rejected by a bank. Can you still help?",
    answer:
      "Yes, that's exactly who we help. Many people get rejected because of incomplete documents, poor presentation of income, or not knowing which bank suits their profile. We analyze why you were rejected and guide you to reapply properly — or find a bank that's more suitable for your situation.",
  },
  {
    question: "Is this a licensed money lender (ah long)?",
    answer:
      "No, absolutely not. We do NOT lend money. We are a consultation service that helps you get approved by legitimate, licensed banks and financial institutions in Malaysia. We never charge interest or give out loans ourselves.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Once your documents are properly prepared, bank approval typically takes 3-7 working days. The entire process from consultation to disbursement usually takes 2-4 weeks, depending on how quickly you can provide the required documents.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Basic requirements include: MyKad, 3-6 months bank statements, income proof (payslips for employed, business documents for self-employed), and EPF statement. We'll guide you on exactly what's needed based on your situation.",
  },
  {
    question: "Is there any fee for consultation?",
    answer:
      "Our initial consultation is 100% free. We review your profile, explain your options, and tell you honestly if we can help. If you decide to proceed, we only earn a referral fee from the bank upon successful approval — you pay nothing extra.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Rejected by Banks?{" "}
                <span className="text-secondary-400">We Help You Get Approved</span>
              </h1>
              <p className="text-xl text-gray-300 mt-6">
                Free consultation for Malaysians struggling with loan approval. We review your profile and guide you through the right process.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Licensed Banks Only</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No Hidden Fees</span>
                </div>
              </div>
            </div>

            <div id="quote-form">
              <CashLoanLeadForm variant="hero" source="homepage-hero" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Simple 3-step process to get you approved
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Us Your Situation",
                description: "Fill in basic details about your loan needs and current situation. It only takes 2 minutes.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Free Profile Review",
                description: "Our specialists analyze why banks reject you and identify the best approach to fix it.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Get Approved",
                description: "We guide you through the application with proper documentation to maximize approval chances.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 h-full">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Who We Help</h2>
            <p className="section-subtitle">
              If any of these sound like you, we can help
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Bad Credit Score",
                description: "CCRIS/CTOS issues? We help you understand what banks see and how to address it.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Self-Employed / Irregular Income",
                description: "Business owners and freelancers often struggle to prove income. We know how to present it properly.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Previously Rejected",
                description: "Been turned down before? We analyze the rejection and find a better path forward.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                ),
              },
              {
                title: "First-Time Borrowers",
                description: "Not sure where to start? We guide you through the entire process step by step.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                title: "Existing Debt",
                description: "High DSR from existing commitments? We help restructure and find workable solutions.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
              },
              {
                title: "Urgent Cash Needs",
                description: "Need money fast for emergencies? We know which banks process applications quickly.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why People Get Rejected */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Why Banks Reject Loan Applications</h2>
              <p className="section-subtitle mb-8">
                Understanding these common reasons is the first step to getting approved
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "DSR (Debt Service Ratio) Too High",
                    description: "Your monthly debt payments exceed what banks allow based on your income. The limit is usually 60-70%.",
                  },
                  {
                    title: "Incomplete or Wrong Documents",
                    description: "Missing bank statements, unclear income proof, or submitting the wrong documents entirely.",
                  },
                  {
                    title: "Poor Credit History",
                    description: "Late payments, defaults, or legal cases showing in CCRIS/CTOS reports.",
                  },
                  {
                    title: "Income Not Properly Presented",
                    description: "Self-employed? Commissions? Side income? Banks need to see it in a specific way.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">We Can Help You:</h3>
                <ul className="space-y-3">
                  {[
                    "Analyze your CCRIS/CTOS report",
                    "Calculate your actual DSR",
                    "Prepare documents properly",
                    "Present income the right way",
                    "Choose the right bank for your profile",
                    "Maximize approval chances",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="#quote-form" className="btn-primary inline-block w-full text-center mt-6">
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={cashLoanFaqs} title="Frequently Asked Questions" />

      {/* CTA Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Getting Rejected. Get Help Today.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Thousands of Malaysians have been in your situation. Let us help you find a way forward.
          </p>
          <Link href="#quote-form" className="btn-primary inline-block text-lg px-8 py-4 bg-secondary-500 hover:bg-secondary-600">
            Get Free Consultation Now
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            No obligation. No hidden fees. Just honest advice.
          </p>
        </div>
      </section>

      <BackToTop />
    </>
  );
}
