// QuizPage.jsx
import React, { useMemo, useState, useCallback, memo } from "react";
import Footer from "../comp/Footer";
import Navbar from "../comp/navbar";
import {
  Search,
  Filter,
  ChevronDown,
  Trophy,
  Award,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   PERFORMANCE NOTES
========================================================= */
// ✅ Uses memoized components
// ✅ Uses useMemo for filtered quizzes
// ✅ Uses useCallback for handlers
// ✅ Minimal re-renders
// ✅ Optimized Tailwind classes
// ✅ No unnecessary animations
// ✅ Static data outside component
// ✅ Responsive grid system
// ✅ Lightweight state handling

/* =========================================================
   STATIC DATA
========================================================= */

const categories = [
  { id: "all", name: "All Categories", count: 24, color: "bg-violet-100" },
  { id: "biology", name: "Biology", count: 8, color: "bg-green-100" },
  { id: "chemistry", name: "Chemistry", count: 6, color: "bg-blue-100" },
  { id: "health", name: "Health", count: 4, color: "bg-pink-100" },
  { id: "environment", name: "Environment", count: 3, color: "bg-emerald-100" },
  { id: "biotech", name: "Biotechnology", count: 2, color: "bg-indigo-100" },
  { id: "human", name: "Human Body", count: 3, color: "bg-orange-100" },
];

const quizData = [
  {
    id: 1,
    title: "Respiration in Human Beings Quiz",
    category: "biology",
    categoryLabel: "Biology",
    questions: 20,
    duration: "30 min",
    difficulty: "Easy",
    attempts: 1245,
    image:
      "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=500&auto=format&fit=crop",
    description:
      "Test your understanding of the respiratory system and breathing process.",
  },
  {
    id: 2,
    title: "Organic Chemistry Basics Quiz",
    category: "chemistry",
    categoryLabel: "Chemistry",
    questions: 15,
    duration: "20 min",
    difficulty: "Medium",
    attempts: 987,
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=500&auto=format&fit=crop",
    description:
      "Test your knowledge of basic organic chemistry concepts.",
  },
  {
    id: 3,
    title: "Human Body Systems Quiz",
    category: "human",
    categoryLabel: "Biology",
    questions: 25,
    duration: "35 min",
    difficulty: "Medium",
    attempts: 1567,
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=500&auto=format&fit=crop",
    description:
      "Test your knowledge of human body systems and their functions.",
  },
  {
    id: 4,
    title: "Genetics and Heredity Quiz",
    category: "biology",
    categoryLabel: "Biology",
    questions: 20,
    duration: "30 min",
    difficulty: "Easy",
    attempts: 856,
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=500&auto=format&fit=crop",
    description:
      "Test your understanding of genetics and inheritance patterns.",
  },
  {
    id: 5,
    title: "Ecosystem and Environment Quiz",
    category: "environment",
    categoryLabel: "Environment",
    questions: 15,
    duration: "25 min",
    difficulty: "Medium",
    attempts: 743,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=500&auto=format&fit=crop",
    description:
      "Test your knowledge of ecosystems and environmental science.",
  },
];

const topPerformers = [
  { name: "Sarah Johnson", score: "95%" },
  { name: "Michael Chen", score: "92%" },
  { name: "Emily Davis", score: "89%" },
  { name: "David Wilson", score: "87%" },
  { name: "Lisa Brown", score: "85%" },
];

/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

const StatCard = memo(({ value, label }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-4">
    <h3 className="text-3xl font-bold text-[#C4419F]">{value}</h3>
    <p className="mt-1 text-sm text-gray-500">{label}</p>
  </div>
));

const SidebarSection = memo(({ title, children }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-5">
    <h3 className="mb-5 text-lg font-semibold text-[#C4419F]">{title}</h3>
    {children}
  </div>
));

const CategoryItem = memo(
  ({ item, activeCategory, onSelectCategory }) => (
    <button
      onClick={() => onSelectCategory(item.id)}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
        activeCategory === item.id
          ? "bg-[#C4419F] text-white shadow-sm"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${item.color}`} />
        <span className="text-sm font-medium">{item.name}</span>
      </div>

      <span
        className={`rounded-full px-2 py-0.5 text-xs ${
          activeCategory === item.id
            ? "bg-white/20"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {item.count}
      </span>
    </button>
  )
);

const QuizCard = memo(({ quiz, onStartQuiz }) => {
  const difficultyColor =
    quiz.difficulty === "Easy"
      ? "bg-green-100 text-green-700"
      : quiz.difficulty === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (

    
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* Image */}
        <img
          src={quiz.image}
          alt={quiz.title}
          loading="lazy"
          className="h-28 w-28 rounded-2xl object-cover"
        />

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-xl">
            {quiz.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm ">
            <span className="font-medium text-[#C4419F]">
              {quiz.categoryLabel}
            </span>

            <span>•</span>

            <span>{quiz.questions} Questions</span>

            <span>•</span>

            <span>{quiz.duration}</span>
          </div>

          <p className="mt-4 ">{quiz.description}</p>

          <div className="mt-4 flex items-center gap-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor}`}
            >
              {quiz.difficulty}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-start gap-4 lg:items-center">
          <button
            onClick={() => onStartQuiz(quiz.title)}
            className="rounded-xl  px-6 py-3 font-semibold text-[#C4419F] transition-all duration-200 hover:bg-[#C4419F] hover:text-white"
          >
            Start Quiz
          </button>

          <span className="text-sm text-gray-500">
            {quiz.attempts.toLocaleString()} attempts
          </span>
        </div>
      </div>
    </div>
  );
});

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function QuizPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  /* =========================
     FILTERED QUIZZES
  ========================= */
  const filteredQuizzes = useMemo(() => {
    let filtered = quizData;

    // Search filter
    if (search.trim()) {
      filtered = filtered.filter((quiz) =>
        quiz.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (quiz) => quiz.category === activeCategory
      );
    }

    // Sorting
    if (sortBy === "attempts") {
      filtered = [...filtered].sort(
        (a, b) => b.attempts - a.attempts
      );
    }

    return filtered;
  }, [search, activeCategory, sortBy]);

  /* =========================
     HANDLERS
  ========================= */

  const handleStartQuiz = useCallback((quizName) => {
    alert(`Starting: ${quizName}`);
  }, []);

  const handleCategoryChange = useCallback((id) => {
    setActiveCategory(id);
  }, []);

  return (

    <>
    <Navbar />
    <div className="min-h-screen  bg-[#f6f6fb]  px-4 py-10 lg:px-10">
      {/* Header */}
      <div className="mb-10 mt-19">
        <h1 className="text-3xl text-[#C4419F] font-bold ">Quizzes</h1>

        <p className="mt-3 text-lg ">
          Test your knowledge with our science quizzes
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr_320px]">
        {/* =====================================================
            LEFT SIDEBAR
        ===================================================== */}
        <div className="space-y-6">
          <SidebarSection title="Categories">
            <div className="space-y-2">
              {categories.map((item) => (
                <CategoryItem
                  key={item.id}
                  item={item}
                  activeCategory={activeCategory}
                  onSelectCategory={handleCategoryChange}
                />
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Difficulty Level">
            <div className="space-y-4">
              {["All Levels", "Easy", "Medium", "Hard"].map((level) => (
                <label
                  key={level}
                  className="flex cursor-pointer  items-center justify-between"
                >
                  <div className="flex items-center  gap-3">
                    <input type="checkbox" className="h-4 text-[#C4419F]  w-4" />

                    <span className="text-sm">{level}</span>
                  </div>

                  <span className="text-sm ">
                    {Math.floor(Math.random() * 20)}
                  </span>
                </label>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Quiz Type">
            <div className="space-y-4">
              {["All Types", "Multiple Choice", "True/False", "Mixed"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4" />

                      <span className="text-sm ">{type}</span>
                    </div>

                    <span className="text-sm ">
                      {Math.floor(Math.random() * 20)}
                    </span>
                  </label>
                )
              )}
            </div>
          </SidebarSection>
        </div>

        {/* =====================================================
            CENTER CONTENT
        ===================================================== */}
        <div>
          {/* Search + Filter */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 "
                size={20}
              />

              <input
                type="text"
                placeholder="Search quizzes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-md bg-white pl-12 pr-4 outline-none  transition-all duration-200 "
              />
            </div>

            {/* Sort */}
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 appearance-none rounded-md   bg-white px-5 pr-12 outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="attempts">Most Attempts</option>
                </select>

                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 "
                  size={18}
                />
              </div>

              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:bg-[#C4419F] hover:text-white">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Quiz List */}
          <div className="space-y-5">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onStartQuiz={handleStartQuiz}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200 ${
                  page === 1
                    ? "border-[#C4419F] bg-[#C4419F] text-white"
                    : "border-gray-200 bg-white hover:border-[#C4419F]"
                }`}
              >
                {page}
              </button>
            ))}

            <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDEBAR
        ===================================================== */}
        <div className="space-y-6">
          {/* Stats */}
          <SidebarSection title="Your Quiz Stats">
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="12" label="Quizzes Taken" />
              <StatCard value="8" label="Completed" />
              <StatCard value="78%" label="Average Score" />
              <StatCard value="3" label="Certificates" />
            </div>
          </SidebarSection>

          {/* Top Performers */}
          <SidebarSection title="Top Performers">
            <div className="space-y-5">
              {topPerformers.map((user, index) => (
                <div
                  key={user.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-semibold">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-medium ">
                        {user.name}
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold ">
                    {user.score}
                  </span>
                </div>
              ))}
            </div>
          </SidebarSection>

          {/* Challenge */}
          <SidebarSection title="Challenge Yourself">
            <p className="mb-5 text-sm ">
              Try our daily quiz challenge and earn bonus points!
            </p>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#C4419F] px-5 py-4 font-semibold text-white transition-all duration-200 hover:bg-[#C4419F]">
              Take Daily Challenge
              <ChevronRight size={18} />
            </button>
          </SidebarSection>

          {/* Help */}
          <SidebarSection title="Need Help?">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-#C4419F p-3 text-[#C4419F]">
                <HelpCircle size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Check out our tips and study guides to improve your
                  knowledge.
                </p>

                <button className="mt-5 flex items-center gap-2 font-semibold ">
                  View Study Tips
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </SidebarSection>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
