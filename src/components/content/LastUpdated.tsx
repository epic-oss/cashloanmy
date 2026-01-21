import { SITE_CONFIG } from "@/lib/constants";

interface LastUpdatedProps {
  lang?: "ms" | "en";
  variant?: "default" | "hero";
}

export function LastUpdated({ lang = "en", variant = "default" }: LastUpdatedProps) {
  const text =
    lang === "ms"
      ? `Dikemaskini: ${SITE_CONFIG.lastUpdated}`
      : `Updated: ${SITE_CONFIG.lastUpdatedEn}`;

  const colorClass = variant === "hero" ? "text-white/70" : "text-gray-500";

  return (
    <div className={`flex items-center gap-2 text-sm ${colorClass} my-4`}>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span>{text}</span>
    </div>
  );
}
