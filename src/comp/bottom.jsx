import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  BellRing,
  HeartPulse,
} from "lucide-react";

export default function PediatricHero() {
  return (
    <section className=" bg-[#f4f7fbdd] flex items-center justify-center ">
      <div className="max-w-7xl w-full bg-white rounded-[35px] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="px-8 md:px-16 py-14 flex flex-col justify-center bg-gradient-to-br from-[#eef4ff] to-[#f9fbff]">
          
          {/* TAG */}
          <div className="w-fit bg-[#C4419F] px-5 py-2 rounded-full text-sm font-semibold mb-8">
            Trusted Health Knowledge
          </div>

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold leading-tight text-[#111827]">
            Caring About 
            <br />
            Little Knowledge
            <br />
            Every Day Increase your well-being.
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 text-gray-600 text-lg leading-relaxed max-w-xl">
           There is a lot of thing you need to know about health and science in general.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <ShieldCheck className="text-[#C4419F] mb-3" size={30} />
              <h3 className="font-semibold text-lg text-gray-900">
                Remember
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                "Do you know why you need to drink at least one cup of water every morning"
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <BellRing className="text-[#C4419F] mb-3" size={30} />
              <h3 className="font-semibold text-lg text-gray-900">
                Smart Reminders
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                'do you know to  miss vaccines and medication schedules can hurt your life.'
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sm:col-span-2">
              
              <h3 className="font-semibold text-lg text-gray-900">
                24/7 get certified by us based on your marks
               </h3>
              <p className="text-sm text-gray-500 mt-1">
                Continuous guide untill you certified.
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-10">
            <button className="bg-[#C4419F] hover:bg-blue-600 px-8 py-4 rounded-md flex items-center gap-3 text-lg font-medium transition-all">
              Get Started
              <ArrowRight size={20} />
            </button>

            <button className="border border-gray-300 hover:border-gray-400 px-8 py-4 rounded-md text-gray-700 font-medium transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative bg-[#edf3ff] flex items-center justify-center p-8">
          
          {/* BACKGROUND SHAPE */}
          <div className="absolute w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-40"></div>

          {/* IMAGE CARD */}
          <div className="relative z-10 bg-white rounded-[30px] p-5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop"
              alt="Child Care"
              className="w-full max-w-md h-[550px] object-cover rounded-[25px]"
            />
          </div>

          {/* FLOATING CARD */}
          <div className="absolute bottom-10 left-10 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full  flex items-center justify-center">
              <HeartPulse className="text-[#C4419F]" />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                Wisdom Growth
              </h4>
              <p className="text-sm text-gray-500">
                Study why  wellness always matter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}