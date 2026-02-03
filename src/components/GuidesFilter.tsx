"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  readingTime: string;
}

interface GuidesFilterProps {
  guides: Guide[];
}

type FilterTab = "all" | "guides" | "panduan" | "reviews" | "pinjaman-berlesen";

const STATE_OPTIONS = [
  { label: "Pilih Negeri...", value: "" },
  { label: "Kuala Lumpur", value: "pinjaman-berlesen-kuala-lumpur" },
  { label: "Selangor", value: "pinjaman-berlesen-selangor" },
  { label: "Johor", value: "pinjaman-berlesen-johor-bahru" },
  { label: "Penang", value: "pinjaman-berlesen-penang" },
  { label: "Perak", value: "pinjaman-berlesen-perak" },
  { label: "Kedah", value: "pinjaman-berlesen-kedah" },
  { label: "Sabah & Sarawak", value: "pinjaman-berlesen-sabah-sarawak" },
  { label: "Negeri Sembilan", value: "pinjaman-berlesen-negeri-sembilan" },
  { label: "Pahang", value: "pinjaman-berlesen-pahang" },
  { label: "Kelantan", value: "pinjaman-berlesen-kelantan" },
  { label: "Terengganu", value: "pinjaman-berlesen-terengganu" },
  { label: "Melaka", value: "pinjaman-berlesen-melaka" },
];

export default function GuidesFilter({ guides }: GuidesFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const router = useRouter();

  const filterGuides = (guide: Guide): boolean => {
    switch (activeFilter) {
      case "all":
        return true;
      case "guides":
        return guide.category?.toLowerCase() === "guides";
      case "panduan":
        return guide.category?.toLowerCase() === "panduan";
      case "reviews":
        return guide.category?.toLowerCase() === "reviews";
      case "pinjaman-berlesen":
        return (
          guide.slug.includes("pinjaman-berlesen") ||
          guide.tags?.some(
            (tag) => tag.toLowerCase() === "pinjaman berlesen"
          ) ||
          false
        );
      default:
        return true;
    }
  };

  const filteredGuides = guides.filter(filterGuides);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      router.push(`/guides/${value}`);
    }
  };

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "guides", label: "Guides" },
    { id: "panduan", label: "Panduan" },
    { id: "reviews", label: "Reviews" },
    { id: "pinjaman-berlesen", label: "Pinjaman Berlesen" },
  ];

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* State Dropdown */}
      <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <label
          htmlFor="state-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          📍 Cari Pinjaman Berlesen Mengikut Negeri:
        </label>
        <select
          id="state-select"
          onChange={handleStateChange}
          className="w-full sm:w-auto min-w-[250px] px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          defaultValue=""
        >
          {STATE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredGuides.length} of {guides.length} guides
      </p>

      {/* Guides List */}
      {filteredGuides.length === 0 ? (
        <p className="text-center text-gray-600 py-8">
          No guides found for this filter. Try selecting a different category.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  {guide.category && (
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                      {guide.category}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700">
                    {guide.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    {guide.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{guide.readingTime}</span>
                    <span>
                      {new Date(guide.publishedAt).toLocaleDateString("en-MY", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center text-primary-600 font-medium text-sm">
                    Read Guide
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
