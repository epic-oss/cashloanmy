import { SITE_CONFIG } from "@/lib/constants";

interface DocumentsListProps {
  type?: "employed" | "selfEmployed" | "both";
  lang?: "ms" | "en" | "zh";
}

export function DocumentsList({ type = "both", lang = "en" }: DocumentsListProps) {
  const { documents } = SITE_CONFIG;

  const labels = {
    ms: {
      employed: "Pekerja Bergaji",
      selfEmployed: "Bekerja Sendiri",
    },
    en: {
      employed: "Salaried Employee",
      selfEmployed: "Self-Employed",
    },
    zh: {
      employed: "受薪员工",
      selfEmployed: "自雇人士",
    },
  };

  const t = labels[lang];

  return (
    <div className="my-8 space-y-6">
      {(type === "employed" || type === "both") && (
        <div className="bg-primary-50 p-6 rounded-lg">
          <h4 className="font-bold text-lg mb-4 text-primary-900">{t.employed}</h4>
          <ul className="space-y-2">
            {documents.employed.map((doc) => (
              <li key={doc} className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0"
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
                <span className="text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(type === "selfEmployed" || type === "both") && (
        <div className="bg-orange-50 p-6 rounded-lg">
          <h4 className="font-bold text-lg mb-4 text-orange-900">{t.selfEmployed}</h4>
          <ul className="space-y-2">
            {documents.selfEmployed.map((doc) => (
              <li key={doc} className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-secondary-600 mt-0.5 flex-shrink-0"
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
                <span className="text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
