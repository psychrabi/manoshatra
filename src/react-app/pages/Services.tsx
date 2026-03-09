import { Link } from "react-router-dom";
import { Brain, User, Users, Heart, Shield, ClipboardList, ArrowRight } from "lucide-react";
import { SERVICES } from "../data/constants";

const iconMap = {
  brain: Brain, user: User, users: Users, heart: Heart,
  shield: Shield, clipboard: ClipboardList, "users-round": Users,
};

const details = {
  "Psychiatric OPD": {
    details: ["Initial psychiatric evaluation and diagnosis", "Medication management and monitoring", "Follow-up consultations", "Referral coordination with specialists"],
    who: "Adults experiencing symptoms of depression, anxiety, bipolar disorder, schizophrenia, or other psychiatric conditions.",
  },
  "Individual Counseling": {
    details: ["Confidential one-on-one sessions", "Cognitive Behavioral Therapy (CBT)", "Trauma-informed approaches", "Personalized treatment planning"],
    who: "Anyone dealing with stress, anxiety, depression, grief, trauma, or seeking personal growth.",
  },
  "Family Therapy": {
    details: ["Communication skill building", "Conflict resolution strategies", "Family dynamics assessment", "Parenting support"],
    who: "Families experiencing conflict, communication breakdowns, or navigating major life transitions.",
  },
  "Child & Adolescent Support": {
    details: ["Age-appropriate therapeutic interventions", "Play therapy for younger children", "School performance concerns", "Behavioral challenges"],
    who: "Children and teenagers facing behavioral issues, academic challenges, or emotional difficulties.",
  },
  "Crisis Intervention": {
    details: ["Immediate psychological support", "Safety planning", "Stabilization techniques", "Connection to ongoing care"],
    who: "Individuals experiencing acute mental health crises, suicidal ideation, or severe emotional distress.",
  },
  "Group Therapy": {
    details: ["Structured therapeutic groups", "Peer support and connection", "Skill-building workshops", "Regular group sessions"],
    who: "Individuals who benefit from shared experiences and peer support in managing similar challenges.",
  },
  "Psychological Assessments": {
    details: ["Standardized psychometric testing", "Intelligence and aptitude assessment", "Personality evaluation", "Detailed written reports"],
    who: "Individuals requiring formal diagnosis, academic assessment, or comprehensive psychological profiling.",
  },
};

export default function Services() {
  return (
    <div data-testid="services-page">
      <section className="page-hero" data-testid="services-hero">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <span className="section-badge">What We Offer</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mt-2 mb-4">
            Comprehensive Mental Health Services
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            We offer a wide range of evidence-based psychological services to support your mental health and wellbeing.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" data-testid="services-list">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="space-y-12">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Heart;
              const detail = details[service.title] || {};
              const isEven = i % 2 === 0;
              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8 rounded-3xl ${isEven ? "bg-brand-beige" : "bg-white border border-border"}`}
                  data-testid={`service-detail-${i}`}
                >
                  <div className={isEven ? "" : "lg:order-2"}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${service.color === "blue" ? "bg-blue-50" : "bg-green-50"}`}>
                      <Icon size={26} className={service.color === "blue" ? "text-brand-blue" : "text-brand-green"} />
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text mb-3">{service.title}</h2>
                    <p className="text-brand-muted leading-relaxed mb-4">{service.description}</p>
                    {detail.who && (
                      <p className="text-sm text-brand-muted bg-white rounded-xl p-3 border border-border">
                        <span className="font-bold text-brand-text">Best for: </span>{detail.who}
                      </p>
                    )}
                  </div>
                  {detail.details && (
                    <div className={`bg-white rounded-2xl p-6 shadow-sm ${isEven ? "" : "lg:order-1"}`}>
                      <h4 className="font-heading font-bold text-brand-text mb-4 text-sm uppercase tracking-wider">What's Included</h4>
                      <ul className="space-y-3">
                        {detail.details.map((d, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-brand-green" />
                            </div>
                            <span className="text-brand-muted text-sm">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-beige" data-testid="services-cta">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-text mb-4">Not Sure Which Service is Right for You?</h2>
          <p className="text-brand-muted text-lg mb-8 max-w-xl mx-auto">
            Book a consultation and our team will help guide you to the most appropriate service for your needs.
          </p>
          <Link to="/appointments" className="btn-primary" data-testid="services-book-btn">
            Book a Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
