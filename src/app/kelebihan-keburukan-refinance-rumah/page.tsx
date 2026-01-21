"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getLowestRate } from "@/lib/constants";
import { CostsTable } from "@/components/content/CostsTable";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";

const { currentYear, costs } = SITE_CONFIG;
const lowestRateBank = getLowestRate();

const kelebihan = [
  {
    title: "Kadar Faedah Lebih Rendah",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    description:
      "Dengan kadar faedah serendah " + lowestRateBank.rateFrom + " dari " + lowestRateBank.name + ", anda boleh menjimatkan ratusan ringgit setiap bulan berbanding kadar lama yang mungkin 4.5% atau lebih tinggi.",
    example:
      "Contoh: Pinjaman RM400,000 dengan kadar 4.75% berbanding 3.85% boleh jimat RM200-400 sebulan.",
  },
  {
    title: "Bayaran Bulanan Berkurang",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Bayaran bulanan yang lebih rendah memberi anda lebih banyak wang tunai untuk keperluan lain seperti pendidikan anak, simpanan, atau pelaburan.",
    example:
      "Contoh: Jimat RM300/bulan = RM3,600/tahun untuk perbelanjaan keluarga atau simpanan.",
  },
  {
    title: "Cash Out Untuk Keperluan Lain",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description:
      "Refinance membolehkan anda mengakses ekuiti rumah untuk keperluan penting seperti pengubahsuaian, pendidikan, modal perniagaan, atau pelaburan hartanah kedua.",
    example:
      "Contoh: Rumah bernilai RM600k dengan baki RM300k boleh cash out sehingga RM240k (90% LTV).",
  },
  {
    title: "Gabungkan Hutang (Debt Consolidation)",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    description:
      "Gabungkan hutang kad kredit, pinjaman peribadi, dan hutang kereta ke dalam satu pinjaman dengan kadar faedah yang lebih rendah dan satu bayaran bulanan sahaja.",
    example:
      "Contoh: Hutang kad kredit 18% + pinjaman peribadi 12% boleh digabungkan ke kadar 3.85%.",
  },
  {
    title: "Tukar Jenis Pinjaman",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    description:
      "Tukar dari pinjaman konvensional ke pinjaman Islamik (atau sebaliknya), atau dari kadar tetap ke kadar terapung mengikut kesesuaian anda.",
    example:
      "Contoh: Tukar ke pinjaman Islamik untuk ketenangan fikiran atau ke kadar terapung jika menjangka kadar menurun.",
  },
  {
    title: "Tempoh Pinjaman Fleksibel",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Perpendekkan tempoh untuk jimat jumlah faedah keseluruhan, atau panjangkan tempoh untuk kurangkan bayaran bulanan mengikut kemampuan semasa.",
    example:
      "Contoh: Pendekkan dari 25 tahun ke 15 tahun untuk jimat RM100k+ dalam jumlah faedah.",
  },
  {
    title: "Pindah ke Bank Lebih Baik",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description:
      "Pindah ke bank yang menawarkan perkhidmatan lebih baik, aplikasi dalam talian yang lebih mesra pengguna, atau lokasi cawangan yang lebih sesuai.",
    example:
      "Contoh: Pindah ke bank dengan aplikasi mobile banking yang lebih baik untuk kemudahan pembayaran.",
  },
];

const keburukan = [
  {
    title: "Kos Refinancing",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: `Refinance melibatkan kos seperti yuran guaman (${costs.legalFeesText}), yuran penilaian (${costs.valuationFeesText}), dan duti setem. Jumlah kos boleh mencecah RM5,000-15,000.`,
    mitigation:
      "Cara atasi: Pilih bank yang menawarkan pakej 'zero cost' atau subsidi kos. Pastikan penjimatan melebihi kos dalam 2-3 tahun.",
  },
  {
    title: "Penalti Lock-in",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    description:
      "Jika anda refinance sebelum tempoh lock-in semasa tamat, anda perlu bayar penalti 2-3% dari baki pinjaman yang boleh mencecah puluhan ribu ringgit.",
    mitigation:
      "Cara atasi: Tunggu sehingga tempoh lock-in tamat. Semak tarikh lock-in dalam perjanjian pinjaman anda.",
  },
  {
    title: "Proses Yang Panjang",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Proses refinance mengambil masa 1-3 bulan dan memerlukan banyak dokumen. Anda perlu berurusan dengan bank, peguam, dan penilai hartanah.",
    mitigation:
      "Cara atasi: Sediakan semua dokumen lebih awal. Gunakan perkhidmatan ejen yang berpengalaman untuk mempercepatkan proses.",
  },
  {
    title: "Risiko Penolakan",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    description:
      "Permohonan refinance boleh ditolak jika profil kewangan anda tidak memenuhi syarat, seperti DSR tinggi, rekod CCRIS buruk, atau nilai hartanah tidak mencukupi.",
    mitigation:
      "Cara atasi: Semak kelayakan anda terlebih dahulu. Perbaiki profil kewangan sebelum memohon. Mohon di beberapa bank serentak.",
  },
  {
    title: "Tempoh Pinjaman Dilanjutkan",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    description:
      "Sesetengah peminjam melanjutkan tempoh pinjaman untuk mengurangkan bayaran bulanan, tetapi ini bermakna membayar lebih banyak faedah secara keseluruhan.",
    mitigation:
      "Cara atasi: Kekalkan atau kurangkan tempoh pinjaman jika mampu. Fokus pada pengurangan kadar faedah, bukan tempoh.",
  },
];

