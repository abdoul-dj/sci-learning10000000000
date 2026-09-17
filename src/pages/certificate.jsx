
import Footer from "../comp/Footer";
import Navbar from "../comp/navbar";
import React, { memo, useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getMyRequests, getMyCertificates, createRequest } from "../services/certificateService.js";
import { getQuizzes } from "../services/quizService.js";
import { getLessons } from "../services/lessonService.js";
import {
  Search,
  GraduationCap,
  BadgeCheck,
  CalendarDays,
  Star,
  ExternalLink,
  MoreVertical,
  Download,
  ShieldCheck,
  Share2,
  Plus,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   PERFORMANCE NOTES
   =========================================================
   ✅ React.memo used for reusable cards
   ✅ useMemo for static data
   ✅ useCallback for handlers
   ✅ Minimal state updates
   ✅ Tailwind utility-first rendering
   ✅ No unnecessary re-renders
   ✅ Responsive grid system
   ✅ Optimized shadow + transitions
   ✅ No heavy animations
========================================================= */

/* =========================================================
   STATS CARD
========================================================= */
const StatsCard = memo(({ icon, title, value, subtitle, color }) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>

        <p className="text-4xl font-bold text-gray-900 leading-tight">
          {value}
        </p>

        <span className="text-gray-500 text-sm">{subtitle}</span>
      </div>
    </div>
  );
});

/* =========================================================
   CERTIFICATE CARD
========================================================= */
const CertificateCard = memo(({ item }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:shadow-md transition-all duration-200">
      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center shrink-0">
          <img
            src={item.logo}
            alt={item.title}
            loading="lazy"
            className="w-10 h-10 object-contain"
          />
        </div>

        <div className="min-w-0">
          <h2 className="font-bold text-2xl text-gray-900 truncate">
            {item.title}
          </h2>

          <p className="text-gray-500 mt-1">{item.institute}</p>

          <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
            <CalendarDays size={16} />
            <span>{item.date}</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="bg-violet-50 text-[#C4419F] px-4 py-2 rounded-full text-sm  flex items-center gap-2">
          <BadgeCheck size={16} />
          Verified
        </div>

        <button className="border  text-[#C4419F] hover:bg-violet-50 transition-colors duration-200 px-5 py-3 rounded-xl font-semibold flex items-center gap-2">
          View Certificate
          <ExternalLink size={18} />
        </button>

        <button className="w-11 h-11 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
});

/* =========================================================
   ACTION ITEM
========================================================= */
const ActionItem = memo(({ icon, title }) => {
  return (
    <button className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 p-3 rounded-2xl group">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
          {icon}
        </div>

        <span className="font-medium text-gray-700">{title}</span>
      </div>

      <ArrowRight
        size={18}
        className="text-gray-400 group-hover:translate-x-1 transition-transform"
      />
    </button>
  );
});

