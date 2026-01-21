"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { DocumentsList } from "@/components/content/DocumentsList";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ArrowRight } from "lucide-react";

const { currentYear } = SITE_CONFIG;

const faqs = [
  {
    question: "再融资需要提供哪些文件?",
    answer:
      "主要文件包括：身份证/护照、最近3个月薪资单、最近6个月银行流水、EPF报表、现有贷款资料、房产文件(地契/S&P)。自雇人士还需要提供商业注册证、公司财务报表等。",
  },
  {
    question: "为什么需要6个月的银行流水?",
    answer:
      "银行需要通过银行流水来验证您的收入来源、评估您的消费习惯、确认您有稳定的现金流。这有助于银行评估您的还款能力和信用风险。",
  },
  {
    question: "如果我是自雇人士，需要什么额外文件?",
    answer:
      "自雇人士需要提供：商业注册证(SSM)、过去2年的公司财务报表或审计报告、过去2年的个人所得税表(Form B/BE)、商业银行账户流水等。",
  },
  {
    question: "没有EPF报表怎么办?",
    answer:
      "EPF报表主要用于验证您的就业历史。如果没有EPF(如外籍人士或某些行业)，可以提供其他就业证明如雇佣合同、公司确认函等替代。",
  },
  {
    question: "文件需要原件还是复印件?",
    answer:
      "初次申请通常只需要复印件或扫描件。但在最后签署阶段，银行可能需要核对某些文件的原件，如身份证和地契。建议保留所有文件的原件备查。",
  },
  {
    question: "房产文件丢失了怎么办?",
    answer:
      "如果地契丢失，可以向土地局申请副本。如果S&P(买卖合约)丢失，可以向当时的律师或发展商索取副本。这可能需要额外时间和费用。",
  },
];

const employedDocuments = [
  {
    category: "身份证明",
    items: [
      { name: "身份证 (IC)", description: "马来西亚公民需提供", required: true },
      { name: "护照", description: "外籍人士需提供", required: false },
    ],
  },
  {
    category: "收入证明",
    items: [
      { name: "最近3个月薪资单", description: "需显示基本薪资和扣除项", required: true },
      { name: "最新雇佣确认函", description: "注明职位和薪资", required: true },
      { name: "最近6个月银行流水", description: "薪资入账的银行账户", required: true },
      { name: "EPF报表", description: "最新的公积金报表", required: true },
      { name: "所得税表 (EA Form)", description: "最近一年的EA表格", required: true },
    ],
  },
  {
    category: "现有贷款资料",
    items: [
      { name: "贷款合约", description: "现有房贷的贷款协议", required: true },
      { name: "最近还款记录", description: "最近6-12个月的还款记录", required: true },
      { name: "贷款余额证明", description: "银行出具的余额确认函", required: true },
    ],
  },
  {
    category: "房产文件",
    items: [
      { name: "地契", description: "Geran/Strata Title/Individual Title", required: true },
      { name: "买卖合约 (S&P)", description: "房产购买合约", required: true },
      { name: "最新估价报告", description: "如有(可由新银行安排)", required: false },
    ],
  },
];

const selfEmployedDocuments = [
  {
    category: "身份证明",
    items: [
      { name: "身份证 (IC)", description: "马来西亚公民需提供", required: true },
      { name: "护照", description: "外籍人士需提供", required: false },
    ],
  },
  {
    category: "商业证明",
    items: [
      { name: "商业注册证 (SSM)", description: "Form 9/24/49 或 SSM证书", required: true },
      { name: "营业执照", description: "如适用", required: false },
    ],
  },
  {
    category: "收入证明",
    items: [
      { name: "过去2年财务报表", description: "审计或管理账目", required: true },
      { name: "过去2年所得税表", description: "Form B/BE", required: true },
      { name: "最近6个月银行流水", description: "个人和/或商业账户", required: true },
      { name: "商业合同/发票", description: "证明持续业务", required: false },
    ],
  },
  {
    category: "现有贷款资料",
    items: [
      { name: "贷款合约", description: "现有房贷的贷款协议", required: true },
      { name: "最近还款记录", description: "最近6-12个月的还款记录", required: true },
      { name: "贷款余额证明", description: "银行出具的余额确认函", required: true },
    ],
  },
  {
    category: "房产文件",
    items: [
      { name: "地契", description: "Geran/Strata Title/Individual Title", required: true },
      { name: "买卖合约 (S&P)", description: "房产购买合约", required: true },
    ],
  },
];

