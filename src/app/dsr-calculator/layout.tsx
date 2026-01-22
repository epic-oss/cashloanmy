import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSR Calculator Malaysia 2026 - Check Your Refinancing Eligibility",
  description: "Free DSR calculator for Malaysia. Check if your Debt Service Ratio qualifies you for home loan refinancing. Banks typically require DSR below 70%.",
  openGraph: {
    title: "DSR Calculator Malaysia 2026 - Check Your Refinancing Eligibility",
    description: "Check your Debt Service Ratio (DSR) in 30 seconds. Find out if you qualify for home loan refinancing in Malaysia.",
    type: "website",
  },
};

export default function DSRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
