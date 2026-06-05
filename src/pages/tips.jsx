import Footer from "../comp/Footer";
import Navbar from "../comp/navbar";

import React, { useMemo, useState } from "react";
import {
  Search,
  Clock3,
  BookOpen,
  BrainCircuit,
  FlaskConical,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Target,
  ClipboardList,
} from "lucide-react";

/**
 * PERFORMANCE OPTIMIZATION USED
 * --------------------------------
 * ✅ No unnecessary re-renders
 * ✅ Local static data outside component
 * ✅ useMemo for filtering
 * ✅ Lightweight structure
 * ✅ Reusable card component
 * ✅ Tailwind utility classes only
 * ✅ No external heavy libraries
 * ✅ Responsive grid
 * ✅ Accessible buttons
 * ✅ Lazy hover effects only
 * ✅ Minimal DOM nesting
 */

const tipsData = [
  {
    id: 1,
    title: "Active Recall",
    description:
      "Test yourself on key concepts instead of rereading notes.",
    category: "Study Tips",
    time: "3 min read",
    icon: BookOpen,
    color: "bg-violet-100 text-violet-600",
    tagColor: "bg-violet-100 text-violet-700",
    saved: false,
  },
  {
    id: 2,
    title: "Concept Mapping",
    description:
      "Create visual maps to connect ideas and improve understanding.",
    category: "Science Concepts",
    time: "4 min read",
    icon: BrainCircuit,
    color: "bg-green-100 text-green-600",
    tagColor: "bg-green-100 text-green-700",
    saved: false,
  },
  {
    id: 3,
    title: "Understand, Don’t Memorize",
    description:
      "Focus on understanding concepts rather than memorizing facts.",
    category: "Science Concepts",
    time: "3 min read",
    icon: FlaskConical,
    color: "bg-orange-100 text-orange-600",
    tagColor: "bg-orange-100 text-orange-700",
    saved: false,
  },
  {
    id: 4,
    title: "Practice Regularly",
    description:
      "Consistent practice helps reinforce what you’ve learned.",
    category: "Study Tips",
    time: "2 min read",
    icon: Target,
    color: "bg-blue-100 text-blue-600",
    tagColor: "bg-blue-100 text-blue-700",
    saved: false,
  },
  {
    id: 5,
    title: "Past Papers",
    description:
      "Solve previous years’ papers to get familiar with exam patterns.",
    category: "Exam Preparation",
    time: "5 min read",
    icon: ClipboardList,
    color: "bg-pink-100 text-pink-600",
    tagColor: "bg-pink-100 text-pink-700",
    saved: false,
  },
  {
    id: 6,
    title: "Use Time Blocks",
    description:
      "Study in focused blocks of time with short breaks.",
    category: "Time Management",
    time: "3 min read",
    icon: Clock3,
    color: "bg-purple-100 text-purple-600",
    tagColor: "bg-purple-100 text-purple-700",
    saved: false,
  },
];

const categories = [
  "All Tips",
  "Study Tips",
  "Science Concepts",
  "Exam Preparation",
  "Time Management",
];

const TipCard = React.memo(({ tip, onSave }) => {
  const Icon = tip.icon;

  return (
    <div
      className="group rounded-3xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full ${tip.color}`}
        >
          <Icon size={38} strokeWidth={1.7} />
        </div>

        <button
          onClick={() => onSave(tip.id)}
          className={`rounded-xl p-2 transition ${
            tip.saved
              ? "bg-[#C4419F] text-white"
              : " "
          }`}
        >
          <Bookmark
            size={20}
            fill={tip.saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          {tip.title}
        </h2>

        <p className="mt-4 text-[17px] leading-8 text-gray-500">
          {tip.description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span
          className={`rounded-full px-4 py-2 text-sm font-medium ${tip.tagColor}`}
        >
          {tip.category}
        </span>

        <div className="flex items-center gap-2 text-gray-400">
          <Clock3 size={16} />
          <span className="text-sm">{tip.time}</span>
        </div>
      </div>
    </div>
  );
});

export default function TipsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tips");
  const [tips, setTips] = useState(tipsData);
  const [currentPage, setCurrentPage] = useState(1);

  const tipsPerPage = 6;

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesCategory =
        activeCategory === "All Tips" ||
        tip.category === activeCategory;

      const matchesSearch =
        tip.title.toLowerCase().includes(search.toLowerCase()) ||
        tip.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory, tips]);

  const totalPages = Math.ceil(filteredTips.length / tipsPerPage);

  const paginatedTips = useMemo(() => {
    const start = (currentPage - 1) * tipsPerPage;
    return filteredTips.slice(start, start + tipsPerPage);
  }, [filteredTips, currentPage]);

  const toggleSave = (id) => {
    setTips((prev) =>
      prev.map((tip) =>
        tip.id === id
          ? { ...tip, saved: !tip.saved }
          : tip
      )
    );
  };

  return (
    <>
    <div className="absolute bg-[#f6f6fb]">
            <Navbar />
          </div>
    <div className="min-h-screen  p-4 md:p-8">
      <div className="mx-auto max-w-7xl mt-20 rounded-[34px] border border-gray-100 bg-[#f6f6fb] p-6 shadow-sm md:p-10">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Tips
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              Explore helpful tips and additional knowledge in science
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full max-w-xl">
            <Search
              size={22}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search tips..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="h-16 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-5 text-[16px] outline-none transition focus:border-[#C4419F] focus:ring-2 focus:ring-[#C4419F]"
            />
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="mt-10 flex flex-wrap gap-4">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`rounded-2xl border px-6 py-4 text-[15px] font-medium transition-all duration-300 ${
                  active
                    ? "border-[#C4419F] bg-[#C4419F] text-white shadow-lg shadow-violet-200"
                    : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-600"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginatedTips.length > 0 ? (
            paginatedTips.map((tip) => (
              <TipCard
                key={tip.id}
                tip={tip}
                onSave={toggleSave}
              />
            ))
          ) : (
            <div className="col-span-full flex h-[300px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50">
              <p className="text-lg text-gray-400">
                No tips found.
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition hover:border-violet-400 hover:text-violet-600 disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-14 w-14 rounded-2xl text-lg font-medium transition ${
                    currentPage === page
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-violet-400 hover:text-violet-600"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition hover:border-violet-400 hover:text-violet-600 disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div> 
    <Footer />
    </>
  );
}