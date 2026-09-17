import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../comp/navbar.jsx";
import Footer from "../comp/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getMyResults } from "../services/quizService.js";
import { getMyCertificates, getMyRequests } from "../services/certificateService.js";

export default function Profile() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyResults(), getMyCertificates(), getMyRequests()])
      .then(([quizResults, certs, reqs]) => {
        setResults(quizResults || []);
        setCertificates(certs || []);
        setRequests(reqs || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f6f6fb] pt-28 pb-16 px-4 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="bg-white rounded-2xl p-6 border mb-6">
            <p className="text-xl font-semibold">{user?.full_name}</p>
            <p className="text-gray-500">{user?.email}</p>
            <p className="capitalize mt-2 text-[#C4419F]">{user?.role}</p>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading your records...</p>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-3">Quiz results</h2>
              <div className="space-y-3 mb-8">
                {results.length === 0 && <p className="text-gray-500">No quiz results yet.</p>}
                {results.map((result) => (
                  <Link
                    key={result.id}
                    to={`/quiz-result/${result.id}`}
                    className="block bg-white rounded-xl border p-4 hover:border-[#C4419F]"
                  >
                    <div className="flex justify-between">
                      <span>{result.quiz_title || "Quiz"}</span>
                      <span className="font-semibold text-[#C4419F]">{result.percentage}%</span>
                    </div>
                  </Link>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-3">Certificates</h2>
              <div className="space-y-3 mb-8">
                {certificates.length === 0 && (
                  <p className="text-gray-500">No certificates issued yet.</p>
                )}
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl border p-4">
                    <p className="font-semibold">{cert.title}</p>
                    <p className="text-sm text-[#C4419F]">{cert.certificate_number}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-3">Certificate requests</h2>
              <div className="space-y-3">
                {requests.length === 0 && <p className="text-gray-500">No requests yet.</p>}
                {requests.map((req) => (
                  <div key={req.id} className="bg-white rounded-xl border p-4 flex justify-between">
                    <span>{req.quiz_title || req.lesson_title || "Request"}</span>
                    <span>{req.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
