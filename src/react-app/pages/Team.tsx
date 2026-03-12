import { Link } from "react-router-dom";
import { TEAM } from "../data/constants";

const Team = () => {
  return (
    <div data-testid="team-page">
      <section className="page-hero" data-testid="team-hero">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <span className="section-badge">Our Experts</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mt-2 mb-4">
            Meet Our Dedicated Team
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Our qualified mental health professionals are committed to providing
            compassionate, expert care to every client.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" data-testid="team-grid">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.id}
                className="bg-brand-beige rounded-3xl p-8 text-center card-hover border border-transparent hover:border-border"
                data-testid={`team-member-${member.id}`}
              >
                <div className={`team-avatar ${member.color} text-xl`}>
                  {member.initials}
                </div>
                <h2 className="font-heading font-bold text-brand-text text-lg mb-1">
                  {member.name}
                </h2>
             
                <span className="inline-block bg-green-50 text-brand-green text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {member.designation}
                </span> <br />
                
                <span className={`inline-block bg-green-50 text-brand-green text-xs font-bold px-3 py-1 rounded-full mb-4 ${member.license ? '' : 'invisible'}`}>
                  {member.license}
                </span>
               
                <p className="text-brand-muted text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team */}
      <section className="py-16 bg-brand-beige" data-testid="team-why">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-badge">Our Promise</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mt-2 mb-6">
                Why Trust Our Team?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    t: "Qualified Professionals",
                    d: "All our team members hold advanced degrees in psychology and psychiatry from recognized institutions.",
                  },
                  {
                    t: "Ongoing Training",
                    d: "Our team regularly participates in professional development to stay current with the latest therapeutic approaches.",
                  },
                  {
                    t: "Supervised Practice",
                    d: "All clinical work is conducted under appropriate supervision to ensure the highest quality of care.",
                  },
                  {
                    t: "Cultural Sensitivity",
                    d: "Our team is trained to provide culturally sensitive care that respects the diverse backgrounds of our clients.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 rounded-full bg-brand-green" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-brand-text text-sm">
                        {item.t}
                      </p>
                      <p className="text-brand-muted text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-brand-text mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-brand-muted mb-6 leading-relaxed">
                Our team is here to match you with the right professional for
                your specific needs. Book an appointment and we'll ensure the
                best fit for your journey.
              </p>
              <Link
                to="/appointments"
                className="btn-primary"
                data-testid="team-book-btn"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Team;
