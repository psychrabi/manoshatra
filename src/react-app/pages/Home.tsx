import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Brain, User, Users, Heart, Shield, ClipboardList, ChevronRight, Star, Calendar, Award, Phone } from "lucide-react";
import { SERVICES, TEAM, STATS, CONTACT_INFO } from "../data/constants";

const API = `/api`;

const iconMap = {
  brain: Brain, user: User, users: Users, heart: Heart,
  shield: Shield, clipboard: ClipboardList, "users-round": Users,
};

function HeroSection() {
  return (
    <section className="gradient-hero pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden" data-testid="hero-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="section-badge">Est. 2019 • Lalitpur, Nepal</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-6">
              Your Journey to{" "}
              <span className="text-brand-green">Mental Wellness</span>{" "}
              Starts Here
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed mb-8 max-w-xl">
              Professional psychological counseling and research services. Our compassionate team of experts is here to support you through every step of your mental health journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/appointments" className="btn-primary" data-testid="hero-book-btn">
                Book an Appointment <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline" data-testid="hero-services-btn">
                Our Services
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors duration-200">
                <Phone size={18} className="text-brand-green" />
                <span className="font-semibold text-sm">{CONTACT_INFO.phone}</span>
              </a>
              <span className="text-brand-muted text-sm">{CONTACT_INFO.hours}</span>
            </div>
          </div>
          <div className="relative hidden lg:block animate-slide-in-right">
            <div className="hero-image-container">
              <img
                src="https://images.unsplash.com/photo-1758273240631-59d44c8f5b66?crop=entropy&cs=srgb&fm=jpg&q=85&w=700"
                alt="Compassionate counseling session"
                className="w-full rounded-3xl object-cover shadow-2xl"
                style={{ height: '480px' }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-border animate-float">
              <p className="text-brand-green font-bold font-heading text-2xl">500+</p>
              <p className="text-brand-muted text-xs font-semibold">Lives Impacted</p>
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

function StatsSection() {
  const iconMap2 = { users: Users, calendar: Calendar, award: Award, heart: Heart };
  return (
    <section className="bg-white py-10 border-y border-border" data-testid="stats-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => {
            const Icon = iconMap2[stat.icon];
            return (
              <div key={i} className="text-center" data-testid={`stat-${i}`}>
                <div className="flex justify-center mb-2">
                  {Icon && <Icon size={24} className="text-brand-green" />}
                </div>
                <p className="stat-number">{stat.number}</p>
                <p className="text-brand-muted text-sm font-semibold mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-brand-beige" data-testid="services-preview">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">What We Offer</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">Our Specialized Services</h2>
          <p className="text-brand-muted text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive mental health services delivered by our expert team with compassion and professionalism.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 6).map((service, i) => {
            const Icon = iconMap[service.icon] || Heart;
            const isBlue = service.color === "blue";
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border-t-4 card-hover ${isBlue ? "service-card-border-blue" : "service-card-border"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
                data-testid={`service-card-${i}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isBlue ? "bg-blue-50" : "bg-green-50"}`}>
                  <Icon size={22} className={isBlue ? "text-brand-blue" : "text-brand-green"} />
                </div>
                <h3 className="font-heading font-bold text-brand-text text-lg mb-2">{service.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline" data-testid="all-services-btn">
            View All Services <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TeamPreview() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="team-preview">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">Meet the Experts</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">Our Dedicated Team</h2>
          <p className="text-brand-muted text-lg mt-4 max-w-2xl mx-auto">
            Our qualified mental health professionals bring expertise, compassion, and dedication to every session.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.slice(0, 3).map((member) => (
            <div key={member.id} className="bg-brand-beige rounded-2xl p-6 text-center card-hover" data-testid={`team-card-${member.id}`}>
              <div className={`team-avatar ${member.color}`}>{member.initials}</div>
              <h3 className="font-heading font-bold text-brand-text text-base mb-1">{member.name}</h3>
              <p className="text-brand-green text-sm font-semibold mb-3">{member.designation}</p>
              <p className="text-brand-muted text-sm leading-relaxed">{member.bio}</p>
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

function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-16 md:py-24 bg-brand-beige" data-testid="testimonials-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">What Clients Say</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">Stories of Transformation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials?.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm card-hover" data-testid={`testimonial-${i}`}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <Star key={j} size={14} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-quote text-sm mb-4">"{t.message}"</p>
              <div>
                <p className="font-heading font-bold text-brand-text text-sm">{t.name}</p>
                <p className="text-brand-green text-xs font-semibold">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview({ posts }) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="blog-preview">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">Latest Articles</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">Mental Health Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group" data-testid={`blog-card-${i}`}>
              <div className="bg-brand-beige rounded-2xl overflow-hidden card-hover">
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="p-5">
                  <span className="text-xs font-bold text-brand-green uppercase tracking-wide">{post.category}</span>
                  <h3 className="font-heading font-bold text-brand-text text-base mt-2 mb-2 line-clamp-2 group-hover:text-brand-green transition-colors duration-200">{post.title}</h3>
                  <p className="text-brand-muted text-sm line-clamp-2">{post.excerpt}</p>
                  <p className="text-brand-muted text-xs mt-3">By {post.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/blog" className="btn-outline" data-testid="all-posts-btn">
            Read All Articles <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 md:py-24" data-testid="cta-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="gradient-green rounded-3xl p-8 md:p-16 text-center text-white">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Take the First Step Towards Healing
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            You deserve to feel better. Our compassionate team is ready to walk this journey with you. Book your appointment today.
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

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/testimonials`).then(r => setTestimonials(r.data)).catch(() => {});
    axios.get(`${API}/blog?limit=3`).then(r => setBlogPosts(r.data.posts || [])).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <TeamPreview />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreview posts={blogPosts} />
      <CTASection />
    </div>
  );
}
