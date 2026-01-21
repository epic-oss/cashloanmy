import { SITE_CONFIG } from "@/lib/constants";

interface CostsTableProps {
  lang?: "ms" | "en" | "zh";
}

export function CostsTable({ lang = "en" }: CostsTableProps) {
  const { costs, currentYear, lastUpdated, lastUpdatedEn } = SITE_CONFIG;

  const labels = {
    ms: {
      title: `Kos Refinance Rumah ${currentYear}`,
      updated: `Dikemaskini: ${lastUpdated}`,
      item: "Item",
      cost: "Anggaran Kos",
      notes: "Nota",
      legalFees: "Yuran Guaman",
      valuationFees: "Yuran Penilaian",
      stampDuty: "Duti Setem",
      mrta: "MRTA/MLTA",
      disbursement: "Yuran Pengeluaran",
    },
    en: {
      title: `Refinancing Costs ${currentYear}`,
      updated: `Updated: ${lastUpdatedEn}`,
      item: "Item",
      cost: "Estimated Cost",
      notes: "Notes",
      legalFees: "Legal Fees",
      valuationFees: "Valuation Fees",
      stampDuty: "Stamp Duty",
      mrta: "MRTA/MLTA",
      disbursement: "Disbursement Fee",
    },
    zh: {
      title: `再融资费用 ${currentYear}`,
      updated: `更新日期: ${lastUpdatedEn}`,
      item: "项目",
      cost: "预估费用",
      notes: "备注",
      legalFees: "律师费",
      valuationFees: "估价费",
      stampDuty: "印花税",
      mrta: "MRTA/MLTA",
      disbursement: "手续费",
    },
  };

  const t = labels[lang];

  const costItems = [
    {
      name: t.legalFees,
      cost: costs.legalFeesText,
      note: lang === "ms" ? "Bergantung kepada jumlah pinjaman" : lang === "zh" ? "视贷款金额而定" : "Depends on loan amount",
    },
    {
      name: t.valuationFees,
      cost: costs.valuationFeesText,
      note: lang === "ms" ? "Bergantung kepada nilai hartanah" : lang === "zh" ? "视房产价值而定" : "Depends on property value",
    },
    {
      name: t.stampDuty,
      cost: costs.stampDutyText,
      note: costs.stampDutyNote,
    },
    {
      name: t.mrta,
      cost: lang === "ms" ? "Bergantung" : lang === "zh" ? "不等" : "Varies",
      note: costs.mrtaText,
    },
    {
      name: t.disbursement,
      cost: costs.disbursementFee,
      note: lang === "ms" ? "Yuran bank" : lang === "zh" ? "银行费用" : "Bank fee",
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{t.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{t.updated}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-50">
              <th className="text-left p-3 font-semibold">{t.item}</th>
              <th className="text-left p-3 font-semibold">{t.cost}</th>
              <th className="text-left p-3 font-semibold hidden md:table-cell">{t.notes}</th>
            </tr>
          </thead>
          <tbody>
            {costItems.map((item, index) => (
              <tr
                key={item.name}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.cost}</td>
                <td className="p-3 text-sm text-gray-600 hidden md:table-cell">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
