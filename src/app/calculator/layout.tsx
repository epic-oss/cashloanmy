import type { Metadata } from "next";

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Cash Loan Calculator Malaysia ${currentYear} — Calculate Your Monthly Repayment | CashLoanMY`,
  description: "Free cash loan calculator. Calculate your monthly repayment, total interest, and find out how much you can afford before applying.",
  keywords: "cash loan calculator Malaysia, personal loan calculator, monthly repayment calculator, pinjaman peribadi kalkulator",
  openGraph: {
    title: `Cash Loan Calculator Malaysia ${currentYear} — Calculate Your Monthly Repayment`,
    description: "Free cash loan calculator. Calculate your monthly repayment, total interest, and find out how much you can afford before applying.",
    type: "website",
    locale: "en_MY",
    siteName: "CashLoanMY",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
