import { Link } from "react-router-dom";
import { CONTACT_INFO } from "../../data/constants";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24" data-testid="cta-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="gradient-green rounded-3xl p-8 md:p-16 text-center text-white">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Take the First Step Towards Healing
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            You deserve to feel better. Our compassionate team is ready to walk
            this journey with you. Book your appointment today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/appointments"
              className="bg-white text-brand-green font-bold rounded-full px-8 py-3 hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              data-testid="cta-book-btn"
            >
              Schedule a Session
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="border-2 border-white text-white rounded-full px-8 py-3 font-bold hover:bg-white/10 transition-colors duration-200"
              data-testid="cta-call-btn"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
