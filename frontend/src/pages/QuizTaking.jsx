import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../comp/navbar.jsx";
import Footer from "../comp/Footer.jsx";
import { getQuiz, submitQuiz } from "../services/quizService.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function QuizTaking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuiz(id)
      .then(setQuiz)
      .catch(() => navigate("/quizse"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const selectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate("/signup");
      return;
    }
    setSubmitting(true);
    try {
      const answerArray = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      }));
      const result = await submitQuiz(id, answerArray);
      navigate(`/quiz-result/${result.id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6fb]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C4419F] border-t-transparent" />
      </div>
    );
  }

  if (!quiz) return null;

  const questions = quiz.questions || [];
  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const allAnswered = questions.every((q) => answers[q.id]);
  const isLast = currentQ === questions.length - 1;

  const difficultyColor =
    quiz.difficulty === "Easy"
      ? "bg-green-100 text-green-700"
      : quiz.difficulty === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f6f6fb] pt-28 pb-16 px-4 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/quizse"
            className="inline-flex items-center gap-2 text-[#C4419F] font-medium mb-6 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Quizzes
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#C4419F] text-sm font-medium">{quiz.category}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor}`}>
                    {quiz.difficulty}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Question</p>
                <p className="text-2xl font-bold text-[#C4419F]">
                  {currentQ + 1} / {questions.length}
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
              <div
                className="h-full bg-[#C4419F] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {question && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {question.question_text}
                </h2>

                <div className="space-y-3">
                  {question.options?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => selectAnswer(question.id, option.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[question.id] === option.id
                          ? "border-[#C4419F] bg-[#C4419F]/5"
                          : "border-gray-200 hover:border-[#C4419F]/50"
                      }`}
                    >
                      <span className="font-medium text-gray-800">{option.option_text}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-between mt-8 gap-4">
              <button
                onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl disabled:opacity-40 hover:border-[#C4419F] transition"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              {isLast ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered || submitting}
                  className="px-8 py-3 bg-[#C4419F] text-white rounded-xl font-semibold disabled:opacity-50 hover:opacity-90 transition"
                >
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQ((p) => Math.min(questions.length - 1, p + 1))}
                  disabled={!answers[question?.id]}
                  className="flex items-center gap-2 px-6 py-3 bg-[#C4419F] text-white rounded-xl disabled:opacity-50 hover:opacity-90 transition"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
