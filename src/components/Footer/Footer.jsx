import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-slate-900 text-white border-t border-slate-800">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">
          {/* Logo + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-4/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Blog Nest. All rights reserved.
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-300">Company</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item, index) => (
                <li key={index}>
                  <Link to="/" className="text-base text-gray-400 hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-300">Support</h3>
            <ul className="space-y-2">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item, index) => (
                <li key={index}>
                  <Link to="/" className="text-base text-gray-400 hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legals */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-300">Legal</h3>
            <ul className="space-y-2">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item, index) => (
                <li key={index}>
                  <Link to="/" className="text-base text-gray-400 hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Optional: Social Links */}
        <div className="mt-10 flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">LinkedIn</a>
          <a href="#" className="hover:text-white transition">GitHub</a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
