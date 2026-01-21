"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getBanksSortedByRate } from "@/lib/constants";
import { BankRatesTable } from "@/components/content/BankRatesTable";
import { CostsTable } from "@/components/content/CostsTable";
import { EligibilityCard } from "@/components/content/EligibilityCard";
import { DocumentsList } from "@/components/content/DocumentsList";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";

const { currentYear, lastUpdated } = SITE_CONFIG;

// Get top 3 banks sorted by rate
const topBanks = getBanksSortedByRate().slice(0, 3);

const faqs = [
  {
    question: "Bank mana yang terbaik untuk refinance rumah?",
    answer: `Berdasarkan kadar faedah terendah pada ${currentYear}, ${topBanks[0].name} menawarkan kadar serendah ${topBanks[0].rateFrom}, diikuti oleh ${topBanks[1].name} (${topBanks[1].rateFrom}) dan ${topBanks[2].name} (${topBanks[2].rateFrom}). Walau bagaimanapun, bank terbaik bergantung kepada profil kewangan anda, jumlah pinjaman, dan keperluan khusus anda.`,
  },
  {
    question: "Berapa lama proses refinance rumah?",
    answer:
      "Proses refinance rumah biasanya mengambil masa 1-3 bulan dari permohonan hingga pengeluaran wang. Ini termasuk penilaian hartanah (1-2 minggu), kelulusan bank (2-4 minggu), dan proses guaman (4-6 minggu). Tempoh sebenar bergantung kepada kelengkapan dokumen dan bank yang dipilih.",
  },
  {
    question: "Bolehkah refinance dengan bank yang sama?",
    answer:
      "Ya, anda boleh refinance dengan bank yang sama. Ini dipanggil 'repricing' atau 'internal refinancing'. Kelebihan refinance dengan bank sama termasuk proses lebih cepat dan kos guaman yang lebih rendah. Walau bagaimanapun, bank lain mungkin menawarkan kadar yang lebih kompetitif.",
  },
  {
    question: "Bila waktu terbaik untuk refinance rumah?",
    answer:
      "Waktu terbaik untuk refinance adalah apabila: (1) Tempoh lock-in telah tamat (biasanya 3-5 tahun), (2) Kadar faedah pasaran lebih rendah 0.5% atau lebih dari kadar semasa anda, (3) Baki pinjaman masih besar dan tempoh masih panjang, (4) Profil kewangan anda telah bertambah baik.",
  },
  {
    question: "Berapa kos refinance rumah?",
    answer: `Kos refinance rumah termasuk: Yuran guaman (${SITE_CONFIG.costs.legalFeesText}), Yuran penilaian (${SITE_CONFIG.costs.valuationFeesText}), Duti setem (${SITE_CONFIG.costs.stampDutyText} dari jumlah pinjaman, mungkin dikecualikan), dan MRTA/MLTA (pilihan). Banyak bank menawarkan pakej yang menampung sebahagian atau semua kos ini.`,
  },
  {
    question: "Apakah syarat kelayakan untuk refinance rumah?",
    answer: `Syarat asas kelayakan refinance: Umur ${SITE_CONFIG.eligibility.minAge}-${SITE_CONFIG.eligibility.maxAge} tahun, pendapatan minimum RM${SITE_CONFIG.eligibility.minIncome.toLocaleString()}/bulan, DSR tidak melebihi ${SITE_CONFIG.eligibility.maxDSR}%, tempoh bekerja minimum ${SITE_CONFIG.eligibility.minEmploymentMonths} bulan (pekerja bergaji) atau ${SITE_CONFIG.eligibility.minBusinessYears} tahun (bekerja sendiri), dan tiada rekod CCRIS/CTOS yang buruk.`,
  },
  {
    question: "Adakah refinance rumah sesuai untuk saya?",
    answer:
      "Refinance sesuai untuk anda jika: Beza kadar faedah sekurang-kurangnya 0.5%, baki pinjaman melebihi RM100,000, tempoh pinjaman masih 10+ tahun, anda merancang untuk kekal di rumah tersebut, dan penjimatan melebihi kos refinance. Gunakan kalkulator kami untuk kiraan tepat.",
  },
];

