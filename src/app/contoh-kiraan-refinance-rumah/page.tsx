"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getBanksSortedByRate } from "@/lib/constants";
import { BankRatesTable } from "@/components/content/BankRatesTable";
import { CostsTable } from "@/components/content/CostsTable";
import { LastUpdated } from "@/components/content/LastUpdated";
import LeadForm from "@/components/LeadForm";
import MidPageCTA from "@/components/MidPageCTA";
import BackToTop from "@/components/BackToTop";

const { currentYear, costs } = SITE_CONFIG;
const topBanks = getBanksSortedByRate().slice(0, 5);

// Helper function to calculate monthly payment
const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
};

const faqs = [
  {
    question: "Bagaimana cara kira penjimatan refinance?",
    answer:
      "Penjimatan refinance dikira dengan menolak bayaran bulanan baru dari bayaran bulanan lama. Formula: Penjimatan Bulanan = Bayaran Bulanan Lama - Bayaran Bulanan Baru. Untuk penjimatan sebenar, tolak juga kos refinancing dari jumlah penjimatan sepanjang tempoh pinjaman.",
  },
  {
    question: "Berapa lama untuk break-even kos refinance?",
    answer:
      "Break-even dikira dengan membahagikan jumlah kos refinance dengan penjimatan bulanan. Contoh: Kos RM5,000 ÷ Jimat RM300/bulan = 17 bulan untuk break-even. Jika anda merancang untuk kekal di rumah lebih lama dari tempoh break-even, refinance adalah berbaloi.",
  },
  {
    question: "Adakah kiraan ini tepat?",
    answer:
      "Kiraan ini adalah anggaran berdasarkan formula pinjaman standard. Kadar sebenar mungkin berbeza bergantung kepada profil kredit anda, bank yang dipilih, dan promosi semasa. Untuk kiraan tepat berdasarkan profil anda, gunakan kalkulator kami atau dapatkan sebut harga percuma.",
  },
  {
    question: "Kenapa kadar efektif berbeza dari kadar diiklankan?",
    answer:
      "Kadar diiklankan biasanya adalah kadar terendah yang hanya layak untuk pemohon dengan profil terbaik. Kadar efektif bergantung kepada skor kredit, jumlah pinjaman, tempoh, dan penilaian risiko bank. Sentiasa minta Letter of Offer untuk kadar sebenar anda.",
  },
  {
    question: "Bolehkah saya pendekkan tempoh dan kurangkan bayaran serentak?",
    answer:
      "Tidak biasanya. Mependekkan tempoh akan meningkatkan bayaran bulanan walaupun kadar lebih rendah. Anda perlu pilih sama ada fokus pada penjimatan bulanan (tempoh sama/lebih panjang) atau penjimatan jumlah faedah (tempoh lebih pendek dengan bayaran lebih tinggi).",
  },
];

