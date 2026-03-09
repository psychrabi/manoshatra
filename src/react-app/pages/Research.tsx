import { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, ExternalLink, Calendar, Users } from "lucide-react";

const Research = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/research`)
      .then((r) => setPublications(r.data))
      .catch(() => setPublications([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="research-page">
      <section className="page-hero" data-testid="research-hero">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <span className="section-badge">Academic Work</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mt-2 mb-4">
            Research & Publications
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Our team is dedicated to advancing the field of mental health
            through rigorous research and evidence-based practice in Nepal.
          </p>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-16 bg-white" data-testid="research-overview">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: BookOpen,
                title: "Evidence-Based Practice",
                desc: "All our clinical work is grounded in the latest research and proven therapeutic methods.",
              },
              {
                icon: Users,
                title: "Community Research",
                desc: "We conduct research on mental health challenges specific to the Nepali population.",
              },
              {
                icon: Calendar,
                title: "Ongoing Studies",
                desc: "We are continuously engaged in new research projects to improve care quality.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-brand-beige rounded-2xl p-6 text-center"
                  data-testid={`research-feature-${i}`}
                >
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-brand-green" />
                  </div>
                  <h2 className="font-heading font-bold text-brand-text text-base mb-2">
                    {item.title}
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Publications */}
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text mb-8">
              Publications
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-brand-beige rounded-2xl p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6" data-testid="publications-list">
                {publications.map((pub, i) => (
                  <div
                    key={pub.id}
                    className="bg-brand-beige rounded-2xl p-6 md:p-8 card-hover"
                    data-testid={`publication-${i}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold bg-brand-green text-white px-3 py-1 rounded-full">
                            {pub.year}
                          </span>
                          {pub.journal && (
                            <span className="text-xs text-brand-blue font-semibold">
                              {pub.journal}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-bold text-brand-text text-lg mb-2">
                          {pub.title}
                        </h3>
                        <p className="text-brand-green text-sm font-semibold mb-3 flex items-center gap-2">
                          <Users size={14} /> {pub.authors}
                        </p>
                        <p className="text-brand-muted text-sm leading-relaxed">
                          {pub.abstract}
                        </p>
                        {pub.doi && (
                          <p className="text-xs text-brand-muted mt-3 font-mono">
                            DOI: {pub.doi}
                          </p>
                        )}
                      </div>
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-brand-blue hover:text-blue-700 transition-colors duration-200"
                          data-testid={`pub-link-${i}`}
                          title={`Read more about ${pub.title}`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Collaborate */}
      <section
        className="py-16 bg-brand-beige"
        data-testid="research-collaborate"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-text mb-4">
            Interested in Collaborating?
          </h2>
          <p className="text-brand-muted text-lg mb-8 max-w-2xl mx-auto">
            We welcome collaborations with researchers, academic institutions,
            and mental health organizations. Reach out to discuss partnership
            opportunities.
          </p>
          <a
            href="mailto:manoshastracounseling@gmail.com"
            className="btn-primary"
            data-testid="research-contact-btn"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};
export default Research;
