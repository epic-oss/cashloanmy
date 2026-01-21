"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { DocumentsList } from "@/components/content/DocumentsList";
import { EligibilityCard } from "@/components/content/EligibilityCard";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";

const { currentYear, documents } = SITE_CONFIG;

const propertyDocuments = [
  {
    name: "Geran Hakmilik / Individual Title",
    description:
      "Dokumen yang membuktikan pemilikan hartanah anda. Jika geran masih dengan bank, minta salinan certified.",
    tip: "Pastikan nama dalam geran sama dengan nama dalam MyKad.",
  },
  {
    name: "Sales & Purchase Agreement (S&P)",
    description:
      "Perjanjian jual beli asal hartanah. Diperlukan untuk pengesahan pemilikan dan sejarah transaksi.",
    tip: "Simpan salinan asal di tempat selamat. Sediakan salinan untuk permohonan.",
  },
  {
    name: "Penyata Pinjaman Semasa",
    description:
      "Penyata terkini yang menunjukkan baki pinjaman, kadar faedah, dan bayaran bulanan semasa.",
    tip: "Minta penyata terkini dari bank semasa, tidak lebih dari 1 bulan.",
  },
  {
    name: "Resit Cukai Tanah (Quit Rent)",
    description:
      "Bukti pembayaran cukai tanah terkini kepada pejabat tanah.",
    tip: "Pastikan tiada tunggakan. Bayar dahulu jika ada.",
  },
  {
    name: "Resit Cukai Taksiran (Assessment)",
    description: "Bukti pembayaran cukai pintu terkini kepada majlis tempatan.",
    tip: "Sesetengah bank memerlukan resit untuk 2 tahun terakhir.",
  },
];

const additionalDocuments = [
  {
    name: "Penyata Komisen / Bonus",
    description: "Jika pendapatan termasuk komisen atau bonus tetap.",
    required: "Pekerja dengan pendapatan berubah-ubah",
  },
  {
    name: "Bukti Pendapatan Sewa",
    description: "Perjanjian sewa dan penyata bank yang menunjukkan deposit.",
    required: "Tuan rumah dengan pendapatan sewa",
  },
  {
    name: "Penyata Dividen / Pelaburan",
    description: "Bukti pendapatan dari pelaburan atau dividen saham.",
    required: "Pelabur",
  },
  {
    name: "Surat Pengesahan Pekerjaan Pasangan",
    description: "Jika memohon bersama pasangan (joint application).",
    required: "Permohonan bersama",
  },
  {
    name: "Penyata ASB / Tabung Haji",
    description: "Bukti simpanan dan kedudukan kewangan yang kukuh.",
    required: "Untuk memperkuat permohonan",
  },
];

const tips = [
  {
    title: "Sediakan Salinan & Asal",
    description:
      "Bawa dokumen asal untuk pengesahan dan sediakan sekurang-kurangnya 2 set salinan.",
  },
  {
    title: "Pastikan Dokumen Terkini",
    description:
      "Slip gaji dan penyata bank mesti terkini (tidak lebih dari 3 bulan). Dokumen lama akan ditolak.",
  },
  {
    title: "Semak Nama Konsisten",
    description:
      "Pastikan nama dalam semua dokumen sama dengan nama dalam MyKad. Sebarang perbezaan perlu dokumen sokongan.",
  },
  {
    title: "Scan Berkualiti Tinggi",
    description:
      "Jika menghantar secara dalam talian, pastikan scan jelas dan boleh dibaca. Resolusi minimum 300 DPI.",
  },
  {
    title: "Tandatangan Semua Halaman",
    description:
      "Sesetengah bank memerlukan tandatangan pada setiap halaman dokumen penting.",
  },
  {
    title: "Sediakan Lebih Awal",
    description:
      "Mula mengumpul dokumen 2-4 minggu sebelum memohon. Sesetengah dokumen mengambil masa untuk diperoleh.",
  },
];

