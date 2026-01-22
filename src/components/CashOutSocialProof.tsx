"use client";

import { useState, useEffect } from "react";

const cashOutTestimonials = [
  { name: "A****d", location: "KL", amount: "RM320,000" },
  { name: "S****a", location: "Penang", amount: "RM180,000" },
  { name: "R****n", location: "JB", amount: "RM250,000" },
  { name: "M****n", location: "Shah Alam", amount: "RM420,000" },
  { name: "L****g", location: "Subang", amount: "RM290,000" },
  { name: "T****a", location: "Puchong", amount: "RM350,000" },
  { name: "N****i", location: "Cheras", amount: "RM210,000" },
  { name: "K****n", location: "Klang", amount: "RM380,000" },
  { name: "W****a", location: "Ipoh", amount: "RM160,000" },
  { name: "H****n", location: "Melaka", amount: "RM270,000" },
];

export default function CashOutSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cashOutTestimonials.length);
        setIsVisible(true);
      }, 500);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const current = cashOutTestimonials[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-100">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {current.name} from {current.location}
            </p>
            <p className="text-sm text-gray-600">
              got <span className="text-green-600 font-semibold">{current.amount}</span> cash out
            </p>
            <p className="text-xs text-gray-400 mt-1">Just approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
