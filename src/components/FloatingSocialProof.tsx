"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function FloatingSocialProof() {
  const pathname = usePathname();
  const [count, setCount] = useState(127);

  // Subtle animation - occasionally increment the count
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to increment (simulates real-time activity)
      if (Math.random() > 0.7) {
        setCount((prev) => prev + 1);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Hide on homepage since form is already visible
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-40 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-lg px-3 py-2 md:px-4 md:py-2.5 max-w-[200px] md:max-w-none">
      <div className="flex items-center gap-2">
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {/* Text */}
        <p className="text-xs md:text-sm text-gray-600">
          <span className="font-semibold text-gray-800">{count}</span> people requested quotes this month
        </p>
      </div>
    </div>
  );
}
