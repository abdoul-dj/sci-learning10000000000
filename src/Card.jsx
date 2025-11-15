import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { Link } from "lucide-react";

export default function Card({ image, content, likes, views }) {
  return (
    <button className="bg-white  text-sm hover:mt-[-9px] transition-all duration-300 overflow-hidden cursor-pointer">
      
      <img
        src={image}
        alt={content}
        className="w-full h-40 object-cover rounded-lg"
      />

      
      <div className="p-2 ml-0">
        <h3 className="text-sm font-semibold text-gray-800 ml-0">
          {content} – advices now get started now 
        </h3>
      </div>

      
      <div className="flex items-center justify-between px-6  py-3 mml-0">
      
        <div className="flex items-center gap-2">
          <div className="bg-[#8E36CF] text-white font-bold w-5 h-5 rounded-full flex  items-center justify-center">
            D
          </div>
          <div>
            <h4 className="text-sm font-semibold mr-2 text-gray-700">Health</h4>
            
          </div>
        </div>

      
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <FaHeart className="" /> {likes}
          </div>
          <div className="flex items-center gap-1">
            <FaEye /> {views}
          </div>
          <BsBookmark className="text-gray-500 hover:text-black cursor-pointer" />
        </div>
      </div>
    </button>
    
  );
}

