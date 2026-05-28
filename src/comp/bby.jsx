import React from "react";
import { ArrowRight, Check } from "lucide-react";

export default function KidCareHero() {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] mt-40 flex items-center justify-center px-9">
      <div className="w-full max-w-4xl bg-white rounded-[28px] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div className="bg-[#f2f1ff] flex flex-col justify-center px-8 md:px-14 py-16">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-black">
            Your Health 
            <br />
            Knowledge, Our
            <br />
            Commitment.
          </h1>

          <p className="mt-8 text-gray-600 text-lg max-w-xl leading-relaxed">
           everything needed to improve the knowledge about science available here 
           with the flexible learning.
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-2 text-gray-800">
              <Check size={18} className="text-black" />
              <span className="text-sm md:text-base">
                There is important tips for human body
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-800">
              <Check size={18} className="text-black" />
              <span className="text-sm md:text-base">
                the self imporovement agent
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-10">
            <button className="bg-[#C4419F] hover:bg-blue-600 transition-all duration-300 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-medium shadow-md">
              Start Your Journey
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="bg-[#f7f7f7] flex items-center justify-center p-6">
          <img
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop"
            alt="Baby"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}