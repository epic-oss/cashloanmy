"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BankRatesTable } from "@/components/content/BankRatesTable";
import { CostsTable } from "@/components/content/CostsTable";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ArrowRight } from "lucide-react";

const { currentYear } = SITE_CONFIG;

const faqs = [
  {
    question: "再融资值得吗?",
    answer:
      "如果您的锁定期已结束、能获得至少0.5%的利率降低、贷款余额超过RM100,000、且还有超过10年还款期，那么再融资通常是值得的。使用我们的计算器来确定您的具体情况是否适合再融资。",
  },
  {
    question: "再融资会让我损失多少钱?",
    answer:
      "再融资的主要费用包括：律师费(贷款金额的0.4-1%)、估价费(RM300-500)、印花税(贷款金额的0.5%)。总费用通常为贷款金额的2-3%。如果您在锁定期内再融资，还需支付2-3%的提前结清罚款。",
  },
  {
    question: "再融资后我的信用评分会下降吗?",
    answer:
      "银行在审批再融资申请时会查询您的CCRIS记录，这可能会导致信用评分暂时轻微下降。但只要您按时还款，长期影响是正面的。多次被拒绝的申请可能会对信用评分产生更大影响。",
  },
  {
    question: "我可以多次再融资吗?",
    answer:
      "是的，您可以多次再融资，但每次都需要等待锁定期结束以避免罚款。频繁再融资会累积费用，因此建议只在能获得显著节省时才进行再融资。",
  },
  {
    question: "再融资会延长我的还款期吗?",
    answer:
      "这取决于您的选择。您可以选择保持相同的还款期（减少每月供款），或延长还款期（进一步减少每月供款，但总利息增加），或缩短还款期（每月供款增加，但更快还清贷款）。",
  },
];

const advantages = [
  {
    title: "降低利率节省金额",
    description:
      "通过获得更低的利率，您可以每月节省数百令吉。例如，RM400,000贷款从4.5%降到3.8%，每月可节省约RM150。",
    icon: "✅",
  },
  {
    title: "减少每月供款压力",
    description:
      "较低的利率或延长还款期可以减少每月供款，让您有更多流动资金用于其他开支或投资。",
    icon: "✅",
  },
  {
    title: "提取现金(Cash Out)",
    description:
      "如果您的房产价值增加，可以通过再融资提取部分增值作为现金，用于装修、投资、教育或其他用途。",
    icon: "✅",
  },
  {
    title: "整合高利率债务",
    description:
      "将信用卡债务(18%年利率)或个人贷款(7-10%年利率)整合到房贷中(约4%年利率)，大幅减少利息支出。",
    icon: "✅",
  },
  {
    title: "更换贷款类型",
    description:
      "从传统贷款转换为伊斯兰贷款，或从浮动利率转为固定利率，以符合您的需求或信仰。",
    icon: "✅",
  },
  {
    title: "获得更好的服务",
    description:
      "转到提供更好客户服务、更方便的网上银行功能、或更好附加服务的银行。",
    icon: "✅",
  },
];

const disadvantages = [
  {
    title: "再融资费用",
    description:
      "再融资涉及律师费、估价费、印花税等费用，总计约为贷款金额的2-3%。例如，RM400,000贷款的再融资费用约为RM8,000-12,000。",
    icon: "❌",
  },
  {
    title: "提前结清罚款",
    description:
      "如果在锁定期内再融资，需支付2-3%的提前结清罚款。RM400,000贷款的罚款可高达RM12,000。",
    icon: "❌",
  },
  {
    title: "处理时间长",
    description:
      "再融资流程通常需要1-3个月，期间需要准备文件、等待估价、贷款审批等，可能带来不便。",
    icon: "❌",
  },
  {
    title: "可能延长还款期",
    description:
      "虽然延长还款期可减少每月供款，但总利息支出会增加。例如，延长5年可能增加数万令吉的总利息。",
    icon: "❌",
  },
  {
    title: "房产价值下跌风险",
    description:
      "如果房产估价低于预期，可能影响您能获得的贷款金额或利率，甚至导致申请被拒。",
    icon: "❌",
  },
  {
    title: "信用评分暂时下降",
    description:
      "申请再融资时银行会查询您的信用记录，这可能导致信用评分暂时轻微下降。",
    icon: "❌",
  },
];

