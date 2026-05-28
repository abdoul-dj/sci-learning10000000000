import React from "react";

const TeacherSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#f7f4f8] px-4">
      <div
        className="
          max-w-5xl
          w-full
          bg-white
          rounded-3xl
          shadow-lg
          border border-pink-100
          overflow-hidden
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          p-6
          md:p-12
          gap-10
          transition-all
          duration-300
        "
      >
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-gray-500 mb-2 tracking-wide">
            If You Are A Upper secondary student
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Then Become An <br />
            Proffessional 
          </h1>

          <p className="text-gray-500 mt-5 text-base leading-relaxed max-w-lg">
            Imporove your knowledge with students around the world and
            build your studying journey with our modern learning platform.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {[
              "Interactive Teaching Tools",
              "Flexible Learning Platform",
              "Manage Students Easily",
              "24/7 Instructor Support",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <div className="w-2 h-2 rounded-full bg-[#C4419F]"></div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            className="
              mt-8

              bg-[#C4419F]
              hover:bg-pink-600
              text-white
              px-7
              py-3
              rounded-xl
              font-semibold
              shadow-md
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
            "
          >
            Become An Proffesional
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <div
            className="
              relative
              w-[260px]
              h-[260px]
              rounded-full
              bg-pink-200
              flex
              items-center
              justify-center
              overflow-hidden
              border-8
              border-pink-200
              shadow-xl
            "
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
              alt="Instructor"
              loading="lazy"
              className="
                w-full
                h-full
                object-cover
                rounded-full
                transform
                hover:scale-110
                transition-transform
                duration-500
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TeacherSection);