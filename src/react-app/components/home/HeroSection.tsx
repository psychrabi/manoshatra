import { ArrowRight, Award, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "../../data/constants";

export default function HeroSection() {
  return (
    <section
      className="gradient-hero pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      data-testid="hero-section"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="section-badge">Est. 2019 • Lalitpur, Nepal</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-6">
              Your Journey to{" "}
              <span className="text-brand-green">Mental Wellness</span> Starts
              Here
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed mb-8 max-w-xl">
              Professional psychological counseling and research services. Our
              compassionate team of experts is here to support you through every
              step of your mental health journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/appointments"
                className="btn-primary"
                data-testid="hero-book-btn"
              >
                Book an Appointment <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="btn-outline"
                data-testid="hero-services-btn"
              >
                Our Services
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors duration-200"
              >
                <Phone size={18} className="text-brand-green" />
                <span className="font-semibold text-sm">
                  {CONTACT_INFO.phone}
                </span>
              </a>
              <span className="text-brand-muted text-sm">
                {CONTACT_INFO.hours}
              </span>
            </div>
          </div>
          <div className="relative hidden lg:block animate-slide-in-right">
            <div className="hero-image-container">
              <img
                src="./hero-image.webp"
                alt="Compassionate counseling session"
                className="w-full rounded-3xl object-cover shadow-2xl"
                style={{ height: "480px" }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-border animate-float">
              <p className="text-brand-green font-bold font-heading text-2xl">
                500+
              </p>
              <p className="text-brand-muted text-xs font-semibold">
                Lives Impacted
              </p>
            </div>
            <div className="absolute -top-4 -right-4 bg-brand-green rounded-2xl p-4 shadow-xl text-white">
              <Award size={28} />
              <p className="text-xs font-bold mt-1">Trusted Care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
