import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu, FiBook, FiCheckSquare, FiAward, FiUsers,
  FiFileText, FiLayout, FiLogOut,
} from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: FiLayout },
  { name: "Users", path: "/users", icon: FiUsers },
  { name: "Lessons", path: "/admin/lessons", icon: FiBook },
  { name: "Quizzes", path: "/admin/quizzes", icon: FiCheckSquare },
  { name: "Tips", path: "/admin/tips", icon: FiFileText },
  { name: "Certificates", path: "/admin/certificates", icon: FiAward },
];

export default function AdminLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex" style={{ fontFamily: "Poppins, sans-serif" }}>
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 fixed h-full z-20`}
      >
        <div className="p-5 border-b border-gray-100">
          <h1 className={`font-bold text-[#C4419F] ${sidebarOpen ? "text-xl" : "text-sm text-center"}`}>
            {sidebarOpen ? "ScienceLearn" : "SL"}
          </h1>
        </div>
        <nav className="p-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path || location.pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  active ? "bg-[#C4419F] text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{link.name}</span>}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-7 py-3 text-red-500 hover:bg-red-50 w-full mt-4"
        >
          <FiLogOut size={20} />
          {sidebarOpen && "Logout"}
        </button>
      </aside>

      <div className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all`}>
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              <FiMenu size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          <div className="text-sm text-gray-500">
            {user?.full_name} (Admin)
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
