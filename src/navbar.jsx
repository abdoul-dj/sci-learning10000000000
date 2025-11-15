import React from "react";
import { GiLotus } from "react-icons/gi";
import { FaHome, FaHeartbeat, FaAppleAlt, FaPenFancy, FaUser } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="fixed  top-0 left-0 w-full h-20 bg-white text-black flex items-center justify-between px-10 shadow-md z-50">
      
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-50 h-50 object-cover rounded-full mt-0"
        />
      </div>

      
      <div className="hidden md:flex items-center gap-20 text-lg">
        <button className="flex items-center gap-1 hover:font-bold">
          {/* <FaHome />  */}
          Home
        </button>
        <button className="flex items-center gap-1 hover:font-bold">
          {/* <FaHeartbeat /> */}
           Health Tips
        </button>
        <button className="flex items-center gap-1 hover:font-bold">
          {/* <GiLotus />  */}
          Wellness Programs
        </button>
        <button className="flex items-center gap-1 hover:font-bold">
          {/* <FaAppleAlt /> */}
           Nutrition
        </button>
        <button className="flex items-center gap-1 hover:font-bold">
          {/* <FaPenFancy /> */}
           Articles
        </button>
      </div>

      <div className="flex items-center gap-4">
        <MdNotifications className="text-2xl hover:text-3xl transition-all duration-200" />
        <FaUser className="text-xl hover:text-3xl transition-all duration-200" />
      </div>
    </nav>
  );
}
