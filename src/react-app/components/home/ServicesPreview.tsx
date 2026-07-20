import {
  Brain,
  ChevronRight,
  ClipboardList,
  Heart,
  Shield,
  User,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "../../data/constants";

const iconMap = {
  brain: Brain,
  user: User,
  users: Users,
  heart: Heart,
  shield: Shield,
  clipboard: ClipboardList,
  "users-round": Users,
};

export default function ServicesPreview() {
  return (
    <section
      className="py-16 md:py-24 bg-brand-beige"
      data-testid="services-preview"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">What We Offer</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">
            Our Specialized Services
          </h2>
          <p className="text-brand-muted text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive mental health services delivered by our expert team
            with compassion and professionalism.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 6).map((service, i) => {
            const Icon = iconMap[service.icon] || Heart;
            const isBlue = service.color === "blue";
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border-t-4 card-hover ${
                  isBlue ? "service-card-border-blue" : "service-card-border"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
                data-testid={`service-card-${i}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isBlue ? "bg-blue-50" : "bg-green-50"
                  }`}
                >
                  <Icon
                    size={22}
                    className={isBlue ? "text-brand-blue" : "text-brand-green"}
                  />
                </div>
                <h3 className="font-heading font-bold text-brand-text text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="btn-outline"
            data-testid="all-services-btn"
          >
            View All Services <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
