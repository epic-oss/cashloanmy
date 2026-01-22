import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refinancing & Debt Consolidation Guides Malaysia 2026 | Complete Resource Hub",
  description: "Complete guides on home loan refinancing, cash-out refinance, and debt consolidation in Malaysia. Learn everything you need to know before refinancing.",
  openGraph: {
    title: "Refinancing & Debt Consolidation Guides Malaysia 2026",
    description: "Expert guides to help you make smarter financial decisions. Complete resource hub for home loan refinancing in Malaysia.",
    type: "website",
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
