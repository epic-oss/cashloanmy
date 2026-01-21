export default function TrustBadges() {
  const badges = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: "10+ Partner Banks",
      subtitle: "Maybank, CIMB, RHB & more",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          />
        </svg>
      ),
      title: "Save RM300-1,000",
      subtitle: "Per month on mortgage",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Free Consultation",
      subtitle: "Response within 24 hours",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-sm min-h-[140px]"
        >
          <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 mb-3">
            {badge.icon}
          </div>
          <h3 className="font-semibold text-gray-900">{badge.title}</h3>
          <p className="text-sm text-gray-600">{badge.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
