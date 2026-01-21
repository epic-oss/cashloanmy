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
    question: "马来西亚哪家银行的再融资利率最低?",
    answer: `截至${currentYear}年，最具竞争力的再融资利率来自Public Bank、RHB、CIMB和Hong Leong Bank，利率从3.80%起。具体利率取决于您的财务状况、贷款金额和房产类型。`,
  },
  {
    question: "我应该选择传统贷款还是伊斯兰贷款?",
    answer:
      "两种贷款类型的利率通常相近。伊斯兰贷款(Islamic financing)适合穆斯林或希望符合伊斯兰教义的借款人。传统贷款的条款可能更灵活。选择应基于您的个人偏好和需求。",
  },
  {
    question: "固定利率和浮动利率哪个更好?",
    answer:
      "浮动利率通常起点较低，但会随市场变化。固定利率在初期(通常2-3年)保持不变，提供更稳定的还款。如果您预计利率会上升，固定利率可能更安全。如果预计利率会下降，浮动利率可能更有利。",
  },
  {
    question: "外国人可以在马来西亚再融资吗?",
    answer:
      "是的，外国人可以在马来西亚再融资，但条件可能更严格。通常最高LTV为70-80%（相比本地人的90%），且利率可能略高。您需要有效的签证/工作准证和在马来西亚的收入证明。",
  },
  {
    question: "如何比较不同银行的再融资配套?",
    answer:
      "除了利率，还应考虑：锁定期长度、提前结清罚款、贷款年限、处理费用、是否需要购买保险、客户服务质量、网上银行功能等。有时候利率稍高但锁定期短的配套可能更划算。",
  },
  {
    question: "可以同时申请多家银行吗?",
    answer:
      "是的，您可以同时向多家银行提交再融资申请，以比较最终批准的条款。这不会对您的信用评分产生负面影响，因为银行了解这是正常的比较过程。但请注意，过多的申请可能会影响CCRIS记录。",
  },
];

const bankHighlights = [
  {
    name: "Public Bank",
    rate: "3.80%",
    highlight: "利率最低",
    pros: ["最具竞争力的利率", "快速审批", "良好的客户服务"],
    cons: ["锁定期较长(5年)", "文件要求严格"],
  },
  {
    name: "RHB Bank",
    rate: "3.85%",
    highlight: "高贷款价值",
    pros: ["高LTV(最高90%)", "灵活的还款选项", "免费估价"],
    cons: ["利率略高于Public Bank", "锁定期5年"],
  },
  {
    name: "CIMB",
    rate: "3.88%",
    highlight: "快速审批",
    pros: ["审批速度快", "网上申请便利", "广泛的分行网络"],
    cons: ["利率中等", "某些费用较高"],
  },
  {
    name: "Hong Leong Bank",
    rate: "3.85%",
    highlight: "灵活条款",
    pros: ["灵活的还款选项", "较短锁定期(3年)", "良好的数字银行服务"],
    cons: ["最低贷款金额要求较高", "某些地区分行较少"],
  },
  {
    name: "Bank Islam",
    rate: "3.90%",
    highlight: "伊斯兰融资",
    pros: ["符合伊斯兰教义", "透明的利润率", "无复利"],
    cons: ["仅限伊斯兰融资", "某些条款不如传统贷款灵活"],
  },
];

const choosingFactors = [
  {
    factor: "利率",
    description: "比较各银行的有效利率，不仅看广告利率。即使0.1%的差异，长期也能节省数千令吉。",
    icon: "📊",
  },
  {
    factor: "锁定期",
    description: "锁定期越短越灵活。如果预计未来可能需要再次再融资或提前还款，选择锁定期较短的配套。",
    icon: "🔒",
  },
  {
    factor: "费用",
    description: "考虑所有费用：律师费、估价费、印花税、保险等。有些银行提供免费估价或法律费用补贴。",
    icon: "💰",
  },
  {
    factor: "贷款条款",
    description: "检查最高LTV、贷款年限、是否允许额外还款、提前结清条款等。",
    icon: "📋",
  },
  {
    factor: "客户服务",
    description: "考虑银行的服务质量、分行位置便利性、网上银行功能等。",
    icon: "👥",
  },
  {
    factor: "审批速度",
    description: "如果您急需完成再融资，选择审批速度快的银行。某些银行可在2-4周内完成审批。",
    icon: "⚡",
  },
];

