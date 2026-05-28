import React, { memo, useMemo, useState, useCallback } from "react";
import Footer from "../comp/Footer";
import Navbar from "../comp/navbar";

import {
  Search,
  ChevronDown,
  Bookmark,
  Play,
  Star,
  ChevronLeft,
  ChevronRight,
  Leaf,
  FlaskConical,
  Heart,
  Globe,
} from "lucide-react";

/* -----------------------------
   Optimized Lesson Card
----------------------------- */
const LessonCard = memo(({ lesson, onSave, savedLessons }) => {
  const isSaved = savedLessons.includes(lesson.id);

  return (
    <div className="bg-white mt-6 border border-gray-200 rounded-md p-2 h-60 hover:shadow-md transition-all duration-300">
      {/* top */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[22px] text-[#101828] leading-tight">
            {lesson.title}
          </h3>

          <p className="text-[15px] text-gray-500 mt-1">
            {lesson.category}
          </p>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={() => onSave(lesson.id)}
          className={`transition ${
            isSaved
              ? "text-[#C4419F]"
              : "text-gray-400 hover:text-[#C4419F]"
          }`}
        >
          <Bookmark size={22} fill={isSaved ? "#C4419F" : "none"} />
        </button>
      </div>

      {/* image */}
      <div className={`rounded-md h-20 overflow-hidden ${lesson.bg}`}>
        <img
          src={lesson.image}
          alt={lesson.title}
          loading="lazy"
          className="h-full mx-auto object-contain"
        />
      </div>

      {/* progress */}
      <div className="flex items-center justify-between mt-5">
        <div className="w-[80%] h-[6px] bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C4419F] rounded-full transition-all duration-500"
            style={{ width: lesson.progress }}
          />
        </div>

        <span className="font-medium">{lesson.progress}</span>
      </div>

      {/* bottom */}
      <div className="flex items-center justify-between mt-5">
        <button className="text-sm text-[#C4419F] font-medium hover:underline">
          View Details
        </button>

        <button className="bg-[#C4419F] text-white px-3 py-1 rounded-md text-sm hover:opacity-90 transition">
          Start
        </button>
      </div>
    </div>
  );
});

/* -----------------------------
   Main Component
----------------------------- */
export default function LessonsSection() {
  /* -----------------------------
     Data Memoized
  ----------------------------- */
  const lessons = useMemo(
    () => [
      {
        id: 1,
        title: "Respiration in Human ",
        category: "Biology",
        progress: "60%",
        bg: "bg-[#f8f8f8]",
        image:
          "https://cdn-icons-png.flaticon.com/512/2966/2966488.png",
      },
      {
        id: 2,
        title: "Organic Chemistry Basics",
        category: "Chemistry",
        lessons: 6,
        progress: "40%",
        bg: "bg-[#f7f8ff]",
        image:
          "https://cdn-icons-png.flaticon.com/512/2784/2784445.png",
      },
      {
        id: 3,
        title: "Human Body Systems",
        category: "Biology",
        lessons: 10,
        progress: "35%",
        bg: "bg-[#f6f7ff]",
        image:
          "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
      },
      {
        id: 4,
        title: "Genetics and Heredity",
        category: "Biology",
        lessons: 7,
        progress: "60%",
        bg: "bg-[#faf7ff]",
        image:
          "https://cdn-icons-png.flaticon.com/512/2920/2920329.png",
      },
      {
        id: 5,
        title: "Ecosystem and Biotic Factors",
        category: "Environment",
        lessons: 6,
        progress: "70%",
        bg: "bg-[#f4fbf4]",
        image:
          "https://cdn-icons-png.flaticon.com/512/427/427735.png",
      },
      {
        id: 6,
        title: "Introduction to Biotechnology",
        category: "Biotechnology",
        lessons: 5,
        progress: "50%",
        bg: "bg-[#f8f8ff]",
        image:
          "https://cdn-icons-png.flaticon.com/512/2784/2784448.png",
      },
      {
        id: 7,
        title: "Inorganic Chemistry",
        category: "Chemistry",
        lessons: 6,
        progress: "45%",
        bg: "bg-[#fff5f5]",
        image:
          "https://cdn-icons-png.flaticon.com/512/2784/2784459.png",
      },
      {
        id: 8,
        title: "Reproduction in Plants",
        category: "Biology",
        lessons: 7,
        progress: "65%",
        bg: "bg-[#f6fbf6]",
        image:
          "https://cdn-icons-png.flaticon.com/512/765/765653.png",
      },
    ],
    []
  );

  /* -----------------------------
     States
  ----------------------------- */
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [savedLessons, setSavedLessons] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 4;

  /* -----------------------------
     Save Function
  ----------------------------- */
  const handleSave = useCallback((id) => {
    setSavedLessons((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }, []);

  /* -----------------------------
     Categories
  ----------------------------- */
  const categories = [
    {
      name: "All",
      icon: null,
    },
    {
      name: "Biology",
      icon: <Leaf size={18} />,
    },
    {
      name: "Chemistry",
      icon: <FlaskConical size={15} />,
    },
    {
      name: "Health",
      icon: <Heart size={15} />,
    },
    {
      name: "Environment",
      icon: <Globe size={15} />,
    },
  ];

  /* -----------------------------
     Filtering + Sorting
  ----------------------------- */
  const filteredLessons = useMemo(() => {
    let filtered = [...lessons];

    // category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (lesson) => lesson.category === activeCategory
      );
    }

    // search filter
    if (search.trim()) {
      filtered = filtered.filter((lesson) =>
        lesson.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // sorting
    if (sortBy === "progressHigh") {
      filtered.sort(
        (a, b) =>
          parseInt(b.progress) - parseInt(a.progress)
      );
    }

    if (sortBy === "progressLow") {
      filtered.sort(
        (a, b) =>
          parseInt(a.progress) - parseInt(b.progress)
      );
    }

    if (sortBy === "alphabet") {
      filtered.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return filtered;
  }, [lessons, activeCategory, search, sortBy]);

  /* -----------------------------
     Pagination
  ----------------------------- */
  const totalPages = Math.ceil(
    filteredLessons.length / cardsPerPage
  );

  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <>
      <div className="absolute">
        <Navbar />
      </div>

      <div className="bg-[#fafafa] min-h-screen px-2 lg:px-10 py-2">
        {/* top section */}
        <div className="flex flex-col mt-35 lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* search */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* SEARCH */}
            <div className="bg-white border border-gray-200 rounded-md h-[48px] px-4 flex items-center gap-3 w-full lg:w-[350px]">
              <Search size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search lessons..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 outline-none bg-transparent"
              />
            </div>

            {/* SORT */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 h-[48px] px-4 pr-10 rounded-md outline-none cursor-pointer"
              >
                <option value="default">Sort By</option>
                <option value="alphabet">Alphabet</option>
                <option value="progressHigh">
                  Highest Progress
                </option>
                <option value="progressLow">
                  Lowest Progress
                </option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* categories */}
        <div className="flex flex-wrap gap-4 mt-8">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCategory(cat.name);
                setCurrentPage(1);
              }}
              className={`h-[34px] px-2 ml-0 rounded-md flex items-center gap-3 font-medium transition-all
              ${
                activeCategory === cat.name
                  ? "bg-[#C4419F] text-white shadow-lg"
                  : "bg-white border text-gray-700 hover:border-[#C4419F]"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-10">
          {paginatedLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onSave={handleSave}
              savedLessons={savedLessons}
            />
          ))}
        </div>

        {/* EMPTY STATE */}
        {paginatedLessons.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-md p-10 text-center mt-10">
            <h2 className="text-2xl font-semibold text-[#101828]">
              No Lessons Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>
          </div>
        )}

        {/* bottom section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-7 mt-10">
          {/* continue learning */}
          <div className="xl:col-span-2 bg-white text-[#C4419F] border border-gray-200 rounded-md p-2">
            <h2 className="text-xl font-bold mb-6">
              Continue Your Learning
            </h2>

            <div className="bg-[#fafafa] border border-gray-100 rounded-md p-2 flex flex-col lg:flex-row lg:items-center gap-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966488.png"
                alt="lungs"
                loading="lazy"
                className="w-[130px] h-[130px] rounded-md object-cover bg-[#C4419F] p-4"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-[#101828]">
                  Respiration in Human Beings
                </h3>

                <p className="mt-2 text-gray-500">
                  Lesson 3 of 8
                </p>

                <p className="mt-1 text-gray-600">
                  The Breathing Process
                </p>

                <div className="flex items-center gap-4 mt-5">
                  <div className="flex-1 h-[6px] bg-gray-200 rounded-md overflow-hidden">
                    <div className="h-full w-[60%] bg-[#C4419F] rounded-full" />
                  </div>

                  <span className="text-gray-500 font-medium">
                    60%
                  </span>
                </div>
              </div>

              <button className="h-[52px] px-7 rounded-md bg-[#C4419F] text-white font-medium flex items-center gap-3 transition-all hover:opacity-90">
                <Play size={18} fill="white" />
                Continue Lesson
              </button>
            </div>
          </div>

          {/* top rated */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-3">
                <Star
                  className="text-yellow-500"
                  fill="#facc15"
                  size={22}
                />

                <h2 className="text-2xl font-bold text-[#C4419F]">
                  Top Rated Lessons
                </h2>
              </div>

              <button className="text-[#C4419F] font-medium hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-5">
              {lessons.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-[65px] h-[65px] rounded-md object-cover bg-[#f6f6f6] p-2"
                    />

                    <div>
                      <h3 className="font-semibold text-[#C4419F]">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <Star size={16} fill="#facc15" />
                    {4.8 - index * 0.1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev > 1 ? prev - 1 : prev
              )
            }
            className="w-[48px] h-[48px] rounded-md border border-gray-200 bg-white flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-[48px] h-[48px] rounded-md font-medium transition-all
                ${
                  currentPage === page
                    ? "bg-[#C4419F] text-white"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            className="w-[48px] h-[48px] rounded-md border border-gray-200 bg-white flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}