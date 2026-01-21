import { SITE_CONFIG, formatCurrency } from "@/lib/constants";

interface EligibilityCardProps {
  lang?: "ms" | "en" | "zh";
}

export function EligibilityCard({ lang = "en" }: EligibilityCardProps) {
  const { eligibility, currentYear } = SITE_CONFIG;

  const labels = {
    ms: {
      title: `Syarat Kelayakan Refinance ${currentYear}`,
      age: "Umur",
      income: "Pendapatan Minimum",
      dsr: "DSR Maksimum",
      employment: "Tempoh Bekerja",
      ltv: "LTV Maksimum",
      years: "tahun",
      months: "bulan",
    },
    en: {
      title: `Refinancing Eligibility ${currentYear}`,
      age: "Age",
      income: "Minimum Income",
      dsr: "Maximum DSR",
      employment: "Employment Period",
      ltv: "Maximum LTV",
      years: "years",
      months: "months",
    },
    zh: {
      title: `再融资申请条件 ${currentYear}`,
      age: "年龄",
      income: "最低收入",
      dsr: "最高DSR",
      employment: "工作年资",
      ltv: "最高LTV",
      years: "岁",
      months: "个月",
    },
  };

  const t = labels[lang];

  const items = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: t.age,
      value: `${eligibility.minAge} - ${eligibility.maxAge} ${t.years}`,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t.income,
      value: formatCurrency(eligibility.minIncome),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      label: t.dsr,
      value: `${eligibility.maxDSR}%`,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t.employment,
      value: `${eligibility.minEmploymentMonths} ${t.months}`,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      label: t.ltv,
      value: `${eligibility.maxLTV}%`,
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{t.title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 p-4 rounded-lg text-center"
          >
            <div className="w-12 h-12 mx-auto mb-2 text-primary-600 flex items-center justify-center">
              {item.icon}
            </div>
            <p className="text-sm text-gray-600">{item.label}</p>
            <p className="font-bold text-lg">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