export default function ContohKiraanRefinanceRumah() {
  const [showForm, setShowForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Example calculations
  const examples = [
    {
      title: "Contoh 1: Refinance Pinjaman RM300,000",
      loanAmount: 300000,
      currentRate: 4.75,
      newRate: 3.85,
      tenure: 20,
      refinanceCost: 5000,
    },
    {
      title: "Contoh 2: Refinance Pinjaman RM500,000",
      loanAmount: 500000,
      currentRate: 4.5,
      newRate: 3.7,
      tenure: 25,
      refinanceCost: 7000,
    },
    {
      title: "Contoh 3: Refinance dengan Cash Out",
      loanAmount: 400000,
      cashOut: 100000,
      currentRate: 4.75,
      newRate: 3.9,
      tenure: 25,
      refinanceCost: 8000,
    },
    {
      title: "Contoh 4: Pendekkan Tempoh Pinjaman",
      loanAmount: 350000,
      currentRate: 4.5,
      currentTenure: 25,
      newRate: 3.8,
      newTenure: 15,
      refinanceCost: 6000,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Contoh Kiraan Refinance Rumah Malaysia {currentYear}
          </h1>
          <p className="text-lg text-gray-300">
            Panduan lengkap dengan contoh pengiraan sebenar untuk membantu anda
            membuat keputusan refinancing.
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
              Sebelum membuat keputusan refinance, penting untuk memahami
              pengiraan sebenar yang terlibat. Dalam panduan ini, kami kongsikan
              beberapa contoh kiraan refinance dengan senario berbeza supaya
              anda dapat membuat perbandingan yang jelas.
            </p>
            <p className="text-lg text-gray-700">
              Semua contoh menggunakan kadar faedah semasa pasaran Malaysia pada{" "}
              {currentYear}. Kadar sebenar anda mungkin berbeza bergantung
              kepada profil kredit dan bank yang dipilih.
            </p>
          </section>

          {/* Formula Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Formula Kiraan Refinance
            </h2>

            <div className="bg-primary-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-primary-900 mb-4">
                Formula Bayaran Bulanan:
              </h3>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="font-mono text-lg">
                  M = P × [r(1+r)^n] / [(1+r)^n - 1]
                </p>
              </div>
              <div className="mt-4 text-sm text-primary-800">
                <p>
                  <strong>M</strong> = Bayaran Bulanan
                </p>
                <p>
                  <strong>P</strong> = Jumlah Pinjaman (Principal)
                </p>
                <p>
                  <strong>r</strong> = Kadar Faedah Bulanan (Kadar Tahunan ÷ 12)
                </p>
                <p>
                  <strong>n</strong> = Jumlah Bulan (Tahun × 12)
                </p>
              </div>
            </div>

            <p className="text-gray-700">
              Jangan risau jika formula ini kelihatan rumit - gunakan kalkulator
              kami untuk pengiraan automatik. Yang penting adalah memahami
              konsep asas: kadar faedah lebih rendah = bayaran bulanan lebih
              rendah.
            </p>
          </section>

          {/* Example 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contoh 1: Refinance Pinjaman RM300,000
            </h2>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="bg-gray-100 px-6 py-4">
                <h3 className="font-semibold text-gray-900">
                  Maklumat Pinjaman
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-3">
                      SEBELUM Refinance
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Baki Pinjaman: RM300,000</li>
                      <li>Kadar Faedah: 4.75%</li>
                      <li>Baki Tempoh: 20 tahun</li>
                      <li className="font-semibold text-red-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(300000, 4.75, 20)
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                    <h4 className="font-semibold text-secondary-800 mb-3">
                      SELEPAS Refinance
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Jumlah Pinjaman: RM300,000</li>
                      <li>Kadar Faedah Baru: 3.85%</li>
                      <li>Tempoh: 20 tahun</li>
                      <li className="font-semibold text-secondary-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(300000, 3.85, 20)
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-secondary-100 rounded-lg p-4">
                  <h4 className="font-semibold text-secondary-900 mb-3">
                    Ringkasan Penjimatan
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-600">Jimat Bulanan</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          calculateMonthlyPayment(300000, 4.75, 20) -
                            calculateMonthlyPayment(300000, 3.85, 20)
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Jimat Tahunan</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          (calculateMonthlyPayment(300000, 4.75, 20) -
                            calculateMonthlyPayment(300000, 3.85, 20)) *
                            12
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Jimat 20 Tahun</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          (calculateMonthlyPayment(300000, 4.75, 20) -
                            calculateMonthlyPayment(300000, 3.85, 20)) *
                            240
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Jimat Bersih*</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          (calculateMonthlyPayment(300000, 4.75, 20) -
                            calculateMonthlyPayment(300000, 3.85, 20)) *
                            240 -
                            5000
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    *Selepas tolak anggaran kos refinance RM5,000
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Example 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contoh 2: Refinance Pinjaman RM500,000
            </h2>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="bg-gray-100 px-6 py-4">
                <h3 className="font-semibold text-gray-900">
                  Pinjaman lebih besar = Penjimatan lebih besar
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-3">
                      SEBELUM Refinance
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Baki Pinjaman: RM500,000</li>
                      <li>Kadar Faedah: 4.50%</li>
                      <li>Baki Tempoh: 25 tahun</li>
                      <li className="font-semibold text-red-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(500000, 4.5, 25)
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                    <h4 className="font-semibold text-secondary-800 mb-3">
                      SELEPAS Refinance
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Jumlah Pinjaman: RM500,000</li>
                      <li>Kadar Faedah Baru: 3.70%</li>
                      <li>Tempoh: 25 tahun</li>
                      <li className="font-semibold text-secondary-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(500000, 3.7, 25)
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-secondary-100 rounded-lg p-4">
                  <h4 className="font-semibold text-secondary-900 mb-3">
                    Ringkasan Penjimatan
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-600">Jimat Bulanan</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          calculateMonthlyPayment(500000, 4.5, 25) -
                            calculateMonthlyPayment(500000, 3.7, 25)
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Jimat Tahunan</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          (calculateMonthlyPayment(500000, 4.5, 25) -
                            calculateMonthlyPayment(500000, 3.7, 25)) *
                            12
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Jimat 25 Tahun</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          (calculateMonthlyPayment(500000, 4.5, 25) -
                            calculateMonthlyPayment(500000, 3.7, 25)) *
                            300
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Jimat Bersih*</p>
                      <p className="text-xl font-bold text-secondary-600">
                        RM
                        {Math.round(
                          (calculateMonthlyPayment(500000, 4.5, 25) -
                            calculateMonthlyPayment(500000, 3.7, 25)) *
                            300 -
                            7000
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    *Selepas tolak anggaran kos refinance RM7,000
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mid Page CTA */}
          <MidPageCTA onOpenForm={() => setShowForm(true)} />

          {/* Example 3: Cash Out */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contoh 3: Refinance dengan Cash Out
            </h2>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="bg-gray-100 px-6 py-4">
                <h3 className="font-semibold text-gray-900">
                  Akses ekuiti rumah untuk keperluan lain
                </h3>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Senario:</h4>
                  <p className="text-sm text-blue-700">
                    Rumah bernilai RM600,000 dengan baki pinjaman RM400,000.
                    Anda ingin cash out RM100,000 untuk pengubahsuaian rumah.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-3">
                      SEBELUM Refinance
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Baki Pinjaman: RM400,000</li>
                      <li>Kadar Faedah: 4.75%</li>
                      <li>Baki Tempoh: 25 tahun</li>
                      <li className="font-semibold text-red-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(400000, 4.75, 25)
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                    <h4 className="font-semibold text-secondary-800 mb-3">
                      SELEPAS Refinance + Cash Out
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        Pinjaman Baru: RM500,000 (RM400k + RM100k cash out)
                      </li>
                      <li>Kadar Faedah Baru: 3.90%</li>
                      <li>Tempoh: 25 tahun</li>
                      <li className="font-semibold text-secondary-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(500000, 3.9, 25)
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Analisis:
                  </h4>
                  <p className="text-sm text-yellow-700 mb-2">
                    Walaupun bayaran bulanan meningkat sebanyak RM
                    {Math.round(
                      calculateMonthlyPayment(500000, 3.9, 25) -
                        calculateMonthlyPayment(400000, 4.75, 25)
                    ).toLocaleString()}
                    , anda mendapat akses kepada RM100,000 tunai dengan kadar
                    pinjaman perumahan (3.90%) berbanding:
                  </p>
                  <ul className="text-sm text-yellow-700 list-disc list-inside">
                    <li>Pinjaman peribadi: 8-15% setahun</li>
                    <li>Kad kredit: 15-18% setahun</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Example 4: Shorten Tenure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contoh 4: Pendekkan Tempoh Pinjaman
            </h2>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="bg-gray-100 px-6 py-4">
                <h3 className="font-semibold text-gray-900">
                  Jimat lebih banyak dengan tempoh lebih pendek
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-3">
                      SEBELUM Refinance
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Baki Pinjaman: RM350,000</li>
                      <li>Kadar Faedah: 4.50%</li>
                      <li>Baki Tempoh: 25 tahun</li>
                      <li className="font-semibold text-red-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(350000, 4.5, 25)
                        ).toLocaleString()}
                      </li>
                      <li>Jumlah Bayaran: RM
                        {Math.round(
                          calculateMonthlyPayment(350000, 4.5, 25) * 300
                        ).toLocaleString()}
                      </li>
                      <li>Jumlah Faedah: RM
                        {Math.round(
                          calculateMonthlyPayment(350000, 4.5, 25) * 300 - 350000
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                    <h4 className="font-semibold text-secondary-800 mb-3">
                      SELEPAS Refinance (15 tahun)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Jumlah Pinjaman: RM350,000</li>
                      <li>Kadar Faedah Baru: 3.80%</li>
                      <li>Tempoh Baru: 15 tahun</li>
                      <li className="font-semibold text-secondary-700">
                        Bayaran Bulanan: RM
                        {Math.round(
                          calculateMonthlyPayment(350000, 3.8, 15)
                        ).toLocaleString()}
                      </li>
                      <li>Jumlah Bayaran: RM
                        {Math.round(
                          calculateMonthlyPayment(350000, 3.8, 15) * 180
                        ).toLocaleString()}
                      </li>
                      <li>Jumlah Faedah: RM
                        {Math.round(
                          calculateMonthlyPayment(350000, 3.8, 15) * 180 - 350000
                        ).toLocaleString()}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-secondary-100 rounded-lg p-4">
                  <h4 className="font-semibold text-secondary-900 mb-2">
                    Penjimatan Faedah:
                  </h4>
                  <p className="text-2xl font-bold text-secondary-600">
                    RM
                    {Math.round(
                      (calculateMonthlyPayment(350000, 4.5, 25) * 300 - 350000) -
                        (calculateMonthlyPayment(350000, 3.8, 15) * 180 - 350000)
                    ).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Walaupun bayaran bulanan meningkat RM
                    {Math.round(
                      calculateMonthlyPayment(350000, 3.8, 15) -
                        calculateMonthlyPayment(350000, 4.5, 25)
                    ).toLocaleString()}
                    , anda jimat lebih RM100,000 dalam jumlah faedah dan bebas
                    hutang 10 tahun lebih awal!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bank Rates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kadar Semasa Bank-Bank Utama
            </h2>
            <BankRatesTable limit={5} lang="ms" />
          </section>

          {/* Costs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kos Refinance Yang Perlu Diambil Kira
            </h2>
            <CostsTable lang="ms" />
            <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Tip:</strong> Untuk kiraan break-even yang tepat,
                bahagikan jumlah kos dengan penjimatan bulanan. Contoh: RM5,000
                kos ÷ RM300 jimat = 17 bulan untuk break-even.
              </p>
            </div>
          </section>

          {/* Savings Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Jadual Perbandingan Penjimatan
            </h2>
            <p className="text-gray-700 mb-4">
              Berapa anda boleh jimat berdasarkan jumlah pinjaman (kadar lama
              4.5% vs kadar baru 3.7%, tempoh 25 tahun):
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="text-left p-3 font-semibold border">
                      Jumlah Pinjaman
                    </th>
                    <th className="text-left p-3 font-semibold border">
                      Jimat/Bulan
                    </th>
                    <th className="text-left p-3 font-semibold border">
                      Jimat/Tahun
                    </th>
                    <th className="text-left p-3 font-semibold border">
                      Jimat 25 Tahun
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[200000, 300000, 400000, 500000, 600000, 700000, 800000].map(
                    (amount, index) => {
                      const monthlySavings =
                        calculateMonthlyPayment(amount, 4.5, 25) -
                        calculateMonthlyPayment(amount, 3.7, 25);
                      return (
                        <tr
                          key={amount}
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="p-3 border font-medium">
                            RM{amount.toLocaleString()}
                          </td>
                          <td className="p-3 border text-secondary-600 font-semibold">
                            RM{Math.round(monthlySavings).toLocaleString()}
                          </td>
                          <td className="p-3 border">
                            RM{Math.round(monthlySavings * 12).toLocaleString()}
                          </td>
                          <td className="p-3 border font-semibold">
                            RM{Math.round(monthlySavings * 300).toLocaleString()}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Calculator CTA */}
          <section className="mb-12 bg-primary-50 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              Kira Penjimatan Anda Sendiri
            </h2>
            <p className="text-primary-700 mb-6">
              Gunakan kalkulator percuma kami untuk pengiraan tepat berdasarkan
              pinjaman anda.
            </p>
            <Link
              href="/calculator"
              className="btn-primary inline-block text-lg px-8 py-3"
            >
              Gunakan Kalkulator Sekarang →
            </Link>
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
                href="/kelebihan-keburukan-refinance-rumah"
                className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <h3 className="font-semibold text-primary-900">
                  Kelebihan & Keburukan Refinance
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
            Dapatkan Kiraan Tepat Untuk Pinjaman Anda
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Hantar maklumat anda dan pakar kami akan kirakan penjimatan sebenar
            anda.
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
              <LeadForm variant="modal" source="contoh-kiraan" />
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
