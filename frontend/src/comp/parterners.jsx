import React from "react";
import {
  Search,
  PlayCircle,
  FileText,
  MonitorPlay,
} from "lucide-react";

export default function CourseLandingPage() {
  return (
    <div className=" md:px-16 mt-40 bg-[#f7eff9] flex items-center justify-center ">
      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-xl overflow-hidden">
        
        {/* Top Navbar */}
        <div className=" px-8 py-4 flex items-center justify-between">
          {/* Logo */}
         
          {/* Nav Links */}
      
        </div>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center px-10 py-14">
          
          {/* Left Side */}
          <div>
            

            {/* Image Grid */}
            <div className=" rounded-[22px] p-4 w-fit ">
              <div className="grid grid-cols-2 gap-4">
                
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
                  alt=""
                  className="w-36 h-36 object-cover rounded-[24px]"
                />

                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
                  alt=""
                  className="w-36 h-36 object-cover rounded-[24px]"
                />

                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400"
                  alt=""
                  className="w-36 h-36 object-cover rounded-[24px]"
                />

                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400"
                  alt=""
                  className="w-36 h-36 object-cover rounded-[24px]"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center">
            <span className="text-[#C4419F] font-semibold text-sm mb-2">
              Benefits
            </span>

            <h2 className="text-3xl font-bold text-[#2d1b46] leading-snug mb-8">
              From Our Online <br /> Learning
            </h2>

            {/* Benefit Items */}
            <div className="space-y-6">
              
              <div className="flex items-center gap-4">
                <div className=" p-3 rounded-full">
                  <PlayCircle className="text-[#C4419F]" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d1b46]">
                    Online Degrees
                  </h3>
                  <p className="text-sm">
                    Learn anywhere anytime
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full">
                  <FileText className="text-[#C4419F]" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d1b46]">
                    Short lessons
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Improve your skills fast
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full">
                  <MonitorPlay className="text-[#C4419F]" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d1b46]">
                    Training From Experiment
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Professional learning paths
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className=" p-3 rounded-full">
                  <MonitorPlay className="text-[#C4419F]" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d1b46]">
                    1.6k Video Courses
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Unlimited access to videos
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}