const faqs = [
  {
    question: "Adakah refinance rumah sesuai untuk semua orang?",
    answer:
      "Tidak semestinya. Refinance sesuai jika anda boleh mendapat kadar faedah sekurang-kurangnya 0.5% lebih rendah, baki pinjaman masih besar (RM100k+), dan tempoh pinjaman masih panjang (10+ tahun). Jika baki tinggal sedikit atau hampir habis bayar, kos refinance mungkin tidak berbaloi.",
  },
  {
    question: "Berapa lama untuk pulih kos refinance (break-even)?",
    answer:
      "Tempoh break-even biasanya 12-24 bulan bergantung kepada penjimatan bulanan dan jumlah kos. Contoh: Jika jimat RM300/bulan dan kos RM5,000, break-even dalam 17 bulan. Gunakan kalkulator kami untuk kiraan tepat.",
  },
  {
    question: "Bolehkah refinance jika ada rekod CCRIS/CTOS?",
    answer:
      "Bergantung kepada tahap teruk rekod tersebut. Pembayaran lewat beberapa hari mungkin masih boleh dipertimbangkan, tetapi kemungkiran serius akan menyukarkan kelulusan. Sesetengah bank lebih fleksibel - dapatkan nasihat daripada pakar kami.",
  },
  {
    question: "Apakah perbezaan refinance dan repricing?",
    answer:
      "Repricing adalah rundingan semula kadar dengan bank yang sama tanpa menukar bank - prosesnya lebih mudah dan kos lebih rendah. Refinance melibatkan pemindahan ke bank lain dengan proses yang lebih panjang tetapi potensi kadar yang lebih kompetitif.",
  },
  {
    question: "Adakah nilai rumah mempengaruhi refinance?",
    answer:
      "Ya, sangat mempengaruhi. Bank akan menilai semula hartanah anda. Jika nilai meningkat, anda mungkin layak untuk pinjaman lebih besar (cash out). Jika nilai menurun, margin pinjaman mungkin dikurangkan atau permohonan ditolak.",
  },
];

