
import Footer from "../comp/Footer";
import Navbar from "../comp/navbar";
import React, {
  memo,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import {
  getMyRequests,
  getMyCertificates,
  createRequest,
} from "../services/certificateService.js";

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
   React.memo → prevents unnecessary component re-renders
   useMemo → optimizes filtered certificate data
   useCallback → keeps handlers stable
   Responsive Tailwind layout
   ========================================================= */


/* =========================================================
   STATS CARD
   ========================================================= */

const StatsCard = memo(
  ({ icon, title, value, subtitle, color }) => {
    return (
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-gray-800 font-semibold text-lg">
            {title}
          </h3>

          <p className="text-4xl font-bold text-gray-900 leading-tight">
            {value}
          </p>

          <span className="text-gray-500 text-sm">
            {subtitle}
          </span>
        </div>
      </div>
    );
  }
);


/* =========================================================
   CERTIFICATE CARD
   ========================================================= */

const CertificateCard = memo(
  ({ item, onView, onMenu }) => {
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

            <p className="text-gray-500 mt-1">
              {item.institute}
            </p>

            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <CalendarDays size={16} />
              <span>{item.date}</span>
            </div>
          </div>
        </div>


        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-4">

          <div className="bg-violet-50 text-[#C4419F] px-4 py-2 rounded-full text-sm flex items-center gap-2">
            <BadgeCheck size={16} />
            Verified
          </div>

          <button
            type="button"
            onClick={() => onView(item)}
            className="border text-[#C4419F] hover:bg-violet-50 transition-colors duration-200 px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            View Certificate
            <ExternalLink size={18} />
          </button>

          <button
            type="button"
            onClick={() => onMenu(item)}
            className="w-11 h-11 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Certificate options"
          >
            <MoreVertical size={20} />
          </button>

        </div>
      </div>
    );
  }
);


/* =========================================================
   ACTION ITEM
   ========================================================= */

const ActionItem = memo(
  ({ icon, title, onClick }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 p-3 rounded-2xl group"
      >

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
            {icon}
          </div>

          <span className="font-medium text-gray-700">
            {title}
          </span>

        </div>

        <ArrowRight
          size={18}
          className="text-gray-400 group-hover:translate-x-1 transition-transform"
        />

      </button>
    );
  }
);


