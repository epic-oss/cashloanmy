"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const messages = [
  { text: "approved this month", highlight: "RM2.3M" },
  { text: "people got approved this week", highlight: "47" },
  { text: "approved today", highlight: "RM85,000" },
  { text: "Helping Malaysians since", highlight: "2024" },
];

export default function FloatingSocialProof() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Hide on homepage since form is already visible
  if (pathname === "/") {
    return null;
  }

  const current = messages[currentIndex];

  return (
    <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-40 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-lg px-3 py-2 md:px-4 md:py-2.5">
      <div className="flex items-center gap-2">
        {/* Checkmark icon */}
        <svg
          className="w-4 h-4 text-green-500 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        {/* Text */}
        <p className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
          <span className="font-bold text-green-600">{current.highlight}</span>{" "}
          {current.text}
        </p>
      </div>
    </div>
  );
}
