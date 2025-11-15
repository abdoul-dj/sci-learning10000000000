import React, { useState } from 'react';
import { Bookmark, Heart } from 'lucide-react';

function Cardi () {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image Container */}
        <div className="relative group cursor-pointer">
          <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {/* Isometric 3D illustration placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Background elements */}
                <div className="absolute top-8 left-8 w-24 h-16 bg-blue-100 rounded-lg transform -rotate-12 opacity-60"></div>
                <div className="absolute top-12 right-12 w-16 h-16 bg-blue-200 rounded-full opacity-40"></div>
                
                {/* Center robot figure */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    {/* Robot head */}
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl border-4 border-gray-200 mx-auto mb-2">
                      <div className="flex justify-center items-center h-full">
                        <div className="w-12 h-8 bg-gray-800 rounded-lg"></div>
                      </div>
                    </div>
                    {/* Robot body */}
                    <div className="w-24 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg"></div>
                  </div>
                </div>

                {/* UI Elements floating */}
                <div className="absolute top-16 left-12 space-y-2">
                  <div className="w-32 h-3 bg-blue-500 rounded opacity-70"></div>
                  <div className="w-24 h-3 bg-blue-400 rounded opacity-60"></div>
                </div>

                {/* Data visualization */}
                <div className="absolute bottom-16 right-12">
                  <div className="flex space-x-1">
                    <div className="w-3 h-12 bg-blue-500 rounded opacity-60"></div>
                    <div className="w-3 h-16 bg-blue-600 rounded opacity-70"></div>
                    <div className="w-3 h-10 bg-blue-400 rounded opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-white font-semibold text-lg">
              Chub – AI Agent 3D Anima...
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Bookmark
                size={18}
                className={isBookmarked ? 'fill-current text-blue-600' : 'text-gray-700'}
              />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart
                size={18}
                className={isLiked ? 'fill-current text-red-500' : 'text-gray-700'}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800">Dipa Inhouse</span>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded uppercase font-medium">
                Team
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart size={16} className="fill-current" />
              <span>124</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>13.5k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardi;