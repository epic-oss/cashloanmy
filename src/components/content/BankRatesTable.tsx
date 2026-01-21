"use client";

import { SITE_CONFIG, getBanksSortedByRate, BankInfo } from "@/lib/constants";
import { useState } from "react";

interface BankRatesTableProps {
  showAll?: boolean;
  limit?: number;
  lang?: "ms" | "en" | "zh";
}

export function BankRatesTable({
  showAll = false,
  limit = 5,
  lang = "en",
}: BankRatesTableProps) {
  const [sortBy, setSortBy] = useState<"rate" | "name">("rate");

  const banks = getBanksSortedByRate();
  const displayBanks = showAll ? banks : banks.slice(0, limit);

  const labels = {
    ms: {
      title: `Kadar Refinance Bank Malaysia ${SITE_CONFIG.currentYear}`,
      updated: `Dikemaskini: ${SITE_CONFIG.lastUpdated}`,
      bank: "Bank",
      rateFrom: "Kadar Dari",
      maxTenure: "Tempoh Maks",
      maxLTV: "LTV Maks",
      lockIn: "Lock-in",
      years: "tahun",
      bestFor: "Terbaik Untuk",
    },
    en: {
      title: `Malaysia Bank Refinance Rates ${SITE_CONFIG.currentYear}`,
      updated: `Updated: ${SITE_CONFIG.lastUpdatedEn}`,
      bank: "Bank",
      rateFrom: "Rate From",
      maxTenure: "Max Tenure",
      maxLTV: "Max LTV",
      lockIn: "Lock-in",
      years: "years",
      bestFor: "Best For",
    },
    zh: {
      title: `马来西亚银行再融资利率 ${SITE_CONFIG.currentYear}`,
      updated: `更新日期: ${SITE_CONFIG.lastUpdatedEn}`,
      bank: "银行",
      rateFrom: "利率从",
      maxTenure: "最长年限",
      maxLTV: "最高LTV",
      lockIn: "锁定期",
      years: "年",
      bestFor: "最适合",
    },
  };

  const t = labels[lang];

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
          <p className="text-sm text-gray-500">{t.updated}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-50">
              <th className="text-left p-3 font-semibold">{t.bank}</th>
              <th className="text-left p-3 font-semibold">{t.rateFrom}</th>
              <th className="text-left p-3 font-semibold">{t.bestFor}</th>
              <th className="text-left p-3 font-semibold hidden md:table-cell">
                {t.maxTenure}
              </th>
              <th className="text-left p-3 font-semibold hidden md:table-cell">
                {t.lockIn}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayBanks.map((bank, index) => (
              <tr
                key={bank.name}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">
                  <span className="font-medium">{bank.name}</span>
                  {bank.isIslamic && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Islamic
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <span className="text-secondary-600 font-semibold">
                    {bank.rateFrom}
                  </span>
                </td>
                <td className="p-3 text-gray-600 text-sm">{bank.bestFor}</td>
                <td className="p-3 hidden md:table-cell">
                  {bank.maxTenure} {t.years}
                </td>
                <td className="p-3 hidden md:table-cell">
                  {bank.lockIn} {t.years}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        * Rates are indicative and subject to change. Please check with the bank
        for current rates.
      </p>
    </div>
  );
}
