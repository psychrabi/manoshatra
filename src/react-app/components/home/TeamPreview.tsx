import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TEAM } from "../../data/constants";

export default function TeamPreview() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="team-preview">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">Meet the Experts</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">
            Our Dedicated Team
          </h2>
          <p className="text-brand-muted text-lg mt-4 max-w-2xl mx-auto">
            Our qualified mental health professionals bring expertise,
            compassion, and dedication to every session.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="bg-brand-beige rounded-2xl p-6 text-center card-hover"
              data-testid={`team-card-${member.id}`}
            >
              <div className={`team-avatar ${member.color}`}>
                {member.initials}
              </div>
              <h3 className="font-heading font-bold text-brand-text text-base mb-1">
                {member.name}
              </h3>
              <p className="text-brand-green text-sm font-semibold mb-3">
                {member.designation}
              </p>
              <p className="text-brand-muted text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/team" className="btn-outline" data-testid="meet-team-btn">
            Meet Full Team <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
