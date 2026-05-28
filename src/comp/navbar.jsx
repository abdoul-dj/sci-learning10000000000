import { Link, useLocation } from "react-router-dom"

export default function Navbar(){
  // This tracks the current URL path (e.g., "/home", "/lessons")
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
    <nav className="fixed bg-white h-15 ml-12 mt-5 mr-495 flex rounded-md items-center justify-between py-6 z-20">

      {/* LEFT */}
      <div className="flex mr-40 gap-2 items-center ">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src="bnbn.png"
            alt="logo"
            lazy="loading"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          ScienceLearn
        </h1>
      </div>

      {/* CENTER */}
      <div className="hidden lg:flex items-center cursor-pointer hover:text-[#C4419F] gap-12 text-[15px] font-medium text-gray-700">
        
        <Link to="/home">
          {/* Added dynamic functionality here */}
          <button className={getButtonClass("/home")}>Home</button>
        </Link>

        <Link to="/about-us">
          {/* Added dynamic functionality here */}
          <button className={getButtonClass("/about-us")}>About</button>
        </Link>
        
        <Link to="/quizse">
          {/* Added dynamic functionality here */}
          <button className={getButtonClass("/quizse")}>Quizzes</button>
        </Link>

        
        
        <Link to="/lessons">
          {/* Added dynamic functionality here */}
          <button className={getButtonClass("/lessons")}>Lessons</button>
        </Link>

         <Link to="/certificate">
          {/* Added dynamic functionality here */}
          <button className={getButtonClass("/certificate")}>certificate</button>
        </Link>

        <a href="/" className="hover:text-blue-500 transition">
          tips
        </a>
      </div>

      {/* RIGHT */}
      <div className="flex gap-4 ml-25 items-center ">
        <button className="px-5 py-2 border h-9 text-sm cursor-pointer bg-puple-400 rounded-md font-medium">
          START
        </button>
      
      </div>

    </nav>
  )
}
