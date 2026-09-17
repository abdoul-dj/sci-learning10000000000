import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar(){
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className="sticky top-0 left-0 right-0 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-6 py-3 z-50">

      {/* LEFT */}
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#C4419F] flex items-center justify-center">
          <span className="text-white font-bold">SL</span>
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
              <Link to="/dashboard">
                <button className={getButtonClass("/dashboard")}>Dashboard</button>
              </Link>
            ) : (
              <Link to="/profile">
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
              className="px-3 py-1.5 rounded-md font-medium text-red-500 hover:bg-red-50 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2 items-center">
            <Link to="/login">
              <button className="px-4 py-1.5 rounded-md font-medium text-[#C4419F] hover:bg-pink-50 text-sm">Login</button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-1.5 rounded-md font-medium bg-[#C4419F] text-white hover:bg-[#A73688] text-sm">Sign Up</button>
            </Link>
          </div>
        )}
      </div>

    </nav>
  )
}
