"use client";

import Link from "next/link";

export default function FloatingCTA() {
  return (
    <Link
      href="/#quote-form"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-full flex items-center gap-2 px-4 py-3 md:px-6 md:py-3"
    >
      {/* Icon - always visible */}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      {/* Text */}
      <span className="hidden sm:inline">Apply Loan Now</span>
      <span className="sm:hidden">Apply Now</span>
    </Link>
  );
}