const whenToRefinance = [
  {
    title: "应该再融资的情况",
    items: [
      "锁定期已结束",
      "能获得至少0.5%的利率降低",
      "贷款余额超过RM100,000",
      "还有超过10年还款期",
      "需要提取现金用于重要用途",
      "想要整合高利率债务",
    ],
  },
  {
    title: "不应该再融资的情况",
    items: [
      "仍在锁定期内",
      "利率差异小于0.3%",
      "贷款余额少于RM100,000",
      "即将还清贷款(少于5年)",
      "近期有换工作计划",
      "信用记录不佳",
    ],
  },
];

export default function RefinanceHaochuHuaichu() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            再融资的好处与坏处
          </h1>
          <p className="text-lg text-gray-300">
            全面分析房屋再融资的优缺点，帮助您做出明智的财务决策。
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
              href="/kelebihan-keburukan-refinance-rumah"
              className="text-primary-600 hover:underline font-medium"
            >
              Bahasa Malaysia
            </Link>
            {" | "}
            <Link
              href="/en/pros-cons-refinancing"
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
              快速总结：
            </h2>
            <p className="text-gray-700">
              <strong>再融资的主要好处</strong>是降低利率、减少每月供款、提取现金。
              <strong>主要坏处</strong>是涉及费用(贷款金额的2-3%)、处理时间长、可能延长还款期。
              如果您能节省的金额超过费用，且锁定期已结束，再融资通常是值得的。
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 mb-4">
              房屋再融资是一个重要的财务决策，在行动之前了解其好处和坏处至关重要。
              本指南将详细分析再融资的各个方面，帮助您判断这是否适合您的情况。
            </p>
          </section>

          {/* Advantages */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-green-500">✓</span> 再融资的好处
            </h2>
            <div className="space-y-4">
              {advantages.map((item, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-lg p-4 border border-green-200"
                >
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span>{item.icon}</span> {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disadvantages */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-red-500">✗</span> 再融资的坏处
            </h2>
            <div className="space-y-4">
              {disadvantages.map((item, index) => (
                <div
                  key={index}
                  className="bg-red-50 rounded-lg p-4 border border-red-200"
                >
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span>{item.icon}</span> {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* When to Refinance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              什么时候应该/不应该再融资?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whenToRefinance.map((section, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-6 ${
                    index === 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <h3 className={`font-semibold mb-4 ${index === 0 ? "text-green-800" : "text-red-800"}`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className={index === 0 ? "text-green-500" : "text-red-500"}>
                          {index === 0 ? "✓" : "✗"}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Cost-Benefit Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              成本效益分析示例
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">假设情况：</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">贷款余额: RM400,000</p>
                  <p className="text-sm text-gray-600">利率降低: 4.5% → 3.8%</p>
                  <p className="text-sm text-gray-600">剩余年限: 20年</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-100 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">再融资费用</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 律师费: ~RM3,000</li>
                      <li>• 估价费: ~RM400</li>
                      <li>• 印花税: ~RM2,000</li>
                      <li>• 其他费用: ~RM600</li>
                      <li className="font-bold pt-2 border-t">总费用: ~RM6,000</li>
                    </ul>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">节省金额</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 每月节省: ~RM152</li>
                      <li>• 每年节省: ~RM1,824</li>
                      <li>• 收回成本时间: ~3.3年</li>
                      <li>• 20年总节省: ~RM36,480</li>
                      <li className="font-bold pt-2 border-t">净节省: ~RM30,480</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <p className="text-blue-800 font-medium">
                    结论：在此例中，再融资是值得的，因为净节省超过RM30,000
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Costs Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              再融资费用明细
            </h2>
            <CostsTable lang="zh" />
          </section>

          {/* Bank Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              当前银行再融资利率
            </h2>
            <BankRatesTable limit={5} lang="zh" />
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
                href="/cn/shenme-shi-refinance"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">什么是再融资</h3>
                <p className="text-sm text-primary-700">了解再融资的基础知识</p>
              </Link>
              <Link
                href="/cn/zuijia-refinance-yinhang"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">最佳再融资银行</h3>
                <p className="text-sm text-primary-700">比较10多家银行利率</p>
              </Link>
              <Link
                href="/cn/duojiu-keyi-refinance"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">何时可以再融资</h3>
                <p className="text-sm text-primary-700">了解最佳再融资时机</p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            想知道再融资是否适合您?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            获取免费报价，让我们的专家为您分析您的具体情况。
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
              <LeadForm variant="modal" source="cn-refinance-haochu-huaichu" lang="zh" />
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
            headline: `再融资的好处与坏处 - 马来西亚完整指南 ${currentYear}`,
            description: `了解房屋再融资的优缺点，帮助您做出明智的财务决策。马来西亚再融资好处与坏处完整分析 ${currentYear}。`,
            datePublished: "2026-01-08",
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
