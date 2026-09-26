import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  Check,
  Award,
} from "lucide-react";
import Navbar from "../comp/navbar.jsx";
import Footer from "../comp/Footer.jsx";
import { courses } from "../data/courses.js";

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f6f6fb] pt-32 pb-16 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Course not found</h1>
          <p className="text-gray-500 mt-4">
            That course does not match a page in ScienceLearn.
          </p>
          <Link
            to="/home"
            className="inline-block mt-8 bg-[#C4419F] text-white px-8 py-3 rounded-xl font-semibold"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f6f6fb] pt-28 pb-16 px-4 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-[#C4419F] font-medium mb-6 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          {/* HERO */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 md:h-72 object-cover"
            />

            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-[#C4419F]/10 text-[#C4419F] px-4 py-1.5 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                {course.price && (
                  <span className="bg-[#C4419F] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                    {course.price}
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>

              <p className="text-[#C4419F] font-medium mb-4">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600 mb-8">
                <span className="flex items-center gap-1">
                  <Star size={16} className="fill-[#C4419F] text-[#C4419F]" />
                  {course.rating} rating
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={16} />
                  {course.lessonsCount} lessons
                </span>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/lessons")}
                  className="bg-[#C4419F] hover:bg-[#A73688] text-white px-8 py-3 rounded-xl font-medium transition shadow-lg"
                >
                  Start Learning
                </button>
                <button
                  onClick={() => navigate("/quizse")}
                  className="border border-[#C4419F] hover:bg-pink-50 text-[#C4419F] px-8 py-3 rounded-xl font-medium transition"
                >
                  Practice with Quizzes
                </button>
              </div>
            </div>
          </div>

          {/* WHAT YOU'LL LEARN */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What you'll learn
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C4419F]/10 text-[#C4419F] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <p className="text-gray-600 leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COURSE CONTENT */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Course content
            </h2>

            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl px-5 py-4 hover:border-[#C4419F] transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#C4419F]/10 text-[#C4419F] flex items-center justify-center font-semibold text-sm shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-800">
                      {module.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1 whitespace-nowrap">
                    <Clock size={14} />
                    {module.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CERTIFICATE */}
          <div className="bg-gradient-to-r from-[#f7e4f2] to-[#f2f1ff] rounded-2xl border border-[#eadcf3] p-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#C4419F] shadow-sm shrink-0">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Earn a certificate</h3>
                <p className="text-sm text-gray-600">
                  Score 80% or more on the course quiz to get certified.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/certificate")}
              className="bg-[#C4419F] hover:bg-[#A73688] text-white px-6 py-3 rounded-xl font-medium transition whitespace-nowrap"
            >
              Apply for Certificate
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
