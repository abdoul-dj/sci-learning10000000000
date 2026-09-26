import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu, FiBook, FiCheckSquare, FiAward, FiUsers,
  FiFileText, FiLayout, FiLogOut,
} from "react-icons/fi";
import { useEffect, useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setMobileOpen(!mobileOpen);
  };

  const showLabels = sidebarOpen || mobileOpen;

  return (
    <div className="min-h-screen bg-gray-100 flex" style={{ fontFamily: "Poppins, sans-serif" }}>
      <aside
        className={`fixed h-full w-64 bg-white border-r border-gray-200 z-30 transition-all duration-300 lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${sidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        <div className="p-5 border-b border-gray-100">
          <h1 className={`font-bold text-[#C4419F] ${showLabels ? "text-xl" : "text-sm text-center"}`}>
            {showLabels ? "ScienceLearn" : "SL"}
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
                {showLabels && <span className="font-medium">{link.name}</span>}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-7 py-3 text-red-500 hover:bg-red-50 w-full mt-4"
        >
          <FiLogOut size={20} />
          {showLabels && "Logout"}
        </button>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`flex-1 ml-0 transition-all ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg">
              <FiMenu size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
          </div>
          <div className="text-sm text-gray-500 hidden md:block">
            {user?.full_name} (Admin)
          </div>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
