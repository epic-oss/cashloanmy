import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Consolidation Calculator Malaysia 2026 | See Your Savings",
  description: "Free debt consolidation calculator. Calculate how much you can save by consolidating credit cards, personal loans, and other high-interest debt into one low payment.",
  openGraph: {
    title: "Debt Consolidation Calculator Malaysia 2026 | See Your Savings",
    description: "Calculate how much you can save by consolidating your debts. Compare credit card rates (18%) vs cash-out refinance (4%).",
    type: "website",
  },
};

export default function DebtConsolidationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