export default function ZuijiaRefinanceYinhang() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            马来西亚最佳再融资银行 {currentYear}
          </h1>
          <p className="text-lg text-gray-300">
            比较各大银行的再融资利率和配套，找到最适合您的方案。
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
              快速推荐：
            </h2>
            <p className="text-gray-700">
              {currentYear}年马来西亚最佳再融资银行包括：
              <strong>Public Bank</strong>(利率最低，从3.80%起)、
              <strong>RHB</strong>(高LTV，从3.85%起)、
              <strong>Hong Leong Bank</strong>(较短锁定期，从3.85%起)。
              最佳选择取决于您的具体需求和财务状况。
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
              选择合适的银行是再融资成功的关键。不同银行提供不同的利率、锁定期和条款。
              本指南将帮助您比较马来西亚主要银行的再融资配套，找到最适合您需求的方案。
            </p>
          </section>

          {/* Full Bank Rates Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              银行再融资利率比较
            </h2>
            <BankRatesTable showAll={true} lang="zh" />
          </section>

          {/* Bank Highlights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              各银行亮点分析
            </h2>
            <div className="space-y-6">
              {bankHighlights.map((bank, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{bank.name}</h3>
                      <span className="text-sm bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                        {bank.highlight}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary-600">{bank.rate}</p>
                      <p className="text-sm text-gray-500">年利率起</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">优点</h4>
                      <ul className="space-y-1">
                        {bank.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">注意事项</h4>
                      <ul className="space-y-1">
                        {bank.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-red-500">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* How to Choose */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              如何选择最适合的银行?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {choosingFactors.map((item, index) => (
                <div
                  key={index}
                  className="bg-primary-50 rounded-lg p-4 border border-primary-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.factor}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Islamic vs Conventional */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              传统贷款 vs 伊斯兰融资
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4">传统贷款</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    基于利息计算
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    条款可能更灵活
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    提前还款可能减少总利息
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    适合所有人
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-4">伊斯兰融资</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    基于利润率计算
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    符合伊斯兰教义
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    无复利(Riba)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    适合穆斯林和非穆斯林
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Eligibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              申请条件
            </h2>
            <EligibilityCard lang="zh" />
          </section>

          {/* Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              再融资费用
            </h2>
            <CostsTable lang="zh" />
          </section>

          {/* Application Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              申请建议
            </h2>
            <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-200">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </span>
                  <p className="text-gray-700">
                    <strong>同时申请2-3家银行</strong> - 这样可以比较最终批准的条款，选择最有利的配套。
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </span>
                  <p className="text-gray-700">
                    <strong>准备完整文件</strong> - 齐全的文件可以加速审批，避免来回补交。
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </span>
                  <p className="text-gray-700">
                    <strong>协商条款</strong> - 如果有其他银行的报价，可以用来协商更好的条款。
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </span>
                  <p className="text-gray-700">
                    <strong>使用代理服务</strong> - 贷款代理可以帮您比较多家银行，节省时间和精力。
                  </p>
                </li>
              </ol>
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
                href="/cn/shenme-shi-refinance"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">什么是再融资</h3>
                <p className="text-sm text-primary-700">了解再融资的基础知识</p>
              </Link>
              <Link
                href="/cn/refinance-xuyao-ziliao"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">所需文件清单</h3>
                <p className="text-sm text-primary-700">申请所需的完整文件清单</p>
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
            让专家帮您找到最佳银行
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            获取免费报价，我们的专家将比较多家银行，为您推荐最适合的方案。
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
              <LeadForm variant="modal" source="cn-zuijia-refinance-yinhang" lang="zh" />
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
            headline: `马来西亚最佳再融资银行 ${currentYear}`,
            description: `比较马来西亚各大银行的再融资利率和配套。找到最适合您的再融资方案 ${currentYear}。`,
            datePublished: "2026-01-15",
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
