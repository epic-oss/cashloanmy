"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getBanksSortedByRate } from "@/lib/constants";
import { BankRatesTable } from "@/components/content/BankRatesTable";
import { EligibilityCard } from "@/components/content/EligibilityCard";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ArrowRight } from "lucide-react";

const { currentYear } = SITE_CONFIG;
const banks = getBanksSortedByRate();

const lockInPeriods = banks.slice(0, 8).map((bank) => ({
  bank: bank.name,
  lockIn: bank.lockIn,
  penalty: bank.earlySettlement,
}));

const faqs = [
  {
    question: "房贷几年后可以再融资?",
    answer:
      "技术上，您可以在购房后随时再融资。但建议等到锁定期结束后(通常3-5年)再进行，以避免支付2-3%的提前结清罚款。",
  },
  {
    question: "锁定期内可以再融资吗?",
    answer:
      "可以，但需要支付提前结清罚款(通常2-3%的贷款余额)。例如，RM400,000贷款在锁定期内再融资需支付约RM8,000-12,000的罚款。建议先计算节省金额是否足以抵消罚款。",
  },
  {
    question: "提前结清罚款是多少?",
    answer:
      "提前结清罚款因银行而异，通常为贷款余额的2-3%。有些银行的罚款逐年递减，例如：第1年=3%，第2年=2%，第3年=1%。请查看您的贷款合约了解具体条款。",
  },
  {
    question: "再融资的最低贷款金额是多少?",
    answer:
      "大多数银行要求再融资的最低贷款金额为RM100,000。某些银行对优惠利率有更高的要求(RM150,000-200,000)。贷款金额越高，从利率降低中获益越多。",
  },
  {
    question: "可以在同一家银行再融资吗?",
    answer:
      "可以，这称为内部再融资或贷款重组。虽然手续较简单，但其他银行可能提供更好的利率。建议在做决定前比较多家银行的报价。",
  },
  {
    question: "再融资流程需要多长时间?",
    answer:
      "一般再融资流程需要1-3个月，包括：贷款申请审核(1-2周)、房产估价(1-2周)、贷款批准(2-4周)、法律文件处理(2-4周)。",
  },
  {
    question: "再融资值得吗?",
    answer:
      "如果满足以下条件，再融资通常是值得的：(1)能获得0.5%以上的利率降低、(2)锁定期已结束、(3)贷款余额超过10年、(4)计划保留房产至少2-3年以收回再融资费用。",
  },
];

const bestTimes = [
  {
    title: "锁定期结束后",
    description: "这是最理想的时机，因为不需要支付任何提前结清罚款。大多数锁定期为3-5年。",
    icon: "🔓",
  },
  {
    title: "市场利率下降时",
    description: "当国家银行降低OPR或银行推出比您当前利率低0.5%以上的优惠利率时。",
    icon: "📉",
  },
  {
    title: "财务状况改善后",
    description: "薪资增加、信用评分改善或债务减少后，可能获得更好的利率。",
    icon: "📈",
  },
  {
    title: "需要现金时",
    description: "如果房产价值增加，需要资金用于装修、教育或投资，可以通过再融资提取现金。",
    icon: "💰",
  },
  {
    title: "想更换贷款类型时",
    description: "从传统贷款转换为伊斯兰贷款，或从浮动利率转为固定利率。",
    icon: "🔄",
  },
];

const refinancingSteps = [
  {
    step: 1,
    title: "检查锁定期状态",
    description: "查看贷款合约确认锁定期是否已结束。如适用，计算可能的罚款。",
  },
  {
    step: 2,
    title: "比较银行利率",
    description: "使用我们的比较表找到最佳利率。考虑利率以外的其他因素。",
  },
  {
    step: 3,
    title: "计算节省金额",
    description: "使用我们的计算器判断节省金额是否足以抵消再融资费用。",
  },
  {
    step: 4,
    title: "准备文件",
    description: "准备身份证、薪资单、银行流水、EPF报表和房产文件。",
  },
  {
    step: 5,
    title: "提交申请",
    description: "向选定的银行提交申请。可以同时申请多家银行。",
  },
  {
    step: 6,
    title: "房产估价",
    description: "银行安排估价师对房产进行估价。费用约RM300-500。",
  },
  {
    step: 7,
    title: "签署文件并完成",
    description: "批准后签署法律文件。新银行清偿旧贷款并完成转移。",
  },
];

