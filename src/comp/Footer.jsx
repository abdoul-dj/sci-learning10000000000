const Footer = () => {
  return (
    <footer className="bg-blue-600 pt-20  pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Newsletter Box */}
        <div className=" rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          
          {/* Image */}
          <div className=" rounded-xl shadow-2xl h-100 w-100 transform rotate-4">
            <img
              src="/now.png"
              alt="Vacuum"
              className=""
            />
          </div>

          {/* Text + Input */}
          <div className="text-white max-w-xl">
            <h3 className="text-2xl text-[#C4419F]  font-bold mb-2">
              Subscribe to our newsletter to get updates to our latest collections
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Get 20% off on your first order just by subscribing to our newsletter
            </p>

            <div className="flex bg-blue-600 ">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 outline-none text-white  border border-[#C4419F]  rounded-md"
              />
              <button className="bg-[#C4419F]  rounded-md border border-[#f6f6fb] text-white hover:cursor-pointer px-6 py-3 font-medium">
                Subscribe
              </button>
            </div>

            <p className="text-xs mt-2 opacity-80">
              You will be able to unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-16 text-white">
          
          {/* Brand */}
          <div>
            <h4 className="text-lg font-bold text-[#C4419F]  mb-3">
              Stay Clean
            </h4>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex gap-3 text-white">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-google"></i>
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-[#C4419F]  ">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Services</li>
              <li>Community</li>
              <li>Testimonial</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-bold text-[#C4419F]  mb-3">Support</h5>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Tweet Us</li>
              <li>Webinars</li>
              <li>Feedback</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-semibold text-[#C4419F]  mb-3">Links</h5>
            <ul className="space-y-2 text-sm">
              <li>Advertisement</li>
              <li>Become Advicer</li>
              <li>Service</li>
              <li>All in One</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-[#C4419F]  mb-3">Contact Us</h5>
            <ul className="space-y-2 text-sm">
              <li>📞 (+250) 78765 4324</li>
              <li>✉ support@email.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm text-white">
          <p>© Copyright by CodeUI. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Legal</span>
            <span>Site Map</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
