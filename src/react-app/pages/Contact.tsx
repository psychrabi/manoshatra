import { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  CheckCircle,
} from "lucide-react";
import { CONTACT_INFO } from "../data/constants";

const API = `/api`;
const initialForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/contact`, form);
      setSuccess(true);
      setForm(initialForm);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="page-hero" data-testid="contact-hero">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <span className="section-badge">Get In Touch</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Have questions or need support? We're here for you. Reach out and
            our team will respond promptly.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" data-testid="contact-main">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-text mb-6">
                  We'd Love to Hear From You
                </h2>
              </div>
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: CONTACT_INFO.address,
                  href: null,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: CONTACT_INFO.phone,
                  href: `tel:${CONTACT_INFO.phone}`,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: CONTACT_INFO.email,
                  href: `mailto:${CONTACT_INFO.email}`,
                },
                {
                  icon: Clock,
                  label: "Working Hours",
                  value: CONTACT_INFO.hours,
                  href: null,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-brand-beige rounded-2xl p-4"
                    data-testid={`contact-info-${i}`}
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-muted uppercase tracking-wide mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-brand-text text-sm font-semibold hover:text-brand-green transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-brand-text text-sm font-semibold">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="bg-brand-beige rounded-2xl p-4 flex flex-col gap-3 mt-6">
                <span className="text-xs font-bold text-brand-muted uppercase tracking-wide mb-2">
                  Follow Us On
                </span>

                <div className="flex items-center gap-4">
                  <a
                    href="https://wa.me/9708072525"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#25D366] transition-colors duration-200"
                    title="WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/manoshastra_counseling/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#E1306C] transition-colors duration-200"
                    title="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/manoshastracounseling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#1877F2] transition-colors duration-200"
                    title="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@manoshastracounseling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    title="TikTok"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {success ? (
                <div
                  className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center"
                  data-testid="contact-success"
                >
                  <CheckCircle size={48} className="text-brand-green mb-4" />
                  <h3 className="font-heading text-xl font-bold text-brand-text mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-brand-muted mb-6">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-primary"
                    data-testid="send-another-btn"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-brand-beige rounded-2xl p-8 space-y-5 h-full"
                  data-testid="contact-form"
                >
                  <h2 className="font-heading text-xl font-bold text-brand-text">
                    Send Us a Message
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-1.5">
                        Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input-field"
                        data-testid="contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-1.5">
                        Phone
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="input-field"
                        data-testid="contact-phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-text mb-1.5">
                      Email *
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="your@email.com"
                      className="input-field"
                      data-testid="contact-email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-text mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className="input-field resize-none"
                      data-testid="contact-message"
                    />
                  </div>
                  {error && (
                    <div
                      className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm"
                      data-testid="contact-error"
                    >
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center"
                    data-testid="contact-submit"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map */}
          <div
            className="mt-12 rounded-3xl overflow-hidden shadow-sm border border-border"
            data-testid="contact-map"
          >
            <iframe
              src={CONTACT_INFO.mapEmbed}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ManoShastra Location - Kupondole, Lalitpur"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
