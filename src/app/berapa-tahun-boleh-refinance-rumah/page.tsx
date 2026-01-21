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

const { currentYear, eligibility } = SITE_CONFIG;
const banks = getBanksSortedByRate();

const lockInPeriods = banks.slice(0, 8).map((bank) => ({
  bank: bank.name,
  lockIn: bank.lockIn,
  penalty: bank.earlySettlement,
}));

const faqs = [
  {
    question: "Berapa tahun minimum untuk refinance rumah?",
    answer:
      "Tiada tahun minimum untuk refinance rumah. Anda boleh refinance bila-bila masa selepas pembelian. Namun, jika masih dalam tempoh lock-in (biasanya 3-5 tahun), anda perlu bayar penalti 2-3% dari baki pinjaman.",
  },
  {
    question: "Bolehkah refinance sebelum 3 tahun?",
    answer:
      "Ya, boleh. Tetapi anda perlu membayar penalti lock-in yang boleh mencecah ribuan ringgit. Contoh: Baki RM300,000 × 3% penalti = RM9,000. Pastikan penjimatan dari kadar baru melebihi penalti sebelum refinance awal.",
  },
  {
    question: "Berapa penalti jika refinance sebelum lock-in tamat?",
    answer:
      "Penalti berbeza mengikut bank, biasanya 2-3% dari baki pinjaman. Sesetengah bank mengurangkan penalti setiap tahun. Contoh: Tahun 1 = 3%, Tahun 2 = 2%, Tahun 3 = 1%. Semak perjanjian pinjaman anda untuk kadar tepat.",
  },
  {
    question: "Bila waktu terbaik untuk refinance rumah?",
    answer:
      "Waktu terbaik adalah: (1) Selepas tempoh lock-in tamat, (2) Apabila kadar pasaran 0.5%+ lebih rendah dari kadar anda, (3) Baki pinjaman masih besar (RM100k+), (4) Tempoh pinjaman masih panjang (10+ tahun), (5) Profil kewangan anda telah bertambah baik.",
  },
  {
    question: "Bolehkah refinance rumah yang masih dalam pembinaan?",
    answer:
      "Tidak. Rumah mesti sudah siap dan geran hakmilik sudah dikeluarkan sebelum boleh refinance. Untuk rumah dalam pembinaan, anda masih terikat dengan pinjaman pemaju sehingga projek siap.",
  },
  {
    question: "Berapa kerap boleh refinance rumah?",
    answer:
      "Tiada had berapa kerap anda boleh refinance. Namun, setiap refinance melibatkan kos dan tempoh lock-in baru. Adalah bijak untuk refinance hanya apabila penjimatan benar-benar berbaloi berbanding kos yang terlibat.",
  },
  {
    question: "Adakah umur mempengaruhi kelayakan refinance?",
    answer: `Ya. Kebanyakan bank memerlukan umur minimum ${eligibility.minAge} tahun dan maksimum ${eligibility.maxAge} tahun pada akhir tempoh pinjaman. Contoh: Jika anda 55 tahun, tempoh maksimum mungkin hanya 10 tahun (untuk habis sebelum umur 65).`,
  },
];

const bestTimes = [
  {
    title: "Selepas Tempoh Lock-in Tamat",
    description:
      "Ini adalah waktu paling ideal kerana anda tidak perlu membayar sebarang penalti.",
    icon: "🔓",
  },
  {
    title: "Kadar Pasaran Menurun",
    description:
      "Apabila BLR/BR menurun atau bank menawarkan kadar promosi yang lebih rendah dari kadar anda.",
    icon: "📉",
  },
  {
    title: "Profil Kewangan Bertambah Baik",
    description:
      "Kenaikan gaji, skor kredit meningkat, atau hutang lain berkurang boleh melayakkan anda untuk kadar lebih baik.",
    icon: "📈",
  },
  {
    title: "Perlukan Cash Out",
    description:
      "Jika nilai rumah meningkat dan anda perlukan wang untuk keperluan penting seperti pengubahsuaian atau pendidikan.",
    icon: "💰",
  },
  {
    title: "Menukar Jenis Pinjaman",
    description:
      "Tukar dari konvensional ke Islamik, atau dari kadar tetap ke terapung (atau sebaliknya).",
    icon: "🔄",
  },
];

