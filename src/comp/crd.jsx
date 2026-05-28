// crd.jsx
import React from "react";
import { Clock } from "lucide-react";

export default function JetCard({
  image,
  title,
  lesson,
  duration,
  rating,
}) {
  return (
    <div className="flex px-4">
      <div className="w-[260px] rounded-2xl border border-gray-200 bg-white p-2 shadow-sm hover:shadow-xl transition duration-300">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[190px] object-cover rounded-2xl"
          />

          {/* RATING */}
          <div className="absolute bottom-3 right-3 bg-white px-3 py-2 rounded-full flex items-center gap-2 shadow-md">
            <div className="w-4 h-4 rounded-full bg-[#C4419F] flex items-center justify-center text-white text-xs">
              ★
            </div>

            <span className="text-sm font-medium">
              {rating}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-4">

          <h2 className="text-lg font-bold text-gray-800 leading-snug">
            {title}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            {lesson}
          </p>

          {/* INFO */}
          <div className="flex items-center justify-between mt-5">

            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={17} />
              <span className="text-sm">
                {duration}
              </span>
            </div>

            <p className="text-sm text-[#C4419F] font-medium">
              Full Course
            </p>

          </div>

          {/* BUTTON */}
          <button className="w-full mt-5 bg-[#C4419F] hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition">
            View Details
          </button>

        </div>
      </div>
    </div>
  );
}