const tips = [
  {
    title: "提前准备文件",
    description: "在申请前2-4周开始收集文件，避免因文件不全而延误申请。",
    icon: "📋",
  },
  {
    title: "确保文件清晰",
    description: "所有文件扫描件应清晰可读，避免模糊或残缺的文件。",
    icon: "🔍",
  },
  {
    title: "银行流水要完整",
    description: "确保银行流水显示完整的6个月记录，包括所有页面。",
    icon: "📊",
  },
  {
    title: "更新联系方式",
    description: "确保您的电话号码和地址是最新的，以便银行联系。",
    icon: "📱",
  },
  {
    title: "检查CCRIS记录",
    description: "申请前检查您的CCRIS记录，确保没有不良记录。",
    icon: "✅",
  },
  {
    title: "保留原件备查",
    description: "虽然申请时只需复印件，但请保留所有文件原件备查。",
    icon: "📁",
  },
];

export default function RefinanceXuyaoZiliao() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"employed" | "selfEmployed">("employed");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            再融资需要什么资料?
          </h1>
          <p className="text-lg text-gray-300">
            完整的再融资文件清单，包括受薪员工和自雇人士所需的所有文件。
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
              href="/dokumen-refinance-rumah"
              className="text-primary-600 hover:underline font-medium"
            >
              Bahasa Malaysia
            </Link>
            {" | "}
            <Link
              href="/en/documents-required"
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
              快速清单：
            </h2>
            <p className="text-gray-700">
              再融资申请的<strong>基本文件</strong>包括：身份证、最近3个月薪资单、
              最近6个月银行流水、EPF报表、现有贷款资料、房产文件(地契和S&P)。
              <strong>自雇人士</strong>还需要商业注册证和过去2年的财务报表/所得税表。
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
              准备正确和完整的文件是再融资申请成功的关键。文件不全可能导致申请延误或被拒。
              以下是详细的文件清单，帮助您做好充分准备。
            </p>
          </section>

          {/* Tab Navigation */}
          <section className="mb-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("employed")}
                className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "employed"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                受薪员工
              </button>
              <button
                onClick={() => setActiveTab("selfEmployed")}
                className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "selfEmployed"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                自雇人士
              </button>
            </div>
          </section>

          {/* Documents List */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {activeTab === "employed" ? "受薪员工所需文件" : "自雇人士所需文件"}
            </h2>

            <div className="space-y-6">
              {(activeTab === "employed" ? employedDocuments : selfEmployedDocuments).map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-white p-3 rounded-lg"
                      >
                        <span className={`mt-0.5 ${item.required ? "text-green-500" : "text-gray-400"}`}>
                          {item.required ? "✓" : "○"}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.name}
                            {item.required && (
                              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                                必需
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              文件准备小贴士
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-secondary-50 rounded-lg p-4 border border-secondary-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              常见错误
            </h2>
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-700">
                    <strong>银行流水不完整</strong> - 缺少某些月份或页面
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-700">
                    <strong>薪资单过期</strong> - 提供超过3个月前的薪资单
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-700">
                    <strong>文件模糊不清</strong> - 扫描质量差，无法辨认内容
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-700">
                    <strong>地址不一致</strong> - 各文件上的地址不同
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="text-gray-700">
                    <strong>缺少签名/盖章</strong> - 雇主确认函或财务报表未签名盖章
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Standard Documents Component */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              快速参考清单
            </h2>
            <DocumentsList type="both" lang="zh" />
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
                href="/calculator"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">再融资计算器</h3>
                <p className="text-sm text-primary-700">计算您的潜在节省金额</p>
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
            准备好了吗?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            文件准备好后，获取免费报价开始您的再融资之旅。
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
              <LeadForm variant="modal" source="cn-refinance-xuyao-ziliao" lang="zh" />
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
            headline: `再融资需要什么资料 - 完整文件清单 ${currentYear}`,
            description: `马来西亚再融资申请所需文件完整清单，包括受薪员工和自雇人士的文件要求 ${currentYear}。`,
            datePublished: "2026-01-10",
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
