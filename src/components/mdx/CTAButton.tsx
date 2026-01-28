"use client";

import { useLeadForm } from "@/context/LeadFormContext";

interface CTAButtonProps {
  text: string;
}

export default function CTAButton({ text }: CTAButtonProps) {
  const { openModal } = useLeadForm();

  return (
    <button
      onClick={openModal}
      className="inline-block bg-white text-primary-700 font-semibold px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors"
    >
      {text}
    </button>
  );
}
