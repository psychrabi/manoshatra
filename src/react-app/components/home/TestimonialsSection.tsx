import { Star } from "lucide-react";
import { useTestimonials } from "../../hooks/useQueries";

export default function TestimonialsSection() {
  const { data: testimonials } = useTestimonials();
  return (
    <section
      className="py-16 md:py-24 bg-brand-beige"
      data-testid="testimonials-section"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">What Clients Say</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">
            Stories of Transformation
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials?.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm card-hover"
              data-testid={`testimonial-${i}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <Star key={j} size={14} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-quote text-sm mb-4">"{t.message}"</p>
              <div>
                <p className="font-heading font-bold text-brand-text text-sm">
                  {t.name}
                </p>
                <p className="text-brand-green text-xs font-semibold">
                  {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
