"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getBanksSortedByRate } from "@/lib/constants";
import { BankRatesTable } from "@/components/content/BankRatesTable";
import { EligibilityCard } from "@/components/content/EligibilityCard";
import { CostsTable } from "@/components/content/CostsTable";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ArrowRight } from "lucide-react";

const { currentYear } = SITE_CONFIG;
const banks = getBanksSortedByRate();

const faqs = [
  {
    question: "什么是房屋再融资(Refinance)?",
    answer:
      "房屋再融资是指将您现有的房贷转移到另一家银行，以获得更低的利率、更好的条款，或提取房产增值部分的现金。这是马来西亚屋主常用来节省每月供款或获取资金的方式。",
  },
  {
    question: "再融资和重新贷款有什么区别?",
    answer:
      "再融资(Refinance)是将现有贷款转到新银行以获得更好条款。重新贷款(Repricing)是与同一家银行协商新利率。再融资通常能获得更好的利率，但涉及更多手续和费用。",
  },
  {
    question: "再融资需要多长时间?",
    answer:
      "一般再融资流程需要1-3个月完成，包括：贷款申请审批(1-2周)、房产估价(1-2周)、贷款批准(2-4周)、法律文件处理(2-4周)。",
  },
  {
    question: "再融资有什么费用?",
    answer:
      "再融资费用包括：律师费(贷款金额的0.4-1%)、估价费(RM300-500)、印花税(贷款金额的0.5%)、MRTA保险等。总费用通常为贷款金额的2-3%。",
  },
  {
    question: "什么时候适合再融资?",
    answer:
      "建议在以下情况考虑再融资：(1)锁定期结束后、(2)市场利率下降0.5%以上、(3)贷款余额超过RM100,000、(4)还有超过10年还款期、(5)信用评分改善后。",
  },
  {
    question: "再融资会影响我的信用评分吗?",
    answer:
      "申请再融资时，银行会查询您的CCRIS记录，这可能会暂时轻微影响信用评分。但如果您按时还款，长期来看不会有负面影响。",
  },
];

const refinanceBenefits = [
  {
    title: "降低利率",
    description: "从目前的4-5%降到3.8%左右，每月可节省数百令吉。",
    icon: "📉",
  },
  {
    title: "减少每月供款",
    description: "通过更低利率或延长还款期，减轻每月财务负担。",
    icon: "💰",
  },
  {
    title: "提取现金",
    description: "房产增值后，可提取部分价值用于装修、投资或教育。",
    icon: "🏦",
  },
  {
    title: "整合债务",
    description: "将高利率债务(信用卡、个人贷款)整合到低利率房贷中。",
    icon: "📊",
  },
  {
    title: "更换贷款类型",
    description: "从传统贷款转换为伊斯兰贷款，或从浮动利率转为固定利率。",
    icon: "🔄",
  },
];

const refinanceProcess = [
  {
    step: 1,
    title: "检查锁定期",
    description: "查看现有贷款合约，确认锁定期是否已结束，以避免提前结清罚款。",
  },
  {
    step: 2,
    title: "比较银行利率",
    description: "研究各银行提供的再融资利率，选择最适合您的配套。",
  },
  {
    step: 3,
    title: "计算节省金额",
    description: "使用计算器估算每月可节省的金额，确保值得进行再融资。",
  },
  {
    step: 4,
    title: "准备文件",
    description: "准备身份证、薪资单、银行流水、EPF报表、房产文件等。",
  },
  {
    step: 5,
    title: "提交申请",
    description: "向选定的银行提交再融资申请，可同时申请多家银行。",
  },
  {
    step: 6,
    title: "房产估价",
    description: "银行将安排估价师对您的房产进行估价，费用约RM300-500。",
  },
  {
    step: 7,
    title: "签署文件",
    description: "贷款批准后，签署法律文件，新银行将偿还旧贷款并完成转移。",
  },
];

export default function ShenmeShiRefinance() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            什么是房屋再融资(Refinance)?
          </h1>
          <p className="text-lg text-gray-300">
            马来西亚房屋再融资完整指南 - 了解如何通过再融资节省每月供款，提取现金，获得更好的贷款条款。
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
              href="/bank-terbaik-refinance-rumah"
              className="text-primary-600 hover:underline font-medium"
            >
              Bahasa Malaysia
            </Link>
            {" | "}
            <Link
              href="/en/best-refinance-banks"
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
              <strong>房屋再融资(Refinance)</strong>是将您现有的房贷从一家银行转移到另一家银行的过程。
              主要目的是获得<strong>更低的利率</strong>、减少每月供款、或<strong>提取房产增值部分的现金</strong>。
              在马来西亚，当前最佳再融资利率约为<strong>3.80% p.a.</strong>起。
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              房屋再融资简介
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              房屋再融资是马来西亚屋主常用的财务策略。通过将现有房贷转移到提供更优惠条款的银行，
              您可以每月节省数百令吉，或提取房产增值部分作为现金使用。
            </p>
            <p className="text-lg text-gray-700">
              随着马来西亚房贷市场竞争加剧，各银行纷纷推出具有吸引力的再融资配套。
              如果您的房贷已超过锁定期，现在可能是考虑再融资的好时机。
            </p>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              再融资的五大好处
            </h2>
            <div className="space-y-4">
              {refinanceBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-secondary-50 rounded-lg p-4 border border-secondary-200 flex items-start gap-4"
                >
                  <span className="text-3xl">{benefit.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bank Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              当前银行再融资利率
            </h2>
            <BankRatesTable limit={5} lang="zh" />
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Refinancing Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              再融资流程步骤
            </h2>
            <div className="space-y-4">
              {refinanceProcess.map((item) => (
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

          {/* Eligibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              再融资申请条件
            </h2>
            <EligibilityCard lang="zh" />
          </section>

          {/* Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              再融资相关费用
            </h2>
            <CostsTable lang="zh" />
          </section>

          {/* Example Calculation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              节省金额计算示例
            </h2>
            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                假设情况：
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-red-600 mb-2">现有贷款</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 贷款余额: RM400,000</li>
                    <li>• 利率: 4.5% p.a.</li>
                    <li>• 剩余年限: 20年</li>
                    <li>• 每月供款: <strong>RM2,530</strong></li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-green-600 mb-2">再融资后</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 贷款金额: RM400,000</li>
                    <li>• 新利率: 3.8% p.a.</li>
                    <li>• 贷款年限: 20年</li>
                    <li>• 每月供款: <strong>RM2,378</strong></li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
                <p className="text-lg font-bold text-green-800">
                  每月节省: RM152 | 20年总节省: RM36,480
                </p>
              </div>
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
                <p className="text-sm text-primary-700">申请再融资需要准备的文件</p>
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
            准备好开始再融资了吗?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            获取免费报价，让我们的专家帮助您找到最适合的再融资方案。
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
              <LeadForm variant="modal" source="cn-shenme-shi-refinance" lang="zh" />
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
            headline: `什么是房屋再融资 - 马来西亚完整指南 ${currentYear}`,
            description: `了解什么是房屋再融资(Refinance)，如何通过再融资节省每月供款。马来西亚房屋再融资完整指南 ${currentYear}。`,
            datePublished: "2026-01-05",
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
