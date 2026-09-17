import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import Navbar from "../comp/navbar.jsx";
import Footer from "../comp/Footer.jsx";
import { getLesson, getLessons } from "../services/lessonService.js";

export default function LessonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [lessonData, lessonsData] = await Promise.all([
          getLesson(id),
          getLessons(),
        ]);
        setLesson(lessonData);
        setAllLessons(lessonsData);
      } catch {
        navigate("/lessons");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const currentIndex = allLessons.findIndex((l) => String(l.id) === String(id));
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6fb]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C4419F] border-t-transparent" />
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f6f6fb] pt-28 pb-16 px-4 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 text-[#C4419F] font-medium mb-6 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Lessons
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {lesson.image_url && (
              <div className="h-48 bg-gradient-to-r from-violet-50 to-purple-50 flex items-center justify-center">
                <img
                  src={lesson.image_url}
                  alt={lesson.title}
                  className="h-32 object-contain"
                />
              </div>
            )}

            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-[#C4419F]/10 text-[#C4419F] px-4 py-1.5 rounded-full text-sm font-medium">
                  {lesson.category}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <BookOpen size={16} />
                  Lesson
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {lesson.title}
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {lesson.description}
              </p>

              <div
                className="lesson-content prose max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </div>
          </div>

          <div className="flex justify-between mt-8 gap-4">
            {prevLesson ? (
              <button
                onClick={() => navigate(`/lessons/${prevLesson.id}`)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#C4419F] transition"
              >
                <ArrowLeft size={18} />
                {prevLesson.title}
              </button>
            ) : (
              <div />
            )}
            {nextLesson && (
              <button
                onClick={() => navigate(`/lessons/${nextLesson.id}`)}
                className="flex items-center gap-2 px-6 py-3 bg-[#C4419F] text-white rounded-xl hover:opacity-90 transition ml-auto"
              >
                {nextLesson.title}
                <ArrowLeft size={18} className="rotate-180" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
