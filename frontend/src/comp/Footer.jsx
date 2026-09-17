import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed("Enter a valid email to subscribe.");
      return;
    }
    setSubscribed("You are subscribed to ScienceLearn updates.");
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-[#1a1033] to-[#2a1a4d] pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Newsletter Box */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-white/10">

          {/* Text + Input */}
          <div className="text-white max-w-2xl">
            <h3 className="text-2xl font-bold mb-2 text-[#E8A8D2]">
              Subscribe to get the latest lessons and quiz updates
            </h3>
            <p className="text-sm opacity-80 mb-4">
              Join thousands of learners and get weekly science tips, new lessons, and exclusive quizzes delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 outline-none bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-[#C4419F]"
              />
              <button
                type="submit"
                className="bg-[#C4419F] rounded-lg border border-transparent text-white px-6 py-3 font-medium hover:bg-[#A73688] transition"
              >
                Subscribe
              </button>
            </form>
            {subscribed && <p className="text-xs mt-2 text-[#E8A8D2]">{subscribed}</p>}

            <p className="text-xs mt-2 opacity-60">
              You will be able to unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 text-white">

          {/* Brand */}
          <div>
            <h4 className="text-xl font-bold text-[#E8A8D2] mb-3">
              ScienceLearn
            </h4>
            <p className="text-sm mb-4 opacity-75">
              Interactive science learning platform for curious minds. Learn, practice, and earn certificates in Biology, Chemistry, Physics, and more.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C4419F] transition">f</a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C4419F] transition">X</a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C4419F] transition">in</a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C4419F] transition">YT</a>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h5 className="font-bold text-[#E8A8D2] mb-3">Learn</h5>
            <ul className="space-y-2 text-sm opacity-85">
              <li><Link to="/lessons" className="hover:underline hover:text-[#E8A8D2]">All Lessons</Link></li>
              <li><Link to="/quizse" className="hover:underline hover:text-[#E8A8D2]">Quizzes</Link></li>
              <li><Link to="/tips" className="hover:underline hover:text-[#E8A8D2]">Science Tips</Link></li>
              <li><Link to="/certificate" className="hover:underline hover:text-[#E8A8D2]">Certificates</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-[#E8A8D2] mb-3">Company</h5>
            <ul className="space-y-2 text-sm opacity-85">
              <li><Link to="/about-us" className="hover:underline hover:text-[#E8A8D2]">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-[#E8A8D2]">Contact</Link></li>
              <li><Link to="/signup" className="hover:underline hover:text-[#E8A8D2]">Get Started</Link></li>
              <li><Link to="/profile" className="hover:underline hover:text-[#E8A8D2]">My Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-bold text-[#E8A8D2] mb-3">Support</h5>
            <ul className="space-y-2 text-sm opacity-85">
              <li><Link to="/contact" className="hover:underline hover:text-[#E8A8D2]">Help Center</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-[#E8A8D2]">Feedback</Link></li>
              <li><a href="mailto:support@sciencelearn.com" className="hover:underline hover:text-[#E8A8D2]">✉ support@sciencelearn.com</a></li>
              <li><Link to="/login" className="hover:underline hover:text-[#E8A8D2]">Sign In</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-white/70">
          <p>© {new Date().getFullYear()} ScienceLearn. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link to="/about-us" className="hover:text-[#E8A8D2]">Privacy Policy</Link>
            <Link to="/about-us" className="hover:text-[#E8A8D2]">Terms of Use</Link>
            <Link to="/contact" className="hover:text-[#E8A8D2]">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