export default function KelebihanKeburukanRefinanceRumah() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Kelebihan & Keburukan Refinance Rumah Malaysia {currentYear}
          </h1>
          <p className="text-lg text-gray-300">
            Ketahui pro dan kontra sebelum membuat keputusan refinancing yang
            bijak.
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
              Refinance rumah adalah proses menggantikan pinjaman perumahan
              sedia ada dengan pinjaman baru, biasanya dengan kadar faedah yang
              lebih rendah atau terma yang lebih baik. Seperti keputusan
              kewangan lain, refinancing mempunyai kelebihan dan keburukan yang
              perlu ditimbangkan dengan teliti.
            </p>
            <p className="text-lg text-gray-700">
              Dalam panduan ini, kami kongsikan secara terperinci tentang
              kebaikan dan keburukan refinance rumah, bila ia berbaloi, dan bila
              anda patut mengelaknya. Maklumat ini akan membantu anda membuat
              keputusan yang tepat untuk situasi kewangan anda.
            </p>
          </section>

          {/* Kelebihan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white text-lg">
                +
              </span>
              7 Kelebihan Refinance Rumah
            </h2>

            <div className="space-y-6">
              {kelebihan.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary-50 border border-secondary-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {index + 1}. {item.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className="bg-white rounded-lg p-3 border border-secondary-200">
                        <p className="text-sm text-secondary-700">
                          <strong>💡 {item.example}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Keburukan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-lg">
                -
              </span>
              5 Keburukan Refinance Rumah
            </h2>

            <div className="space-y-6">
              {keburukan.map((item, index) => (
                <div
                  key={index}
                  className="bg-red-50 border border-red-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {index + 1}. {item.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className="bg-white rounded-lg p-3 border border-red-200">
                        <p className="text-sm text-green-700">
                          <strong>✅ {item.mitigation}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bila Berbaloi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bila Refinance BERBALOI?
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary-50">
                    <th className="text-left p-4 font-semibold border">
                      Situasi Anda
                    </th>
                    <th className="text-left p-4 font-semibold border">
                      Cadangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border">
                      Kadar semasa 0.5%+ lebih tinggi dari pasaran
                    </td>
                    <td className="p-4 border text-secondary-600 font-medium">
                      ✅ BERBALOI refinance
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 border">
                      Baki pinjaman melebihi RM200,000
                    </td>
                    <td className="p-4 border text-secondary-600 font-medium">
                      ✅ BERBALOI refinance
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border">
                      Tempoh pinjaman masih 15+ tahun
                    </td>
                    <td className="p-4 border text-secondary-600 font-medium">
                      ✅ BERBALOI refinance
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 border">
                      Tempoh lock-in sudah tamat
                    </td>
                    <td className="p-4 border text-secondary-600 font-medium">
                      ✅ BERBALOI refinance
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border">Perlukan cash out untuk keperluan penting</td>
                    <td className="p-4 border text-secondary-600 font-medium">
                      ✅ BERBALOI refinance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Bila TIDAK Berbaloi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bila Refinance TIDAK Berbaloi?
            </h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <span>
                    <strong>Baki pinjaman kurang dari RM100,000</strong> -
                    Penjimatan terlalu kecil untuk menampung kos refinance.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <span>
                    <strong>Tempoh pinjaman tinggal 5 tahun atau kurang</strong>{" "}
                    - Tempoh terlalu pendek untuk meraih manfaat sepenuhnya.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <span>
                    <strong>Masih dalam tempoh lock-in</strong> - Penalti
                    mungkin melebihi penjimatan yang bakal diperolehi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <span>
                    <strong>Perbezaan kadar kurang dari 0.3%</strong> -
                    Penjimatan bulanan terlalu kecil untuk menampung kos dan
                    masa yang diperlukan.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <span>
                    <strong>Merancang untuk menjual rumah dalam 2-3 tahun</strong>{" "}
                    - Tidak cukup masa untuk pulih kos refinance.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Costs Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kos Refinance Yang Perlu Diambil Kira
            </h2>
            <CostsTable lang="ms" />
          </section>

          {/* Contoh Kiraan */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contoh Kiraan: Adakah Refinance Berbaloi Untuk Anda?
            </h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Senario: Pinjaman RM400,000, baki 20 tahun
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-red-600 mb-3">
                    SEBELUM Refinance
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Kadar faedah: 4.75%</li>
                    <li>Bayaran bulanan: RM2,589</li>
                    <li>Jumlah bayaran (20 tahun): RM621,360</li>
                    <li>Jumlah faedah: RM221,360</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-secondary-600 mb-3">
                    SELEPAS Refinance
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Kadar faedah: 3.85%</li>
                    <li>Bayaran bulanan: RM2,389</li>
                    <li>Jumlah bayaran (20 tahun): RM573,360</li>
                    <li>Jumlah faedah: RM173,360</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-secondary-100 rounded-lg p-4">
                <h4 className="font-semibold text-secondary-800 mb-2">
                  Penjimatan Anda:
                </h4>
                <ul className="space-y-1 text-secondary-700">
                  <li>
                    <strong>Jimat bulanan:</strong> RM200
                  </li>
                  <li>
                    <strong>Jimat tahunan:</strong> RM2,400
                  </li>
                  <li>
                    <strong>Jumlah penjimatan (20 tahun):</strong> RM48,000
                  </li>
                  <li>
                    <strong>Tolak kos refinance (~RM5,000):</strong>{" "}
                    <span className="font-bold">JIMAT BERSIH RM43,000</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/calculator"
                className="btn-primary inline-block text-lg px-8 py-3"
              >
                Kira Penjimatan Anda →
              </Link>
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
                href="/contoh-kiraan-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Contoh Kiraan Refinance
                </h3>
                <p className="text-sm text-primary-700">
                  Lihat contoh pengiraan lengkap
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
            Masih Ragu-ragu? Dapatkan Nasihat Percuma
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Pakar kami akan membantu anda menilai sama ada refinance sesuai
            untuk situasi anda.
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
                <h3 className="text-xl font-bold">Dapatkan Konsultasi Percuma</h3>
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
              <LeadForm variant="modal" source="kelebihan-keburukan" />
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
