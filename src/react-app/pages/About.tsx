import { ArrowRight, CheckCircle, Eye, Target } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Compassion",
    desc: "We approach every client with deep empathy, respect, and genuine care for their wellbeing.",
  },
  {
    title: "Confidentiality",
    desc: "Your privacy is sacred. Everything shared in our sessions remains completely confidential.",
  },
  {
    title: "Evidence-Based",
    desc: "We use proven, research-backed therapeutic approaches tailored to individual needs.",
  },
  {
    title: "Inclusivity",
    desc: "We welcome people of all backgrounds, cultures, and circumstances without judgment.",
  },
  {
    title: "Integrity",
    desc: "We maintain the highest ethical standards in all our professional practices.",
  },
  {
    title: "Growth-Focused",
    desc: "We believe in every person's capacity for growth, healing, and positive change.",
  },
];

const About = () => {
  return (
    <div data-testid="about-page">
      {/* Page Hero */}
      <section className="page-hero" data-testid="about-hero">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <span className="section-badge">About Us</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mt-2 mb-4">
            Healing Minds, Transforming Lives
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Since 2019, ManoShastra Counseling and Research Center has been a
            beacon of hope and healing in Lalitpur, Nepal.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white" data-testid="our-story">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-badge">Our Story</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mt-2 mb-6">
                Born from a Passion for Mental Wellness
              </h2>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <p>
                  ManoShastra Counseling and Research Center was founded in 2019
                  with a single, powerful mission: to make quality mental health
                  care accessible to everyone in Nepal. The word "ManoShastra"
                  combines the Nepali words for "mind" (मनो) and "knowledge"
                  (शास्त्र), reflecting our commitment to the science and wisdom
                  of mental health.
                </p>
                <p>
                  From our home in Kupondole, Lalitpur, we have grown into a
                  trusted center offering a comprehensive range of psychological
                  services. Our team of dedicated professionals brings diverse
                  expertise to serve individuals, families, and communities.
                </p>
                <p>
                  We believe that seeking help is a sign of strength, and we are
                  honored to be a safe space for those on their journey to
                  mental wellness.
                </p>
              </div>
              <Link
                to="/appointments"
                className="btn-primary mt-8 inline-flex"
                data-testid="about-book-btn"
              >
                Begin Your Journey <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <img
                src="./room.webp"
                alt="Counseling session"
                className="w-full rounded-3xl shadow-xl object-cover"
                style={{ height: "450px" }}
              />
              <div className="absolute -bottom-4 -left-4 bg-brand-green text-white rounded-2xl p-5 shadow-lg">
                <p className="font-heading font-bold text-3xl">2019</p>
                <p className="text-white/80 text-sm">Year Founded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="py-16 md:py-24 bg-brand-beige"
        data-testid="mission-vision"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
                <Target size={28} className="text-brand-green" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-text mb-4">
                Our Mission
              </h3>
              <p className="text-brand-muted leading-relaxed">
                To provide accessible, compassionate, and evidence-based
                psychological counseling and mental health services that empower
                individuals, families, and communities to achieve optimal mental
                wellbeing. We are committed to reducing the stigma around mental
                health and making professional support available to all who need
                it.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                <Eye size={28} className="text-brand-blue" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-text mb-4">
                Our Vision
              </h3>
              <p className="text-brand-muted leading-relaxed">
                A Nepal where every person has access to quality mental health
                care and where mental wellbeing is valued and prioritized
                alongside physical health. We envision a society free from the
                stigma of mental illness, where seeking psychological support is
                seen as an act of courage and self-care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white" data-testid="our-values">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <span className="section-badge">What Drives Us</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-brand-beige rounded-2xl"
                data-testid={`value-${i}`}
              >
                <CheckCircle
                  size={22}
                  className="text-brand-green shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-heading font-bold text-brand-text mb-1">
                    {v.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-beige" data-testid="about-cta">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-text mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-brand-muted text-lg mb-8 max-w-xl mx-auto">
            Our team is here to support you. Take the first step today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/appointments"
              className="btn-primary"
              data-testid="about-cta-book"
            >
              Book an Appointment
            </Link>
            <Link
              to="/contact"
              className="btn-outline"
              data-testid="about-cta-contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
