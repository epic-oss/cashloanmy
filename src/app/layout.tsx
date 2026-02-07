import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingSocialProof from "@/components/FloatingSocialProof";
import BackToTop from "@/components/BackToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LeadFormProvider } from "@/context/LeadFormContext";
import LeadFormModal from "@/components/LeadFormModal";

const inter = Inter({ subsets: ["latin"] });

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
  icons: {
    icon: "/logo-icon.png",
  },
  verification: {
    google: "srm1R4qtShaH9kv5s0kr-D3TdlxDr8-3uxuEW2RfnsE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LeadFormProvider>
          <GoogleAnalytics />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingCTA />
          <FloatingSocialProof />
          <BackToTop />
          <LeadFormModal />
          <SpeedInsights />
        </LeadFormProvider>
      </body>
    </html>
  );
}