export default function DuojiuKeyiRefinance() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            多久可以Refinance房贷?
          </h1>
          <p className="text-lg text-gray-300">
            了解再融资的最佳时机、锁定期、罚款计算以及何时应该再融资。
          </p>
          <LastUpdated lang="zh" variant="hero" />
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105"
          >
            获取免费报价
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Language Switch */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600">
            其他语言版本:{" "}
            <Link
              href="/berapa-tahun-boleh-refinance-rumah"
              className="text-primary-600 hover:underline font-medium"
            >
              Bahasa Malaysia
            </Link>
            {" | "}
            <Link
              href="/en/when-to-refinance"
              className="text-primary-600 hover:underline font-medium"
            >
              English
            </Link>
          </p>
        </div>
      </div>

      {/* Quick Answer */}
      <section className="py-8 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-secondary-500">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              快速解答：
            </h2>
            <p className="text-gray-700">
              <strong>您可以随时再融资房贷</strong>，但建议等到
              <strong>锁定期结束后(通常3-5年)</strong>以避免支付2-3%的提前结清罚款。
              锁定期结束后，您可以自由再融资，无需支付任何罚款。
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 mb-4">
              许多马来西亚屋主都想知道什么时候是再融资房贷的最佳时机。
              答案取决于多个因素，包括锁定期、当前利率和您的财务状况。
            </p>
            <p className="text-lg text-gray-700">
              本指南将详细解释最短等待期、锁定期罚款以及在马来西亚再融资房贷的最佳时机。
            </p>
          </section>

          {/* Lock-in Periods by Bank */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              各银行锁定期一览
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="text-left p-4 font-semibold border">银行</th>
                    <th className="text-left p-4 font-semibold border">锁定期</th>
                    <th className="text-left p-4 font-semibold border">提前结清罚款</th>
                  </tr>
                </thead>
                <tbody>
                  {lockInPeriods.map((item, index) => (
                    <tr
                      key={item.bank}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-4 border font-medium">{item.bank}</td>
                      <td className="p-4 border">{item.lockIn} 年</td>
                      <td className="p-4 border text-red-600">{item.penalty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              * 锁定期和罚款可能因贷款配套而异。请查看您的贷款合约了解具体条款。
            </p>
          </section>

          {/* Penalty Calculation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              提前结清罚款计算
            </h2>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-6">
              <h3 className="font-semibold text-red-800 mb-4">
                罚款计算公式：
              </h3>
              <div className="bg-white rounded-lg p-4 text-center mb-4">
                <p className="font-mono text-lg text-red-700">
                  罚款 = 贷款余额 × 罚款率 (%)
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>RM200,000余额 × 3%罚款</span>
                  <span className="font-bold text-red-600">= RM6,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>RM400,000余额 × 3%罚款</span>
                  <span className="font-bold text-red-600">= RM12,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>RM600,000余额 × 3%罚款</span>
                  <span className="font-bold text-red-600">= RM18,000</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>提示：</strong>部分银行的罚款率逐年递减。
                例如：第1年=3%，第2年=2%，第3年=1%。请查看您的贷款合约了解具体罚款结构。
              </p>
            </div>
          </section>

          {/* Best Time to Refinance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5个再融资的最佳时机
            </h2>

            <div className="space-y-4">
              {bestTimes.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary-50 rounded-lg p-4 border border-secondary-200 flex items-start gap-4"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Eligibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              再融资申请条件
            </h2>
            <p className="text-gray-700 mb-4">
              除了合适的时机，请确保您符合基本的申请条件：
            </p>
            <EligibilityCard lang="zh" />
          </section>

          {/* Refinancing an Ongoing Loan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              贷款还在进行中可以再融资吗?
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                是的，即使贷款还在进行中，您也可以再融资。事实上，这是最常见的再融资情况。
                以下是运作方式：
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { step: 1, text: "新银行评估您的房产和财务状况" },
                { step: 2, text: "批准后，新银行直接清偿您在旧银行的贷款" },
                { step: 3, text: "您开始以较低利率向新银行还款" },
                { step: 4, text: "如有现金提取，余额将存入您的账户" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Refinancing a Paid Off Home */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              已还清的房产可以再融资吗?
            </h2>

            <div className="bg-primary-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                如果您的房产已经还清，仍然可以通过再融资提取现金。
                这称为<strong>现金提取再融资(Cash Out Refinancing)</strong>。
              </p>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  示例情况：
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 当前房产价值: RM700,000</li>
                  <li>• 贷款余额: RM0 (已还清)</li>
                  <li>• 最高LTV(90%): RM630,000</li>
                  <li>• 可提取现金: 最高RM630,000</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">
                  这笔现金可用于投资、装修、教育或商业资金。
                </p>
              </div>
            </div>
          </section>

          {/* Bank Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              当前再融资利率
            </h2>
            <BankRatesTable limit={5} lang="zh" />
          </section>

          {/* Steps to Refinance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              再融资流程步骤
            </h2>

            <div className="space-y-4">
              {refinancingSteps.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              常见问题解答
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaqIndex === index && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Related Guides */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              相关指南
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/calculator"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">再融资计算器</h3>
                <p className="text-sm text-primary-700">计算您的潜在节省金额</p>
              </Link>
              <Link
                href="/cn/refinance-xuyao-ziliao"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">所需文件清单</h3>
                <p className="text-sm text-primary-700">申请所需的完整文件清单</p>
              </Link>
              <Link
                href="/cn/zuijia-refinance-yinhang"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">最佳再融资银行</h3>
                <p className="text-sm text-primary-700">比较10多家银行利率</p>
              </Link>
              <Link
                href="/cn/refinance-haochu-huaichu"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">再融资好处与坏处</h3>
                <p className="text-sm text-primary-700">了解再融资的利与弊</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            准备好再融资了吗?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            获取免费报价，让我们的专家帮您找到最佳时机和利率。
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-block text-lg px-8 py-4"
          >
            立即获取免费报价
          </button>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">获取免费报价</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <LeadForm variant="modal" source="cn-duojiu-keyi-refinance" lang="zh" />
            </div>
          </div>
        </div>
      )}

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `多久可以Refinance房贷 - 马来西亚完整指南 ${currentYear}`,
            description: `了解房贷多久后可以再融资。马来西亚再融资时机、锁定期和罚款完整指南 ${currentYear}。`,
            datePublished: "2026-01-12",
            dateModified: "2026-01-21",
            author: {
              "@type": "Organization",
              name: "RefinanceHomeLoanMY",
            },
            publisher: {
              "@type": "Organization",
              name: "RefinanceHomeLoanMY",
              url: "https://refinancehomeloanmy.com",
            },
          }),
        }}
      />

      <BackToTop />
      <StickyMobileCTA
        onCtaClick={() => setShowForm(true)}
        text="每月节省RM500+"
        buttonText="获取免费报价"
      />
    </>
  );
}
