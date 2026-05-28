// Home.jsx

import React from "react";
import JetCard from "../comp/crd";
import KidCareHero from "../comp/bby";
import PediatricHero from "../comp/bottom";
import CourseLandingPage from "../comp/parterners";
import PopularCoursesSection from "../comp/last";
import TeacherSection from "../comp/me";
import TestimonialsSection  from "../comp/you";  
import Footer from "../comp/Footer";
import Navbar from "../comp/navbar";

import {
  Search,
} from "lucide-react";

export default function BioLearning() {

  const courses = [
    {
      image:
        "https://images.unsplash.com/photo-1544016768-982d1554f0b9?q=80&w=1200&auto=format&fit=crop",
      title: "Study About Human Body",
      lesson: "The middle lesson",
      duration: "1h 25 min",
      rating: "4.7",
    },

    {
      image:
        "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1200&auto=format&fit=crop",
      title: "Chemistry Laboratory",
      lesson: "Advanced chemistry",
      duration: "2h 10 min",
      rating: "4.9",
    },

    {
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
      title: "Physics And Motion",
      lesson: "Beginner course",
      duration: "45 min",
      rating: "4.5",
    },

    {
      image:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200&auto=format&fit=crop",
      title: "Science Space Study",
      lesson: "Professional lesson",
      duration: "3h 05 min",
      rating: "5.0",
    },
  ];

  return (   
  
  <>
  
  <Navbar  />
    <div className="min-h-screen bg-[#f6f6fb] overflow-hidden">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative">

        {/* BLUR EFFECTS */}
        <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] bg-purple-200 blur-[120px] opacity-50 rounded-full"></div>

        <div className="absolute bottom-[-80px]  w-[280px] h-[280px] bg-purple-100 blur-[120px] opacity-50 rounded-full"></div>

        {/* NAVBAR */}
     

        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-16 items-center  relative z-10">

          {/* LEFT */}
          <div>

            <h1 className="text-6xl mt-32 font-extrabold leading-tight text-gray-900">

              Learn Science.
              <br />

              Understand{" "}
              <span className="text-[#B83092]">
                Better.
              </span>

              <br />

              <span className="text-[#B83092]">
                Build Your Future.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-gray-600 text-lg leading-relaxed">
              Interactive lessons, smart quizzes and recognized certificates
              to help you master science and prepare for your dream career.
            </p>

            {/* BUTTONS */}
            <div className="flex items-center gap-5 mt-10">

              <button className="bg-[#C4419F] cursor-pointer  px-6 py-3 rounded-xl shadow-xl transition font-medium">
                Start Learning
              </button>

              <button className="border cursor-pointer border-[#C4419F] hover:bg-blue-50 text-[#C4419F] px-6 py-3 rounded-xl transition font-medium">
                Explore Courses
              </button>

            </div>

            {/* SEARCH */}
            <div className="mt-10 relative max-w-xl">

              <input
                type="text"
                placeholder="Search science topics..."
                className="w-full bg-white border border-[#C4419F] rounded-xl px-3 py-3 outline-none shadow-sm"
              />

              <button className="absolute right-1 top-1 bg-[#C4419F] cursor-pointer text-white py-3 px-3 rounded-xl">
                <Search size={20} />
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center">

            <img
              src="hjhj.webp"
              alt="hero"
              loading="lazy"
              className="w-full  max-w-xl object-cover rounded-xl "
            />

          </div>

        </section>

        {/* COURSES */}
        <section className="mt-28 relative z-10">

          {/* TITLE */}
          <div className="flex items-center justify-between mb-10">

            <div>
              <h2 className="text-4xl font-bold text-gray-800">
                Featured Courses
              </h2>

              <p className="text-gray-500 mt-2">
                Explore the most popular science lessons
              </p>
            </div>

            <button className="bg-[#C4419F] hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition">
              View All
            </button>

          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {courses.map((course, index) => (
              <JetCard
                key={index}
                image={course.image}
                title={course.title}
                lesson={course.lesson}
                duration={course.duration}
                rating={course.rating}
              />
            ))}

          </div>

        </section>

        {/* BABY SECTION */}
        <section className="mt-32">
          <KidCareHero />
        </section>

        {/* BOTTOM SECTION */}
        <section className="mt-32 mb-20">
          <PediatricHero />
          <CourseLandingPage />
          <PopularCoursesSection />
          <TeacherSection />
          <TestimonialsSection />
          <Footer />
        </section>

      </div>
    </div>
    </>
  );
}