/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function QualificationsPage() {

  const { user } = useAuth();
  const navigate = useNavigate();


  /* =======================================================
     STATE
     ======================================================= */

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [certificates, setCertificates] = useState([]);
  const [requests, setRequests] = useState([]);

  const [quizzes, setQuizzes] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [showRequestForm, setShowRequestForm] =
    useState(false);

  const [requestForm, setRequestForm] = useState({
    quiz_id: "",
    lesson_id: "",
    submitted_marks: "",
  });

  const [loading, setLoading] = useState(true);


  /* =======================================================
     STATUS COLOR
     FIXED
     ======================================================= */

  const statusColor = useCallback((status) => {

    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";

  }, []);


  /* =======================================================
     LOAD DATA
     ======================================================= */

  useEffect(() => {

    let mounted = true;

    const loadData = async () => {

      try {

        setLoading(true);

        const [
          quizzesData,
          lessonsData,
        ] = await Promise.all([
          getQuizzes(),
          getLessons(),
        ]);

        if (!mounted) return;

        setQuizzes(quizzesData || []);
        setLessons(lessonsData || []);


        /* -----------------------------------------------
           LOAD USER DATA
           ----------------------------------------------- */

        if (user) {

          const [
            certificatesData,
            requestsData,
          ] = await Promise.all([
            getMyCertificates(),
            getMyRequests(),
          ]);

          if (!mounted) return;


          setCertificates(
            (certificatesData || []).map((c) => ({
              id: c.id,

              title:
                c.title || "Certificate of Achievement",

              institute:
                c.institute ||
                "ScienceLearn Institute",

              date: c.issued_at
                ? `Issued on ${new Date(
                    c.issued_at
                  ).toLocaleDateString()}`
                : "Date not available",

              status: "Completed",

              logo:
                "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",

              certificate_number:
                c.certificate_number || "",
            }))
          );

          setRequests(requestsData || []);
        }

      } catch (error) {

        console.error(
          "Failed to load qualifications data:",
          error
        );

      } finally {

        if (mounted) {
          setLoading(false);
        }

      }
    };


    loadData();


    return () => {
      mounted = false;
    };

  }, [user]);


  /* =======================================================
     FILTERED CERTIFICATES
     ======================================================= */

  const filteredCertificates = useMemo(() => {

    return certificates.filter((item) => {

      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : item.status === filter;

      return matchesSearch && matchesFilter;

    });

  }, [certificates, search, filter]);


  /* =======================================================
     SEARCH
     ======================================================= */

  const handleSearch = useCallback((e) => {

    setSearch(e.target.value);

  }, []);


  /* =======================================================
     FORM INPUT
     ======================================================= */

  const handleFormChange = useCallback((e) => {

    const { name, value } = e.target;

    setRequestForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  }, []);


  /* =======================================================
     SUBMIT CERTIFICATE REQUEST
     ======================================================= */

  const handleRequestSubmit = async (e) => {

    e.preventDefault();


    if (!user) {
      navigate("/signup");
      return;
    }


    try {

      await createRequest({

        quiz_id:
          requestForm.quiz_id || null,

        lesson_id:
          requestForm.lesson_id || null,

        submitted_marks:
          requestForm.submitted_marks
            ? parseFloat(
                requestForm.submitted_marks
              )
            : null,
      });


      /* Refresh requests */

      const updatedRequests =
        await getMyRequests();

      setRequests(
        updatedRequests || []
      );


      /* Reset form */

      setRequestForm({
        quiz_id: "",
        lesson_id: "",
        submitted_marks: "",
      });


      setShowRequestForm(false);


      alert(
        "Certificate request submitted successfully! Status: Pending."
      );

    } catch (err) {

      console.error(
        "Certificate request error:",
        err
      );

      alert(
        err?.message ||
          "Failed to submit certificate request."
      );
    }
  };


  /* =======================================================
     OPEN CERTIFICATE
     ======================================================= */

  const openCertificate = (item) => {

    const html = `
      <!DOCTYPE html>

      <html>

      <head>

        <title>${item.title}</title>

        <style>

          body {
            font-family: Georgia, serif;
            text-align: center;
            padding: 60px;
            background: #f6f6fb;
          }

          .card {
            background: #fff;
            border: 8px solid #C4419F;
            padding: 48px;
            max-width: 720px;
            margin: 0 auto;
          }

          h1 {
            color: #C4419F;
          }

          button {
            padding: 12px 20px;
            border: none;
            background: #C4419F;
            color: white;
            border-radius: 8px;
            cursor: pointer;
          }

          @media print {
            button {
              display: none;
            }

            body {
              background: white;
            }
          }

        </style>

      </head>

      <body>

        <div className="card">

          <p>ScienceLearn Institute</p>

          <h1>
            Certificate of Achievement
          </h1>

          <p>
            This certifies that
          </p>

          <h2>
            ${user?.name || user?.full_name || "Student"}
          </h2>

          <p>
            has successfully completed
          </p>

          <h2>
            ${item.title}
          </h2>

          <p>
            Certificate Number:
            <strong>
              ${item.certificate_number || "N/A"}
            </strong>
          </p>

          <p>
            ${item.date}
          </p>

          <button onclick="window.print()">
            Print / Save PDF
          </button>

        </div>

      </body>

      </html>
    `;


    const win = window.open(
      "",
      "_blank"
    );


    if (win) {

      win.document.write(html);

      win.document.close();

    } else {

      alert(
        "Please allow pop-ups to view your certificate."
      );

    }
  };


  /* =======================================================
     DOWNLOAD CERTIFICATES
     ======================================================= */

  const downloadCertificates = () => {

    if (!certificates.length) {

      alert(
        "You don't have any certificates to download yet."
      );

      return;
    }


    const data =
      JSON.stringify(
        certificates,
        null,
        2
      );


    const blob = new Blob(
      [data],
      {
        type: "application/json",
      }
    );


    const url =
      URL.createObjectURL(blob);


    const a =
      document.createElement("a");


    a.href = url;

    a.download =
      "certificates.json";


    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);


    URL.revokeObjectURL(url);
  };


  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {

    return (
      <>
        <Navbar />

        <section className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">

          <div className="text-center">

            <div className="w-12 h-12 border-4 border-violet-200 border-t-[#C4419F] rounded-full animate-spin mx-auto" />

            <p className="mt-4 text-gray-500">
              Loading your qualifications...
            </p>

          </div>

        </section>

        <Footer />
      </>
    );
  }


  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <>
      {/* NAVBAR */}

      <div className="absolute z-40 w-full">
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
                type="button"
                onClick={() =>
                  user
                    ? setShowRequestForm(true)
                    : navigate("/signup")
                }
                className="mt-8 bg-gradient-to-r from-violet-700 to-purple-600 hover:scale-[1.01] active:scale-[0.99] transition-transform text-white rounded-3xl px-8 py-5 flex items-center gap-4 shadow-lg text-xl font-semibold"
              >

                <BadgeCheck
                  size={30}
                  className="text-white"
                />

                Apply for Certificate

                <ArrowRight size={28} />

              </button>


              <p className="mt-4 text-sm text-gray-500">
                Minimum 80% quiz score required for approval
              </p>

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
            icon={
              <GraduationCap
                className="text-violet-700"
                size={30}
              />
            }
            title="Total Qualifications"
            value={String(
              certificates.length
            )}
            subtitle="Certificates Earned"
            color="bg-violet-100"
          />


          <StatsCard
            icon={
              <BadgeCheck
                className="text-blue-600"
                size={30}
              />
            }
            title="Verified Certificates"
            value={String(
              certificates.length
            )}
            subtitle="Verified by Authority"
            color="bg-blue-100"
          />


          <StatsCard
            icon={
              <CalendarDays
                className="text-green-600"
                size={30}
              />
            }
            title="In Progress"
            value={String(
              requests.filter(
                (r) =>
                  r.status === "Pending"
              ).length
            )}
            subtitle="Ongoing Certifications"
            color="bg-green-100"
          />


          <StatsCard
            icon={
              <Star
                className="text-orange-500"
                size={30}
              />
            }
            title="Achievements"
            value={String(
              requests.filter(
                (r) =>
                  r.status === "Approved"
              ).length
            )}
            subtitle="Approved Requests"
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

                {[
                  "All",
                  "Completed",
                ].map((item) => (

                  <button
                    type="button"
                    key={item}
                    onClick={() =>
                      setFilter(item)
                    }
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


            {/* =================================================
                REQUESTS
                ================================================= */}

            {user &&
              requests.length > 0 && (

                <div className="mt-6 mb-6">

                  <h3 className="text-xl font-bold mb-4">
                    Your Requests
                  </h3>


                  <div className="space-y-3">

                    {requests.map(
                      (req) => (

                        <div
                          key={req.id}
                          className="bg-white rounded-2xl border p-4 flex justify-between items-center gap-4"
                        >

                          <div>

                            <p className="font-medium">
                              {req.quiz_title ||
                                req.lesson_title ||
                                "Certificate Request"}
                            </p>


                            <p className="text-sm text-gray-500">

                              Verified:{" "}

                              {req.verified_score !==
                              null &&
                              req.verified_score !==
                              undefined
                                ? `${req.verified_score}%`
                                : "Pending verification"}

                            </p>

                          </div>


                          <span
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${statusColor(
                              req.status
                            )}`}
                          >
                            {req.status ||
                              "Pending"}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}


            {/* =================================================
                CERTIFICATES
                ================================================= */}

            <div className="mt-6 flex flex-col gap-5">

              {filteredCertificates.length ===
                0 && (

                <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center">

                  <GraduationCap
                    size={48}
                    className="mx-auto text-gray-300"
                  />

                  <p className="text-gray-500 mt-4">
                    No certificates yet.
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Complete a quiz with 80%+ and apply for your certificate.
                  </p>

                </div>

              )}


              {filteredCertificates.map(
                (item) => (

                  <CertificateCard
                    key={item.id}
                    item={item}
                    onView={openCertificate}
                    onMenu={openCertificate}
                  />

                )
              )}

            </div>

          </div>


          {/* =================================================
              RIGHT SIDEBAR
              ================================================= */}

          <div className="space-y-6">

            {/* QUICK ACTIONS */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Quick Actions
              </h2>


              <div className="space-y-2">

                <ActionItem
                  icon={
                    <Plus className="text-violet-600" />
                  }
                  title="Add New Qualification"
                  onClick={() =>
                    user
                      ? setShowRequestForm(true)
                      : navigate("/signup")
                  }
                />


                <ActionItem
                  icon={
                    <Download className="text-green-600" />
                  }
                  title="Download All Certificates"
                  onClick={
                    downloadCertificates
                  }
                />


                <ActionItem
                  icon={
                    <Share2 className="text-orange-500" />
                  }
                  title="Share Profile"
                  onClick={() =>
                    navigate("/profile")
                  }
                />


                <ActionItem
                  icon={
                    <ShieldCheck className="text-pink-500" />
                  }
                  title="Request Verification"
                  onClick={() =>
                    user
                      ? setShowRequestForm(true)
                      : navigate("/signup")
                  }
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


              <button
                type="button"
                onClick={() =>
                  navigate("/contact")
                }
                className="mt-5 text-[#C4419F] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Contact Support
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>


        {/* ===================================================
            CERTIFICATE REQUEST MODAL
            =================================================== */}

        {showRequestForm && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <form
              onSubmit={
                handleRequestSubmit
              }
              className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl"
            >

              <h3 className="text-xl font-bold">
                Request Certificate
              </h3>


              <p className="text-sm text-gray-500">
                You need at least 80% on a quiz.
                Your verified score will be checked from quiz results.
              </p>


              {/* QUIZ */}

              <select
                name="quiz_id"
                value={
                  requestForm.quiz_id
                }
                onChange={
                  handleFormChange
                }
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C4419F]"
                required
              >

                <option value="">
                  Select Quiz
                </option>

                {quizzes.map(
                  (q) => (

                    <option
                      key={q.id}
                      value={q.id}
                    >
                      {q.title}
                    </option>

                  )
                )}

              </select>


              {/* LESSON */}

              <select
                name="lesson_id"
                value={
                  requestForm.lesson_id
                }
                onChange={
                  handleFormChange
                }
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C4419F]"
              >

                <option value="">
                  Related Lesson (optional)
                </option>

                {lessons.map(
                  (l) => (

                    <option
                      key={l.id}
                      value={l.id}
                    >
                      {l.title}
                    </option>

                  )
                )}

              </select>


              {/* SCORE */}

              <input
                type="number"
                name="submitted_marks"
                placeholder="Your score %"
                value={
                  requestForm.submitted_marks
                }
                onChange={
                  handleFormChange
                }
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C4419F]"
                min="0"
                max="100"
                step="0.01"
              />


              {/* BUTTONS */}

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowRequestForm(
                      false
                    );

                    setRequestForm({
                      quiz_id: "",
                      lesson_id: "",
                      submitted_marks: "",
                    });
                  }}
                  className="flex-1 border rounded-xl py-3 hover:bg-gray-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="flex-1 bg-[#C4419F] hover:bg-[#ad378c] text-white rounded-xl py-3 transition-colors"
                >
                  Submit Request
                </button>

              </div>

            </form>

          </div>

        )}

      </section>


      <Footer />

    </>
  );
}
