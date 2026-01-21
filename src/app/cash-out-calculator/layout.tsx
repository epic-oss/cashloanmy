import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Out Refinance Calculator Malaysia 2026 | Calculate Your Equity",
  description: "Free cash-out refinance calculator. Find out how much cash you can access from your property equity. Calculate max LTV and get quotes from Malaysian banks.",
  openGraph: {
    title: "Cash Out Refinance Calculator Malaysia 2026",
    description: "Calculate how much cash you can access from your property equity. Free calculator with instant results.",
    type: "website",
  },
};

export default function CashOutCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
