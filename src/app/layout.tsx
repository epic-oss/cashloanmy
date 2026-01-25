import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  verification: {
    google: "hiucUvRoGjgciw2b04tBl30F0cAbNPnPYcpFiQsVg2A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo-icon.png" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingCTA />
        <SpeedInsights />
      </body>
    </html>
  );
}
