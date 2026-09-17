import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Trophy, ArrowLeft, Award } from "lucide-react";
import Navbar from "../comp/navbar.jsx";
import Footer from "../comp/Footer.jsx";
import { getResult } from "../services/quizService.js";

export default function QuizResult() {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResult(resultId)
      .then(setResult)
      .finally(() => setLoading(false));
  }, [resultId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6fb]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C4419F] border-t-transparent" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Result not found</p>
      </div>
    );
  }

  const passed = parseFloat(result.percentage) >= 80;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f6f6fb] pt-28 pb-16 px-4 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
            <div
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
                passed ? "bg-green-100" : "bg-orange-100"
              }`}
            >
              <Trophy
                size={48}
                className={passed ? "text-green-600" : "text-orange-500"}
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-gray-500 mb-8">{result.quiz_title}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#f6f6fb] rounded-xl p-4">
                <p className="text-3xl font-bold text-[#C4419F]">{result.score}</p>
                <p className="text-sm text-gray-500">Score</p>
              </div>
              <div className="bg-[#f6f6fb] rounded-xl p-4">
                <p className="text-3xl font-bold text-[#C4419F]">{result.total_questions}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
              <div className="bg-[#f6f6fb] rounded-xl p-4">
                <p className="text-3xl font-bold text-[#C4419F]">{result.percentage}%</p>
                <p className="text-sm text-gray-500">Percentage</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              {passed
                ? "Great job! You scored 80% or above and may be eligible for a certificate."
                : "Keep practicing! You need at least 80% to qualify for a certificate."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/quizse"
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:border-[#C4419F] transition"
              >
                <ArrowLeft size={18} />
                Back to Quizzes
              </Link>
              {passed && (
                <Link
                  to="/certificate"
                  className="flex items-center gap-2 px-6 py-3 bg-[#C4419F] text-white rounded-xl hover:opacity-90 transition"
                >
                  <Award size={18} />
                  Request Certificate
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
