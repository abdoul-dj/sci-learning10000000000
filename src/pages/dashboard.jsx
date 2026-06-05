import React, { useState, useMemo } from "react";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMail,
  FiChevronDown,
  FiUsers,
  FiBook,
  FiCheckSquare,
  FiAward,
  FiSettings,
  FiFileText,
  FiCreditCard,
  FiClipboard,
  FiLogOut,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [period, setPeriod] = useState("This Month");

  const sidebarLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Courses", path: "/courses" },
    { name: "Lessons", path: "/lessons" },
    { name: "Quizzes", path: "/quizzes" },
    { name: "Certificates", path: "/certificates" },
    { name: "Withdrawals", path: "/withdrawals" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const notifications = [
    "New user registered",
    "Certificate issued",
    "Course published",
  ];

  const messages = [
    "John sent a message",
    "Support ticket updated",
    "Payment confirmation",
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Human Anatomy",
      progress: 85,
      students: 1250,
    },
    {
      id: 2,
      title: "Organic Chemistry Basics",
      progress: 65,
      students: 980,
    },
  ];

  const stats = useMemo(
    () => [
      {
        title: "Total Users",
        value: "24",
        growth: "+12%",
        icon: <FiUsers />,
        color: "text-green-500",
      },
      {
        title: "Courses",
        value: "156",
        growth: "+8%",
        icon: <FiBook />,
        color: "text-orange-500",
      },
      {
        title: "Lessons Completed",
        value: "78%",
        growth: "+15%",
        icon: <FiCheckSquare />,
        color: "text-yellow-500",
      },
      {
        title: "Certificates",
        value: "2",
        growth: "+5%",
        icon: <FiAward />,
        color: "text-indigo-500",
      },
    ],
    []
  );

  return (
    <div className="flex min-h-screen ">

      {/* SIDEBAR */}

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="w-64 text-white p-5"
          >
            <h2 className="font-bold text-2xl mb-8">
              ScienceLearn
            </h2>

            <div className="space-y-2">
              {sidebarLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-indigo-600 transition"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              className="mt-10 flex items-center gap-3 px-4 py-3 hover:bg-red-600 rounded-xl w-full"
            >
              <FiLogOut />
              Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN */}

      <div className="flex-1">

        {/* TOPBAR */}

        <header className="bg-white border-b sticky top-0 z-50">
          <div className="h-20 px-6 flex justify-between items-center">

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setSidebarOpen(!sidebarOpen)
                }
              >
                <FiMenu size={25} />
              </button>

              <div>
                <h1 className="font-bold text-3xl">
                  Dashboard
                </h1>
                <p className="text-gray-500">
                  Welcome back Admin
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">

              {/* SEARCH */}

              <div className="relative">
                <FiSearch className="absolute left-4 top-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search..."
                  className="w-80 h-12 pl-12 border rounded-xl outline-none"
                />
              </div>

              {/* MESSAGES */}

              <div className="relative">
                <button
                  onClick={() =>
                    setShowMessages(!showMessages)
                  }
                  className="w-11 h-11 border rounded-xl"
                >
                  <FiMail className="mx-auto" />
                </button>

                {showMessages && (
                  <div className="absolute right-0 top-14 w-72 bg-white rounded-xl shadow-lg p-4">
                    <h3 className="font-bold mb-3">
                      Messages
                    </h3>

                    {messages.map((msg, i) => (
                      <p key={i} className="py-2 border-b">
                        {msg}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* NOTIFICATIONS */}

              <div className="relative">
                <button
                  onClick={() =>
                    setShowNotifications(
                      !showNotifications
                    )
                  }
                  className="w-11 h-11 border rounded-xl"
                >
                  <FiBell className="mx-auto" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-14 w-72 bg-white rounded-xl shadow-lg p-4">
                    <h3 className="font-bold mb-3">
                      Notifications
                    </h3>

                    {notifications.map((item, i) => (
                      <p key={i} className="py-2 border-b">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* PROFILE */}

              <div className="relative">
                <button
                  onClick={() =>
                    setShowProfile(!showProfile)
                  }
                  className="flex items-center gap-3"
                >
                  <img
                    src="https://i.pravatar.cc/150"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />

                  <FiChevronDown />
                </button>

                {showProfile && (
                  <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-lg">
                    <button className="w-full p-3 text-left hover:bg-gray-50">
                      Profile
                    </button>

                    <button
                      onClick={() =>
                        navigate("/settings")
                      }
                      className="w-full p-3 text-left hover:bg-gray-50"
                    >
                      Settings
                    </button>

                    <button className="w-full p-3 text-left hover:bg-gray-50">
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </header>

        {/* CONTENT */}

        <div className="p-6">

          {/* STATS */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

            {stats.map((stat) => (
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                key={stat.title}
                className="bg-white rounded-2xl p-6 border"
              >
                <div className="flex justify-between">
                  <div>
                    <p>{stat.title}</p>
                    <h2
                      className={`text-4xl font-bold mt-3 ${stat.color}`}
                    >
                      {stat.value}
                    </h2>
                  </div>

                  <div className="text-3xl">
                    {stat.icon}
                  </div>
                </div>

                <span className="text-green-500 text-sm">
                  {stat.growth}
                </span>
              </motion.div>
            ))}
          </div>

          {/* COURSES */}

          <div className="bg-white mt-8 rounded-2xl p-6 border">

            <div className="flex justify-between mb-6">
              <h2 className="font-bold text-xl">
                Top Courses
              </h2>

              <button
                onClick={() =>
                  navigate("/courses")
                }
                className="text-indigo-600"
              >
                View All
              </button>
            </div>

            {courses.map((course) => (
              <div
                key={course.id}
                className="mb-6"
              >
                <div className="flex justify-between">
                  <span>{course.title}</span>
                  <span>{course.progress}%</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-3">
                  <span>
                    {course.students} Students
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/courses/${course.id}`
                      )
                    }
                    className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}

          <div className="grid md:grid-cols-4 gap-5 mt-8">

            <button
              onClick={() =>
                navigate("/courses/create")
              }
              className="bg-white border p-5 rounded-2xl"
            >
              Add Course
            </button>

            <button
              onClick={() =>
                navigate("/users")
              }
              className="bg-white border p-5 rounded-2xl"
            >
              Manage Users
            </button>

            <button
              onClick={() =>
                navigate("/reports")
              }
              className="bg-white border p-5 rounded-2xl"
            >
              Reports
            </button>

            <button
              onClick={() =>
                navigate("/settings")
              }
              className="bg-white border p-5 rounded-2xl"
            >
              Settings
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}