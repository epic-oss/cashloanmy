import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Up to RM500,000 Cash from Your Property | Cash Out Refinance Malaysia 2026",
  description: "Turn your home equity into cash for renovations, debt consolidation, or investments. Up to 90% LTV with rates from 3.65%. Get a free quote in 2 minutes.",
  openGraph: {
    title: "Get Up to RM500,000 Cash from Your Property",
    description: "Turn your home equity into cash. Up to 90% LTV, rates from 3.65%, 6-10 weeks processing. Get your free cash out quote now.",
    type: "website",
  },
};

export default function CashOutRefinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
