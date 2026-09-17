import { useState } from "react";
import Navbar from "../comp/navbar.jsx";
import Footer from "../comp/Footer.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setSent("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setSent("Enter a valid email address.");
      return;
    }
    setSent("Thanks for contacting ScienceLearn. We will reply to your email.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f6f6fb] pt-28 pb-16 px-4 lg:px-10">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900">Contact us</h1>
          <p className="text-gray-500 mt-3">
            Questions about lessons, quizzes, or certificates? Send a message.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full border rounded-xl p-4 outline-none focus:border-[#C4419F]"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your email"
              className="w-full border rounded-xl p-4 outline-none focus:border-[#C4419F]"
            />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?"
              className="w-full border rounded-xl p-4 h-36 outline-none focus:border-[#C4419F]"
            />
            {sent && <p className="text-sm text-[#C4419F]">{sent}</p>}
            <button
              type="submit"
              className="bg-[#C4419F] text-white px-8 py-3 rounded-xl font-semibold"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
