import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar(){
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Helper function to apply your specific dynamic classes based on the active path
  const getButtonClass = (path) => {
    const isActive = location.pathname === path;
    return `px-3 py-1.5 rounded-md font-medium transition-all ${
      isActive
        ? "bg-[#C4419F] text-white shadow-lg"
        : "bg-white text-gray-700 hover:border-[#C4419F]"
    }`;
  };

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b border-gray-100 shadow-sm z-50">
      <nav className="flex items-center justify-between px-6 py-3">

      {/* LEFT */}
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#C4419F] flex items-center justify-center">
         <img
  src="/logo2.jfif"
  alt="ScienceLearn logo"
  className="h-10 w-10 object-contain"
/>
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          ScienceLearn
        </h1>
      </div>

      {/* CENTER */}
      <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-gray-700">

        <Link to="/home">
          <button className={getButtonClass("/home")}>Home</button>
        </Link>

        <Link to="/about-us">
          <button className={getButtonClass("/about-us")}>About</button>
        </Link>

        <Link to="/lessons">
          <button className={getButtonClass("/lessons")}>Lessons</button>
        </Link>

        <Link to="/quizse">
          <button className={getButtonClass("/quizse")}>Quizzes</button>
        </Link>

        <Link to="/tips">
          <button className={getButtonClass("/tips")}>Tips</button>
        </Link>

        <Link to="/certificate">
          <button className={getButtonClass("/certificate")}>Certificates</button>
        </Link>

        <Link to="/contact">
          <button className={getButtonClass("/contact")}>Contact</button>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3 items-center">
        {user ? (
          <>
            {isAdmin ? (
              <Link to="/dashboard" className="hidden sm:block">
                <button className={getButtonClass("/dashboard")}>Dashboard</button>
              </Link>
            ) : (
              <Link to="/profile" className="hidden sm:block">
                <button className={getButtonClass("/profile")}>Dashboard</button>
              </Link>
            )}
            <div className="w-9 h-9 rounded-full bg-[#C4419F] flex items-center justify-center text-white font-medium text-sm">
              {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <Link to="/profile">
              <span className="text-sm text-gray-600 hidden lg:block hover:text-[#C4419F]">
                {user.full_name}
              </span>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/home");
              }}
              className="hidden sm:inline-block px-3 py-1.5 rounded-md font-medium text-red-500 hover:bg-red-50 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="hidden sm:flex gap-2 items-center">
            <Link to="/login">
              <button className="px-4 py-1.5 rounded-md font-medium text-[#C4419F] hover:bg-pink-50 text-sm">Login</button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-1.5 rounded-md font-medium bg-[#C4419F] text-white hover:bg-[#A73688] text-sm">Sign Up</button>
            </Link>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      </nav>

      {/* Mobile / tablet dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-4">
          <div className="grid grid-cols-2 gap-2">
            <Link to="/home">
              <button className={`${getButtonClass("/home")} w-full`}>Home</button>
            </Link>
            <Link to="/about-us">
              <button className={`${getButtonClass("/about-us")} w-full`}>About</button>
            </Link>
            <Link to="/lessons">
              <button className={`${getButtonClass("/lessons")} w-full`}>Lessons</button>
            </Link>
            <Link to="/quizse">
              <button className={`${getButtonClass("/quizse")} w-full`}>Quizzes</button>
            </Link>
            <Link to="/tips">
              <button className={`${getButtonClass("/tips")} w-full`}>Tips</button>
            </Link>
            <Link to="/certificate">
              <button className={`${getButtonClass("/certificate")} w-full`}>Certificates</button>
            </Link>
            <Link to="/contact">
              <button className={`${getButtonClass("/contact")} w-full`}>Contact</button>
            </Link>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link to="/profile" className="flex items-center gap-3 px-3 py-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#C4419F] flex items-center justify-center text-white font-medium text-sm">
                    {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.full_name}</span>
                </Link>
                <Link to={isAdmin ? "/dashboard" : "/profile"}>
                  <button className={`${getButtonClass(isAdmin ? "/dashboard" : "/profile")} w-full`}>Dashboard</button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/home");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md font-medium text-red-500 hover:bg-red-50 text-sm border border-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login">
                  <button className="w-full px-4 py-2 rounded-md font-medium text-[#C4419F] hover:bg-pink-50 text-sm border border-[#C4419F]/30">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="w-full px-4 py-2 rounded-md font-medium bg-[#C4419F] text-white hover:bg-[#A73688] text-sm">Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
