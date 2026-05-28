import Navbar from "../comp/navbar"
import Footer from "../comp/Footer"

export default function About(){


return(

<>
<div className="absolute ">
    <Navbar />

</div>
<section className="relative  overflow-hidden bg-[#f5f2fa] py-28">
  {/* BACKGROUND BLUR */}
  <div className="absolute  top-0 right-0 w-[500px] h-[500px] bg-[#d946ef]/10 rounded-full blur-[120px]" />

  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      
      {/* LEFT CONTENT */}
      <div>
        {/* SMALL LABEL */}
        <div className="inline-flex mt-20 items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#eadcf3] shadow-sm mb-8">
          <div className="w-3 h-3  rounded-full bg-[#c13ca3]" />
          <span className="text-[#c13ca3] font-semibold text-sm tracking-wide">
            ABOUT OUR PLATFORM
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-[52px] md:text-[68px] leading-[1.05] font-black tracking-tight text-[#0b132b]">
          Helping Science
          <br />
          Students Build
          <span className="block text-[#c13ca3]">
            Real Understanding.
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-8 text-[19px] leading-[1.9] text-[#3b4252] max-w-2xl">
          Our platform was created to help secondary school science students
          strengthen their practical understanding of Biology, Chemistry,
          Health Science, and Environmental studies through modern digital
          learning experiences.
        </p>

        <p className="mt-6 text-[19px] leading-[1.9] text-[#3b4252] max-w-2xl">
          We combine interactive lessons, quizzes, certifications,
          performance tracking, and engaging educational tools to make
          science learning more accessible, practical, and motivating for
          students preparing for future careers and opportunities.
        </p>

        {/* FEATURES */}
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          
          <div className="bg-white rounded-3xl p-6 border border-[#ece7f5] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#f7e4f2] flex items-center justify-center text-2xl">
              🧬
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#0b132b]">
              Science Learning
            </h3>

            <p className="mt-2 text-[#5b6475] leading-relaxed">
              Interactive Biology and Chemistry education for students.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#ece7f5] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#f7e4f2] flex items-center justify-center text-2xl">
              📊
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#0b132b]">
              Smart Analytics
            </h3>

            <p className="mt-2 text-[#5b6475] leading-relaxed">
              Track quiz performance and monitor learning growth.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#ece7f5] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#f7e4f2] flex items-center justify-center text-2xl">
              🏆
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#0b132b]">
              Certifications
            </h3>

            <p className="mt-2 text-[#5b6475] leading-relaxed">
              Earn certificates after successfully completing assessments.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#ece7f5] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#f7e4f2] flex items-center justify-center text-2xl">
              🌍
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#0b132b]">
              Future Vision
            </h3>

            <p className="mt-2 text-[#5b6475] leading-relaxed">
              Empowering African students through modern science education.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex justify-center">
        
        {/* BIG CIRCLE */}
        <div className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#d946ef] to-[#9333ea] opacity-90" />

        {/* DASHED BORDER */}
        <div className="absolute w-[620px] h-[620px] rounded-full border-2 border-dashed border-[#d9cfe7]" />

        {/* MAIN CARD */}
        <div className="relative z-20 bg-white rounded-[40px] shadow-2xl border border-[#ece7f5] p-10 w-[430px]">
          
          {/* TOP */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8d95a5]">
                Student Progress
              </p>

              <h3 className="text-4xl font-black text-[#0b132b] mt-2">
                89%
              </h3>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d946ef] to-[#9333ea] flex items-center justify-center text-white text-2xl shadow-lg">
              📚
            </div>
          </div>

          {/* CHART */}
          <div className="mt-10">
            <div className="flex items-end gap-3 h-[180px]">
              <div className="w-full bg-[#f0e8f8] rounded-t-3xl h-[40%]" />
              <div className="w-full bg-[#e7d4f6] rounded-t-3xl h-[55%]" />
              <div className="w-full bg-[#d8b6f3] rounded-t-3xl h-[70%]" />
              <div className="w-full bg-[#c13ca3] rounded-t-3xl h-[95%]" />
            </div>

            <div className="flex justify-between mt-4 text-sm text-[#8d95a5]">
              <span>Biology</span>
              <span>Chemistry</span>
              <span>Health</span>
              <span>Growth</span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-[#faf7fd] rounded-2xl p-5 border border-[#ece7f5]">
              <h4 className="text-3xl font-black text-[#c13ca3]">
                120+
              </h4>

              <p className="text-[#7b8495] mt-1 text-sm">
                Interactive Lessons
              </p>
            </div>

            <div className="bg-[#faf7fd] rounded-2xl p-5 border border-[#ece7f5]">
              <h4 className="text-3xl font-black text-[#c13ca3]">
                98%
              </h4>

              <p className="text-[#7b8495] mt-1 text-sm">
                Student Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* FLOATING ELEMENT */}
        <div className="absolute left-0 bottom-12 bg-white rounded-3xl shadow-xl px-6 py-5 border border-[#ece7f5] z-30">
          <p className="text-sm text-[#8d95a5]">
            Certified Students
          </p>

          <h3 className="text-3xl font-black text-[#0b132b] mt-1">
            2,500+
          </h3>
        </div>
      </div>
    </div>
  </div>
</section>
<Footer />

</>

)



}