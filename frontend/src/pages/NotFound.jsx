import { Link } from "react-router-dom";
import Navbar from "../comp/navbar.jsx";
import Footer from "../comp/Footer.jsx";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f6f6fb] pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900">Page not found</h1>
        <p className="text-gray-500 mt-4">That link does not match a page in ScienceLearn.</p>
        <Link
          to="/home"
          className="inline-block mt-8 bg-[#C4419F] text-white px-8 py-3 rounded-xl font-semibold"
        >
          Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
