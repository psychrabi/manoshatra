import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { LOGO_URL } from "../data/constants";

interface NavLink {
  label: string;
  path: string;
}

const navLinks: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Our Team", path: "/team" },
  { label: "Research", path: "/research" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            data-testid="navbar-logo"
          >
            <img
              src="/logo-48.png"
              alt="ManoShastra Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-brand-text text-sm md:text-base leading-tight">
                ManoShastra
              </p>
              <p className="text-brand-muted text-xs leading-tight">
                Counseling & Research Center
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`nav-link ${
                  location.pathname === link.path ? "active" : ""
                }`}
                data-testid={`nav-${link.label
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:9708072525"
              className="flex items-center gap-2 text-brand-muted text-sm hover:text-brand-green transition-colors duration-200"
            >
              <Phone size={14} />
              <span>9708072525</span>
            </a>
            <Link
              to="/appointments"
              className="btn-primary text-sm py-2 px-5"
              data-testid="navbar-book-btn"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-brand-text hover:bg-brand-beige-dark transition-colors duration-200"
            data-testid="navbar-mobile-toggle"
            aria-label="Toggle mobile menu"
            type="button"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden bg-white border-t border-border shadow-lg"
          data-testid="mobile-menu"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "bg-brand-beige-dark text-brand-green"
                    : "text-brand-text hover:bg-brand-beige-dark"
                }`}
                data-testid={`mobile-nav-${link.label
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/appointments"
              className="btn-primary mt-3 justify-center text-sm"
              data-testid="mobile-book-btn"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
