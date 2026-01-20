import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Refinance Home Loan Malaysia | Save RM500+/Month on Your Mortgage",
  description: "Compare home loan refinancing rates from Malaysia's top banks. Maybank, CIMB, Public Bank, RHB, Hong Leong & more. Free consultation. Save thousands on your mortgage!",
  keywords: "refinance home loan Malaysia, home loan refinancing, mortgage refinance, housing loan, Maybank home loan, CIMB home loan, Public Bank mortgage",
  openGraph: {
    title: "Refinance Home Loan Malaysia | RefinanceHomeLoanMY",
    description: "Compare home loan refinancing rates from top banks. Save RM500+/month on your mortgage!",
    type: "website",
    locale: "en_MY",
    siteName: "RefinanceHomeLoanMY",
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
