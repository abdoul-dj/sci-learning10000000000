import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Biology learner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    text: "This platform completely changed the way I learn online. The courses are interactive and easy to follow.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Science explorer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    text: "Amazing experience! the course explain concepts clearly and the design feels modern and smooth.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Chemistry learner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    text: "I improved my science faster than ever. The logic behind of every organism i realized it.",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      className="
        w-full
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-r
        from-purple-500
        via-pink-500
        to-purple-600
        px-4
        py-16
      "
    >
      <div className="max-w-6xl w-full text-center">
        {/* Heading */}
        <p className="text-pink-100 font-semibold tracking-wide text-sm uppercase">
          Student's Testimonials
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-white mt-3">
          What Our Students Say
        </h1>

        <p className="text-pink-100 mt-4 max-w-2xl mx-auto leading-relaxed">
          Thousands of students trust our learning platform to improve their
          skills and grow science knowledge.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="
                bg-white/90
                backdrop-blur-md
                rounded-2xl
                p-6
                shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                border
                border-white/40
              "
            >
              {/* User */}
              <div className="flex items-center gap-4 mb-5 text-left">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                    border-2
                    border-[#C4419F]
                  "
                />

                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm ">{item.role}</p>
                </div>
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed text-left">
                {item.text}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-5">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-10">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <div className="w-3 h-3 rounded-full bg-pink-200"></div>
          <div className="w-3 h-3 rounded-full bg-pink-200"></div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TestimonialsSection);