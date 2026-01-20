import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan Refinancing Calculator Malaysia | Calculate Your Savings",
  description: "Free home loan refinancing calculator for Malaysia. Calculate how much you could save monthly by refinancing your mortgage with better interest rates.",
  keywords: "home loan calculator Malaysia, refinancing calculator, mortgage calculator, housing loan calculator, refinance savings calculator",
  openGraph: {
    title: "Home Loan Refinancing Calculator | RefinanceHomeLoanMY",
    description: "Calculate your potential savings from refinancing your home loan. Free calculator for Malaysian homeowners.",
    type: "website",
    locale: "en_MY",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