const mistakes = [
  {
    mistake: "Penyata bank tidak lengkap",
    solution:
      "Pastikan semua halaman disertakan termasuk halaman pertama yang menunjukkan nama dan nombor akaun.",
  },
  {
    mistake: "Slip gaji tanpa cop syarikat",
    solution:
      "Minta HR untuk cop dan tandatangan slip gaji. Slip tanpa pengesahan mungkin ditolak.",
  },
  {
    mistake: "Dokumen tamat tempoh",
    solution:
      "Semak tarikh dokumen. Penyata bank dan slip gaji mesti dalam tempoh 3 bulan terkini.",
  },
  {
    mistake: "Nama tidak konsisten",
    solution:
      "Jika nama berbeza (contoh: dengan/tanpa bin/binti), sediakan statutory declaration atau dokumen sokongan.",
  },
  {
    mistake: "Tiada bukti alamat semasa",
    solution:
      "Sediakan bil utiliti atau penyata bank terkini yang menunjukkan alamat semasa anda.",
  },
  {
    mistake: "Dokumen hartanah tidak lengkap",
    solution:
      "Pastikan semua halaman S&P dan geran disertakan, bukan hanya halaman pertama.",
  },
];

const faqs = [
  {
    question: "Berapa lama dokumen perlu disiapkan sebelum permohonan?",
    answer:
      "Kami cadangkan mula menyediakan dokumen 2-4 minggu sebelum membuat permohonan. Ini memberi masa untuk mendapatkan dokumen yang mungkin mengambil masa seperti penyata KWSP atau surat pengesahan majikan.",
  },
  {
    question: "Bolehkah hantar dokumen secara dalam talian?",
    answer:
      "Ya, kebanyakan bank kini menerima dokumen secara dalam talian melalui emel atau portal mereka. Pastikan scan berkualiti tinggi (300 DPI minimum) dan fail dalam format PDF atau JPEG.",
  },
  {
    question: "Apa berlaku jika dokumen tidak lengkap?",
    answer:
      "Permohonan dengan dokumen tidak lengkap akan ditangguhkan atau ditolak. Bank akan meminta dokumen tambahan yang boleh melambatkan proses sehingga beberapa minggu.",
  },
  {
    question: "Adakah dokumen pasangan diperlukan?",
    answer:
      "Jika memohon bersama (joint application), dokumen kewangan pasangan juga diperlukan. Untuk permohonan individu, dokumen pasangan tidak diperlukan kecuali mereka adalah penjamin.",
  },
  {
    question: "Bagaimana jika saya bekerja sendiri kurang dari 2 tahun?",
    answer:
      "Kebanyakan bank memerlukan minimum 2 tahun rekod perniagaan. Jika kurang, anda mungkin perlu penjamin atau menunggu sehingga tempoh tersebut dicapai. Sesetengah bank lebih fleksibel - dapatkan nasihat dari pakar kami.",
  },
];