/* =========================================================
   MAIN PAGE
========================================================= */
export default function QualificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [certificates, setCertificates] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [requestForm, setRequestForm] = useState({ quiz_id: "", lesson_id: "", submitted_marks: "" });

  useEffect(() => {
    if (user) {
      getMyCertificates().then((data) =>
        setCertificates(
          data.map((c) => ({
            id: c.id,
            title: c.title,
            institute: "ScienceLearn Institute",
            date: `Issued on ${new Date(c.issued_at).toLocaleDateString()}`,
            status: "Completed",
            logo: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
            certificate_number: c.certificate_number,
          }))
        )
      );
      getMyRequests().then(setRequests);
    }
    getQuizzes().then(setQuizzes);
    getLessons().then(setLessons);
  }, [user]);

  /* =======================================================
     FILTERED DATA
  ======================================================= */
  const filteredCertificates = useMemo(() => {
    return certificates.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ? true : item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [certificates, search, filter]);

  /* =======================================================
     HANDLERS
  ======================================================= */
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/signup"); return; }
    try {
      await createRequest({
        quiz_id: requestForm.quiz_id || null,
        lesson_id: requestForm.lesson_id || null,
        submitted_marks: requestForm.submitted_marks ? parseFloat(requestForm.submitted_marks) : null,
      });
      setShowRequestForm(false);
      getMyRequests().then(setRequests);
      alert("Certificate request submitted! Status: Pending");
    } catch (err) {
      alert(err.message);
    }
  };

  const statusColor = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (

    <>
<div className="absolute">
        <Navbar />
      </div>
    
    <section className="min-h-screen bg-[#f7f8fc] px-4 md:px-8 py-8">
        
      {/* ===================================================
          HERO
      =================================================== */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#eef1ff] to-[#f7f3ff] rounded-[40px] p-8 lg:p-14">
        {/* Background circles */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex mt-20 flex-col lg:flex-row justify-between gap-10 items-center">
          {/* LEFT */}
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-black text-[#0d1230] leading-tight">
              Your Qualifications
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Explore and manage your certifications
            </p>

            <button
              onClick={() => user ? setShowRequestForm(true) : navigate("/signup")}
              className="mt-8 bg-gradient-to-r from-violet-700 to-purple-600 hover:scale-[1.01] active:scale-[0.99] transition-transform text-white rounded-3xl px-8 py-5 flex items-center gap-4 shadow-lg text-xl font-semibold"
            >
              <BadgeCheck size={30} className="text-white" />
              Apply for Certificate
              <ArrowRight size={28} />
            </button>
            <p className="mt-4 text-sm text-gray-500">Minimum 80% quiz score required for approval</p>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="certificate"
              loading="lazy"
              className="w-[360px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* ===================================================
          STATS
      =================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        <StatsCard
          icon={<GraduationCap className="text-violet-700" size={30} />}
          title="Total Qualifications"
          value="12"
          subtitle="Certificates Earned"
          color="bg-violet-100"
        />

        <StatsCard
          icon={<BadgeCheck className="text-blue-600" size={30} />}
          title="Verified Certificates"
          value="9"
          subtitle="Verified by Authority"
          color="bg-blue-100"
        />

        <StatsCard
          icon={<CalendarDays className="text-green-600" size={30} />}
          title="In Progress"
          value="3"
          subtitle="Ongoing Certifications"
          color="bg-green-100"
        />

        <StatsCard
          icon={<Star className="text-orange-500" size={30} />}
          title="Achievements"
          value="5"
          subtitle="Badges Earned"
          color="bg-orange-100"
        />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mt-8">
        {/* LEFT SIDE */}
        <div>
          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search certifications..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#C4419F]"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              {["All", "Completed", "In Progress"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-5 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    filter === item
                      ? "bg-[#C4419F] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-violet-400"
                  }`}
                >
                  {item}
                </button>
              ))}

             
            </div>
          </div>

          {/* REQUESTS */}
          {user && requests.length > 0 && (
            <div className="mt-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Your Requests</h3>
              <div className="space-y-3">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white rounded-2xl border p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{req.quiz_title || req.lesson_title || "Certificate Request"}</p>
                      <p className="text-sm text-gray-500">
                        Verified: {req.verified_score ? `${req.verified_score}%` : "Pending verification"}
                      </p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATES */}
          <div className="mt-6 flex flex-col gap-5">
            {filteredCertificates.length === 0 && (
              <p className="text-gray-500 text-center py-10">No certificates yet. Complete a quiz with 80%+ and apply!</p>
            )}
            {filteredCertificates.map((item) => (
              <CertificateCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Quick Actions
            </h2>

            <div className="space-y-2">
              <ActionItem
                icon={<Plus className="text-violet-600" />}
                title="Add New Qualification"
              />

              <ActionItem
                icon={<Download className="text-green-600" />}
                title="Download All Certificates"
              />

              <ActionItem
                icon={<Share2 className="text-orange-500" />}
                title="Share Profile"
              />

              <ActionItem
                icon={<ShieldCheck className="text-pink-500" />}
                title="Request Verification"
              />
            </div>
          </div>

          {/* HELP */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Need Help?
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Facing issues with your certificate?
            </p>

            <button className="mt-5 text-[#C4419F] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              Contact Support
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleRequestSubmit} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">Request Certificate</h3>
            <p className="text-sm text-gray-500">You need at least 80% on a quiz. Your verified score will be checked from quiz results.</p>
            <select value={requestForm.quiz_id} onChange={(e) => setRequestForm({ ...requestForm, quiz_id: e.target.value })}
              className="w-full border rounded-xl p-3" required>
              <option value="">Select Quiz</option>
              {quizzes.map((q) => <option key={q.id} value={q.id}>{q.title}</option>)}
            </select>
            <select value={requestForm.lesson_id} onChange={(e) => setRequestForm({ ...requestForm, lesson_id: e.target.value })}
              className="w-full border rounded-xl p-3">
              <option value="">Related Lesson (optional)</option>
              {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
            </select>
            <input type="number" placeholder="Your score %" value={requestForm.submitted_marks}
              onChange={(e) => setRequestForm({ ...requestForm, submitted_marks: e.target.value })}
              className="w-full border rounded-xl p-3" min="0" max="100" />
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowRequestForm(false)} className="flex-1 border rounded-xl py-3">Cancel</button>
              <button type="submit" className="flex-1 bg-[#C4419F] text-white rounded-xl py-3">Submit Request</button>
            </div>
          </form>
        </div>
      )}
    </section>
    <Footer />
    </>
  );
}
