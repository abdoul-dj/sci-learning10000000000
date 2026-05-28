import React from "react";
import {
  Clock3,
  Star,
  BookOpen,
} from "lucide-react";

export default function PopularCoursesSection() {
  const courses = [
    {
      title: "Genetics",
      lessons: "12 Lessons",
      price: "$200",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
    },
    {
      title: "Physcology",
      lessons: "10 Lessons",
      price: "$300",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200",
    },
    {
      title: "Reproduction",
      lessons: "14 Lessons",
      price: "$250",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200",
    },
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center p-8">
      {/* Main Card */}
      <div className="w-full max-w-5xl rounded-[28px] bg-[#c77dff] shadow-2xl p-10">
        
        {/* Header */}
        <div className="text-center text-white/90 mb-10">
          <p className="text-sm  font-medium tracking-wide mb-2">
            Our Learning Platform
          </p>

          <h1 className=" text-4xl font-bold mb-3">
            Our Popular Courses
          </h1>

          <p className=" text-sm  max-w-2xl mx-auto leading-relaxed">
            Explore the best online courses designed to improve your knowledge,
            ability, and science  skills with real world  and
            expert guidance.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-[24px] overflow-hidden shadow-lg hover:scale-105 transition-all duration-300"
            >
              
              {/* Image */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-44 w-full object-cover"
                />

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-[#C4419F] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  NEW
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                
                {/* Small Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock3 size={16} />
                    <span>6 Weeks</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-[#C4419F] text-[#C4419F]"
                    />
                    <span>4.9</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-[#2d1b46] mb-3">
                  {course.title}
                </h2>

                {/* Lessons */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-5">
                  <BookOpen size={16} />
                  <span>{course.lessons}</span>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between">
                  <span className="text-[#C4419F] text-2xl font-bold">
                    {course.price}
                  </span>

                  <button className="bg-[#C4419F] hover:bg-[#b65cff] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}