export default function BerapaTahunBolehRefinanceRumah() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Berapa Tahun Boleh Refinance Rumah Malaysia?
          </h1>
          <p className="text-lg text-gray-300">
            Panduan lengkap tentang tempoh, syarat, dan waktu terbaik untuk
            refinance pinjaman perumahan anda.
          </p>
          <LastUpdated lang="ms" variant="hero" />
        </div>
      </section>

      {/* Quick Answer - Featured Snippet */}
      <section className="py-8 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-secondary-500">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Jawapan Ringkas:
            </h2>
            <p className="text-gray-700">
              <strong>Anda boleh refinance rumah bila-bila masa</strong>, tetapi
              disyorkan untuk menunggu sehingga{" "}
              <strong>tempoh lock-in tamat (biasanya 3-5 tahun)</strong> untuk
              mengelakkan penalti 2-3% dari baki pinjaman. Selepas lock-in
              tamat, anda bebas refinance tanpa sebarang penalti.
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
              Ramai pemilik rumah tertanya-tanya bilakah masa yang sesuai untuk
              refinance pinjaman perumahan mereka. Jawapannya bergantung kepada
              beberapa faktor termasuk tempoh lock-in, kadar faedah semasa, dan
              situasi kewangan anda.
            </p>
            <p className="text-lg text-gray-700">
              Dalam panduan ini, kami jelaskan secara terperinci tentang tempoh
              minimum, penalti lock-in, dan waktu terbaik untuk refinance rumah
              di Malaysia.
            </p>
          </section>

          {/* Lock-in Periods by Bank */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tempoh Lock-in Mengikut Bank
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="text-left p-4 font-semibold border">Bank</th>
                    <th className="text-left p-4 font-semibold border">
                      Tempoh Lock-in
                    </th>
                    <th className="text-left p-4 font-semibold border">
                      Penalti Awal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lockInPeriods.map((item, index) => (
                    <tr
                      key={item.bank}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-4 border font-medium">{item.bank}</td>
                      <td className="p-4 border">{item.lockIn} tahun</td>
                      <td className="p-4 border text-red-600">{item.penalty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              * Tempoh lock-in dan penalti mungkin berbeza mengikut pakej
              pinjaman. Semak perjanjian pinjaman anda untuk maklumat tepat.
            </p>
          </section>

          {/* Penalty Calculation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Penalti Jika Refinance Sebelum Lock-in Tamat
            </h2>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-6">
              <h3 className="font-semibold text-red-800 mb-4">
                Formula Pengiraan Penalti:
              </h3>
              <div className="bg-white rounded-lg p-4 text-center mb-4">
                <p className="font-mono text-lg text-red-700">
                  Penalti = Baki Pinjaman × Kadar Penalti (%)
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>Baki RM200,000 × 3%</span>
                  <span className="font-bold text-red-600">= RM6,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>Baki RM300,000 × 3%</span>
                  <span className="font-bold text-red-600">= RM9,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>Baki RM500,000 × 3%</span>
                  <span className="font-bold text-red-600">= RM15,000</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>💡 Tip:</strong> Sesetengah bank mengurangkan kadar
                penalti setiap tahun. Contoh: Tahun 1 = 3%, Tahun 2 = 2%, Tahun
                3 = 1%. Semak dengan bank anda tentang struktur penalti yang
                tepat.
              </p>
            </div>
          </section>

          {/* Best Time to Refinance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bila Waktu Terbaik Untuk Refinance?
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
              Syarat Kelayakan Refinance
            </h2>
            <p className="text-gray-700 mb-4">
              Selain masa yang sesuai, pastikan anda memenuhi syarat kelayakan
              asas berikut:
            </p>
            <EligibilityCard lang="ms" />
          </section>

          {/* Refinance Ongoing Loan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Refinance Rumah Belum Habis Bayar
            </h2>

            <div className="prose prose-lg max-w-none">
              <p>
                Ya, anda boleh refinance rumah yang masih ada baki pinjaman.
                Sebenarnya, inilah situasi yang paling biasa untuk refinancing.
                Proses yang berlaku:
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  step: 1,
                  text: "Bank baru akan menilai hartanah dan profil kewangan anda",
                },
                {
                  step: 2,
                  text: "Setelah diluluskan, bank baru akan melangsaikan baki pinjaman bank lama",
                },
                {
                  step: 3,
                  text: "Anda akan mula membuat bayaran kepada bank baru dengan kadar yang lebih rendah",
                },
                {
                  step: 4,
                  text: "Jika ada cash out, baki akan dikreditkan ke akaun anda",
                },
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

          {/* Refinance Paid Off Home */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Refinance Rumah Sudah Habis Bayar
            </h2>

            <div className="bg-primary-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Jika rumah anda sudah habis bayar, anda masih boleh &quot;refinance&quot;
                untuk mendapatkan wang tunai. Ini dipanggil{" "}
                <strong>Cash Out Refinancing</strong>.
              </p>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Contoh Senario:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Nilai rumah semasa: RM600,000</li>
                  <li>• Baki pinjaman: RM0 (sudah habis bayar)</li>
                  <li>• Margin pinjaman (90% LTV): RM540,000</li>
                  <li>• Cash out yang boleh diperolehi: Sehingga RM540,000</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">
                  Wang ini boleh digunakan untuk pelaburan, pengubahsuaian,
                  pendidikan anak, atau modal perniagaan.
                </p>
              </div>
            </div>
          </section>

          {/* Bank Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kadar Refinance Semasa
            </h2>
            <BankRatesTable limit={5} lang="ms" />
          </section>

          {/* Steps to Refinance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Langkah-langkah Untuk Refinance
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Semak Tempoh Lock-in Semasa",
                  desc: "Semak perjanjian pinjaman untuk memastikan tempoh lock-in telah tamat atau kira penalti jika belum.",
                },
                {
                  step: 2,
                  title: "Bandingkan Kadar Bank",
                  desc: "Gunakan jadual perbandingan kami untuk melihat kadar terkini dari semua bank utama.",
                },
                {
                  step: 3,
                  title: "Kira Penjimatan",
                  desc: "Gunakan kalkulator untuk melihat sama ada penjimatan berbaloi dengan kos refinancing.",
                },
                {
                  step: 4,
                  title: "Sediakan Dokumen",
                  desc: "Kumpul semua dokumen yang diperlukan termasuk slip gaji, penyata bank, dan dokumen hartanah.",
                },
                {
                  step: 5,
                  title: "Hantar Permohonan",
                  desc: "Hantar permohonan ke bank pilihan anda atau gunakan perkhidmatan kami untuk memohon di beberapa bank serentak.",
                },
                {
                  step: 6,
                  title: "Penilaian Hartanah",
                  desc: "Bank akan menghantar penilai untuk menilai hartanah anda.",
                },
                {
                  step: 7,
                  title: "Tandatangan & Disbursement",
                  desc: "Setelah diluluskan, tandatangan dokumen dan tunggu pengeluaran wang.",
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

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Soalan Lazim
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
                  Kira penjimatan anda dengan kadar terkini
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
                  Dokumen yang diperlukan untuk permohonan
                </p>
              </Link>
              <Link
                href="/bank-terbaik-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Bank Terbaik Untuk Refinance
                </h3>
                <p className="text-sm text-primary-700">
                  Bandingkan kadar dari 10+ bank
                </p>
              </Link>
              <Link
                href="/kelebihan-keburukan-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Kelebihan & Keburukan
                </h3>
                <p className="text-sm text-primary-700">
                  Ketahui pro dan kontra refinancing
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
            Sedia Untuk Refinance?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Dapatkan sebut harga percuma dan biarkan pakar kami membantu anda
            memilih waktu dan bank terbaik.
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
              <LeadForm variant="modal" source="berapa-tahun-refinance" />
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

      <BackToTop />
    </>
  );
}
