import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { CONTACT_INFO } from "../data/constants";

const Footer = () => {
  return (
    <footer className="bg-brand-text text-white" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-48.png"
                alt="ManoShastra Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-heading font-bold text-white text-base leading-tight">
                  ManoShastra
                </p>
                <p className="text-gray-400 text-xs">
                  Counseling & Research Center
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional psychological counseling and mental health research
              services in Lalitpur, Nepal. Est. 2019.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <span className="font-heading font-bold text-white text-sm uppercase tracking-wider">
                Follow Us On
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/9708072525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#25D366] transition-colors duration-200"
                  title="WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/manoshastra_counseling/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#E1306C] transition-colors duration-200"
                  title="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/manoshastracounseling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#1877F2] transition-colors duration-200"
                  title="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@manoshastracounseling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  title="TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Our Services", path: "/services" },
                { label: "Meet Our Team", path: "/team" },
                { label: "Research", path: "/research" },
                { label: "Blog", path: "/blog" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-brand-green-light text-sm transition-colors duration-200"
                    data-testid={`footer-link-${link.label
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-2">
              {[
                "Psychiatric OPD",
                "Individual Counseling",
                "Family Therapy",
                "Child & Adolescent Support",
                "Crisis Intervention",
                "Group Therapy",
                "Psychological Assessments",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-brand-green-light text-sm transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <MapPin
                  size={16}
                  className="text-brand-green-light mt-0.5 shrink-0"
                />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-brand-green-light text-sm transition-colors duration-200"
                  data-testid="footer-phone"
                >
                  <Phone
                    size={16}
                    className="text-brand-green-light shrink-0"
                  />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-brand-green-light text-sm transition-colors duration-200"
                  data-testid="footer-email"
                >
                  <Mail size={16} className="text-brand-green-light shrink-0" />
                  <span className="break-all">{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li className="mt-4">
                <Link
                  to="/appointments"
                  className="btn-primary text-sm py-2 px-5"
                  data-testid="footer-book-btn"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-300 text-xs">
            &copy; {new Date().getFullYear()} ManoShastra Counseling & Research
            Center. All rights reserved.
          </p>
          <p className="text-gray-300 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400 fill-red-400" />{" "}
            for mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
