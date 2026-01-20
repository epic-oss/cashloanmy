"use client";

import { useState, useEffect } from "react";

const testimonials = [
  { name: "A*****d", location: "Petaling Jaya", savings: 520 },
  { name: "S*****a", location: "Kuala Lumpur", savings: 680 },
  { name: "M*****n", location: "Shah Alam", savings: 450 },
  { name: "L*****g", location: "Penang", savings: 590 },
  { name: "T*****n", location: "Johor Bahru", savings: 720 },
  { name: "R*****i", location: "Subang Jaya", savings: 380 },
  { name: "N*****a", location: "Puchong", savings: 510 },
  { name: "K*****n", location: "Klang", savings: 640 },
  { name: "W*****g", location: "Ipoh", savings: 420 },
  { name: "H*****n", location: "Melaka", savings: 550 },
  { name: "J*****e", location: "Cyberjaya", savings: 730 },
  { name: "C*****a", location: "Ampang", savings: 480 },
  { name: "F*****k", location: "Cheras", savings: 610 },
  { name: "Y*****n", location: "Seremban", savings: 390 },
  { name: "Z*****a", location: "Putrajaya", savings: 560 },
  { name: "B*****r", location: "Kota Kinabalu", savings: 670 },
];

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsVisible(true);
      }, 500);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-100">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-secondary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {current.name} from {current.location}
            </p>
            <p className="text-sm text-gray-600">
              just refinanced - <span className="text-secondary-600 font-semibold">saves RM{current.savings}/month</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">A few moments ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