export default function BankTerbaikRefinanceRumah() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Bank Terbaik Untuk Refinance Rumah Malaysia {currentYear}
          </h1>
          <p className="text-lg text-gray-300">
            Panduan lengkap untuk memilih bank terbaik bagi refinance pinjaman
            perumahan anda.
          </p>
          <LastUpdated lang="ms" variant="hero" />
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 mb-4">
              Memilih bank yang tepat untuk refinance rumah adalah keputusan
              kewangan yang penting. Dengan perbezaan kadar faedah yang kecil
              pun boleh menjimatkan puluhan ribu ringgit sepanjang tempoh
              pinjaman anda. Di Malaysia, terdapat lebih 10 bank utama yang
              menawarkan pakej refinancing dengan kadar dan terma yang berbeza.
            </p>
            <p className="text-lg text-gray-700">
              Dalam panduan komprehensif ini, kami bandingkan kadar refinance
              dari semua bank utama di Malaysia untuk membantu anda membuat
              keputusan yang tepat. Data kadar dikemaskini secara berkala untuk
              memastikan anda mendapat maklumat terkini.
            </p>
          </section>

          {/* Bank Rates Table */}
          <section className="mb-12">
            <BankRatesTable showAll={true} lang="ms" />
          </section>

          {/* Faktor Pemilihan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Faktor Pemilihan Bank Terbaik Untuk Refinance
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  1. Kadar Faedah
                </h3>
                <p className="text-gray-700">
                  Kadar faedah adalah faktor utama dalam memilih bank untuk
                  refinance. Perbezaan 0.5% dalam kadar faedah boleh
                  menjimatkan RM200-500 sebulan bergantung kepada jumlah
                  pinjaman anda. Bandingkan kadar efektif (effective rate)
                  bukan hanya kadar yang diiklankan.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  2. Tempoh Lock-in
                </h3>
                <p className="text-gray-700">
                  Kebanyakan bank mengenakan tempoh lock-in 3-5 tahun. Jika anda
                  refinance atau melangsaikan pinjaman sebelum tempoh ini tamat,
                  anda akan dikenakan penalti 2-3% dari baki pinjaman. Pilih
                  tempoh lock-in yang sesuai dengan perancangan kewangan anda.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  3. Kos Tambahan
                </h3>
                <p className="text-gray-700">
                  Selain kadar faedah, pertimbangkan kos guaman, penilaian, dan
                  duti setem. Sesetengah bank menawarkan pakej &quot;zero
                  cost&quot; yang menanggung sebahagian atau semua kos ini.
                  Pastikan anda mengira jumlah kos sebenar sebelum membuat
                  keputusan.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  4. Perkhidmatan Pelanggan
                </h3>
                <p className="text-gray-700">
                  Kualiti perkhidmatan pelanggan penting terutama semasa proses
                  permohonan. Bank dengan sistem dalam talian yang baik dan
                  pegawai yang responsif boleh mempercepatkan proses refinance
                  anda. Baca ulasan pelanggan sebelum membuat pilihan.
                </p>
              </div>
            </div>
          </section>

          {/* Top 3 Banks */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Top 3 Bank Untuk Refinance Rumah {currentYear}
            </h2>

            <div className="space-y-6">
              {topBanks.map((bank, index) => (
                <div
                  key={bank.name}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {bank.nameFull}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Kadar dari</p>
                      <p className="text-2xl font-bold text-secondary-600">
                        {bank.rateFrom}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Kelebihan:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {bank.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-secondary-500"
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
                            {feature}
                          </li>
                        ))}
                        <li className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-secondary-500"
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
                          Tempoh sehingga {bank.maxTenure} tahun
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Maklumat Penting:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Lock-in: {bank.lockIn} tahun</li>
                        <li>LTV maksimum: {bank.maxLTV}%</li>
                        <li>
                          Pinjaman minimum: RM
                          {bank.minLoan.toLocaleString()}
                        </li>
                        <li>Terbaik untuk: {bank.bestFor}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Costs Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kos Refinance Rumah {currentYear}
            </h2>
            <p className="text-gray-700 mb-4">
              Sebelum membuat keputusan, pastikan anda mengambil kira semua kos
              yang terlibat dalam proses refinancing:
            </p>
            <CostsTable lang="ms" />
          </section>

          {/* Eligibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Syarat Kelayakan Refinance
            </h2>
            <p className="text-gray-700 mb-4">
              Untuk layak refinance rumah di Malaysia, anda perlu memenuhi
              syarat-syarat asas berikut:
            </p>
            <EligibilityCard lang="ms" />
          </section>

          {/* Process Steps */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Proses Refinance Langkah Demi Langkah
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Semak Kelayakan & Bandingkan Kadar",
                  desc: "Gunakan kalkulator kami untuk menyemak sama ada refinance berbaloi untuk anda. Bandingkan kadar dari pelbagai bank.",
                },
                {
                  step: 2,
                  title: "Pilih Bank & Hantar Permohonan",
                  desc: "Setelah memilih bank, hantar permohonan beserta dokumen yang diperlukan. Anda boleh memohon di beberapa bank serentak.",
                },
                {
                  step: 3,
                  title: "Penilaian Hartanah",
                  desc: "Bank akan menghantar penilai untuk menilai hartanah anda. Proses ini mengambil masa 1-2 minggu.",
                },
                {
                  step: 4,
                  title: "Kelulusan Pinjaman",
                  desc: "Bank akan menilai permohonan anda berdasarkan profil kewangan dan nilai hartanah. Kelulusan biasanya dalam 2-4 minggu.",
                },
                {
                  step: 5,
                  title: "Tandatangan Dokumen Guaman",
                  desc: "Setelah diluluskan, anda akan menandatangan perjanjian pinjaman dan dokumen berkaitan dengan peguam.",
                },
                {
                  step: 6,
                  title: "Pengeluaran Wang (Disbursement)",
                  desc: "Bank baru akan melangsaikan pinjaman bank lama dan baki (jika cash out) akan dikreditkan ke akaun anda.",
                },
                {
                  step: 7,
                  title: "Mula Bayaran Baru",
                  desc: "Anda akan mula membuat bayaran bulanan dengan kadar baru yang lebih rendah.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dokumen Diperlukan Untuk Refinance
            </h2>
            <p className="text-gray-700 mb-4">
              Pastikan anda menyediakan semua dokumen berikut untuk mempercepatkan
              proses permohonan:
            </p>
            <DocumentsList type="both" lang="ms" />
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Soalan Lazim (FAQ)
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

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Panduan Berkaitan
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/calculator"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Kalkulator Refinance
                </h3>
                <p className="text-sm text-primary-700">
                  Kira penjimatan anda dengan kalkulator percuma kami
                </p>
              </Link>
              <Link
                href="/kelebihan-keburukan-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Kelebihan & Keburukan Refinance
                </h3>
                <p className="text-sm text-primary-700">
                  Ketahui pro dan kontra sebelum membuat keputusan
                </p>
              </Link>
              <Link
                href="/contoh-kiraan-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Contoh Kiraan Refinance
                </h3>
                <p className="text-sm text-primary-700">
                  Lihat contoh pengiraan sebenar dengan pelbagai senario
                </p>
              </Link>
              <Link
                href="/dokumen-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Senarai Dokumen Refinance
                </h3>
                <p className="text-sm text-primary-700">
                  Senarai lengkap dokumen yang diperlukan
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sedia Untuk Mula Menjimat?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Dapatkan sebut harga percuma dari bank-bank terbaik di Malaysia hari
            ini.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-block text-lg px-8 py-4"
          >
            Dapatkan Sebut Harga Percuma
          </button>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Dapatkan Sebut Harga</h3>
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
              <LeadForm variant="modal" source="bank-terbaik-refinance" />
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
            headline: `Bank Terbaik Untuk Refinance Rumah Malaysia ${currentYear}`,
            description: `Bandingkan kadar refinance rumah dari 10+ bank di Malaysia. Ketahui bank mana yang menawarkan kadar terendah untuk refinance ${currentYear}.`,
            datePublished: "2026-01-21",
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
    </>
  );
}