export default function DokumenRefinanceRumah() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Senarai Dokumen Refinance Rumah Malaysia {currentYear}
          </h1>
          <p className="text-lg text-gray-300">
            Panduan lengkap dokumen yang diperlukan untuk memastikan permohonan
            refinance anda berjaya.
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
              Menyediakan dokumen yang lengkap dan tepat adalah kunci kepada
              permohonan refinance yang lancar dan cepat diluluskan. Dokumen
              yang tidak lengkap adalah antara punca utama kelewatan atau
              penolakan permohonan.
            </p>
            <p className="text-lg text-gray-700">
              Dalam panduan ini, kami senaraikan semua dokumen yang diperlukan
              untuk refinance rumah di Malaysia, dengan tips untuk mempercepatkan
              proses permohonan anda.
            </p>
          </section>

          {/* Documents for Employed */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dokumen Untuk Pekerja Bergaji
            </h2>
            <div className="bg-primary-50 rounded-xl p-6 mb-6">
              <ul className="space-y-4">
                {documents.employed.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  📋 Slip Gaji - Tips Penting
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Slip gaji 3 bulan berturut-turut (bulan terkini)</li>
                  <li>
                    Mesti ada cop syarikat dan tandatangan HR/pengurus
                  </li>
                  <li>
                    Nama, jawatan, dan gaji pokok mesti jelas tertera
                  </li>
                  <li>Jika gaji tidak tetap, sertakan juga slip 6 bulan</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🏦 Penyata Bank - Tips Penting
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Penyata 6 bulan berturut-turut dari akaun gaji</li>
                  <li>
                    Semua halaman mesti disertakan termasuk halaman pertama
                  </li>
                  <li>
                    Kredit gaji mesti konsisten setiap bulan
                  </li>
                  <li>Elakkan pengeluaran besar yang mencurigakan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Documents for Self-Employed */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dokumen Untuk Bekerja Sendiri
            </h2>
            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <ul className="space-y-4">
                {documents.selfEmployed.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">
                ⚠️ Nota Penting Untuk Usahawan
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>
                  Minimum 2 tahun rekod perniagaan diperlukan oleh kebanyakan bank
                </li>
                <li>
                  Penyata bank peribadi DAN akaun syarikat kedua-duanya diperlukan
                </li>
                <li>
                  Borang B / Cukai Pendapatan 2 tahun terkini mesti disertakan
                </li>
                <li>
                  Jika syarikat Sdn Bhd, sertakan juga Form 24 & 49
                </li>
              </ul>
            </div>
          </section>

          {/* Property Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dokumen Hartanah
            </h2>

            <div className="space-y-4">
              {propertyDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {doc.description}
                      </p>
                      <p className="text-sm text-secondary-600 mt-2">
                        <strong>💡 Tip:</strong> {doc.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dokumen Tambahan (Jika Ada)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-semibold border">
                      Dokumen
                    </th>
                    <th className="text-left p-3 font-semibold border">
                      Keterangan
                    </th>
                    <th className="text-left p-3 font-semibold border">
                      Diperlukan Untuk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {additionalDocuments.map((doc, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-3 border font-medium">{doc.name}</td>
                      <td className="p-3 border text-sm text-gray-600">
                        {doc.description}
                      </td>
                      <td className="p-3 border text-sm">{doc.required}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Checklist */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ✅ Checklist Dokumen (Boleh Print)
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
              <h3 className="font-semibold text-gray-900 mb-4">
                Pekerja Bergaji:
              </h3>
              <div className="grid md:grid-cols-2 gap-2 mb-6">
                {documents.employed.map((doc, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="text-sm">{doc}</span>
                  </label>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">
                Dokumen Hartanah:
              </h3>
              <div className="grid md:grid-cols-2 gap-2 mb-6">
                {propertyDocuments.map((doc, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="text-sm">{doc.name}</span>
                  </label>
                ))}
              </div>

              <p className="text-xs text-gray-500 text-center">
                💡 Print halaman ini dan tandakan dokumen yang telah disediakan
              </p>
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tips Menyediakan Dokumen
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-secondary-50 rounded-lg p-4 border border-secondary-200"
                >
                  <h4 className="font-semibold text-secondary-900 mb-2">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-secondary-700">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kesilapan Biasa Dalam Permohonan
            </h2>

            <div className="space-y-4">
              {mistakes.map((item, index) => (
                <div
                  key={index}
                  className="border border-red-200 rounded-lg overflow-hidden"
                >
                  <div className="bg-red-50 px-4 py-2 border-b border-red-200">
                    <h4 className="font-semibold text-red-800">
                      ❌ {item.mistake}
                    </h4>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700">
                      <span className="text-secondary-600 font-medium">
                        ✅ Penyelesaian:
                      </span>{" "}
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Eligibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Syarat Kelayakan Refinance
            </h2>
            <p className="text-gray-700 mb-4">
              Selain dokumen lengkap, pastikan anda juga memenuhi syarat
              kelayakan asas:
            </p>
            <EligibilityCard lang="ms" />
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
                href="/bank-terbaik-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Bank Terbaik Untuk Refinance
                </h3>
                <p className="text-sm text-primary-700">
                  Bandingkan kadar dari 10+ bank utama
                </p>
              </Link>
              <Link
                href="/berapa-tahun-boleh-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Bila Boleh Refinance?
                </h3>
                <p className="text-sm text-primary-700">
                  Ketahui tempoh dan syarat refinancing
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
            Perlukan Bantuan Dengan Dokumen?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Pakar kami akan membimbing anda menyediakan dokumen yang lengkap
            untuk kelulusan pantas.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-block text-lg px-8 py-4"
          >
            Dapatkan Konsultasi Percuma
          </button>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Dapatkan Bantuan</h3>
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
              <LeadForm variant="modal" source="dokumen-refinance" />
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
