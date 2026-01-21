import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Refinance Home Loan Malaysia ${currentYear} - Compare Rates & Save`,
  description: `Compare refinance home loan rates from Malaysia's top banks in ${currentYear}. Calculate your savings and get free quotes. Save RM500+/month on your mortgage.`,
  keywords: "refinance home loan Malaysia, home loan refinancing, mortgage refinance, housing loan, Maybank home loan, CIMB home loan, Public Bank mortgage",
  openGraph: {
    title: `Refinance Home Loan Malaysia ${currentYear} - Compare Rates & Save`,
    description: `Compare refinance home loan rates from Malaysia's top banks in ${currentYear}. Calculate your savings and get free quotes. Save RM500+/month on your mortgage.`,
    type: "website",
    locale: "en_MY",
    siteName: "RefinanceHomeLoanMY",
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
        <SpeedInsights />
      </body>
    </html>
  );
}
