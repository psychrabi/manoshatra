import { useState } from "react";
import axios from "axios";
import { CheckCircle, Calendar, Clock, Phone } from "lucide-react";
import { SERVICE_OPTIONS, CONTACT_INFO } from "../data/constants";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferred_date: "",
  message: "",
};

const Appointments = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.service ||
      !form.preferred_date
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`/api/appointments`, form);
      setSuccess(true);
      setForm(initialForm);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="appointments-page">
      <section className="page-hero" data-testid="appointments-hero">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <span className="section-badge">Get Started</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mt-2 mb-4">
            Book an Appointment
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Take the first step towards better mental health. Fill out the form
            and our team will reach out to confirm your appointment.
          </p>
        </div>
      </section>

      <section
        className="py-16 md:py-24 bg-white"
        data-testid="appointments-form-section"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info Panel */}
            <div className="space-y-6">
              <div className="bg-brand-beige rounded-2xl p-6">
                <h3 className="font-heading font-bold text-brand-text text-lg mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  {[
                    "Submit your appointment request online",
                    "We'll confirm within 24 hours",
                    "Initial consultation to understand your needs",
                    "Personalized treatment plan",
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-brand-muted"
                    >
                      <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-beige rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-bold text-brand-text text-lg">
                  Contact Info
                </h3>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-brand-muted hover:text-brand-green transition-colors duration-200"
                  data-testid="appt-phone"
                >
                  <Phone size={18} className="text-brand-green" />
                  <span className="text-sm font-semibold">
                    {CONTACT_INFO.phone}
                  </span>
                </a>
                <div className="flex items-center gap-3 text-brand-muted">
                  <Clock size={18} className="text-brand-green" />
                  <span className="text-sm">{CONTACT_INFO.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-brand-muted">
                  <Calendar size={18} className="text-brand-green" />
                  <span className="text-sm">
                    Appointments available Sun-Fri
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {success ? (
                <div
                  className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
                  data-testid="appointment-success"
                >
                  <CheckCircle
                    size={56}
                    className="text-brand-green mx-auto mb-4"
                  />
                  <h3 className="font-heading text-2xl font-bold text-brand-text mb-2">
                    Appointment Request Sent!
                  </h3>
                  <p className="text-brand-muted mb-6">
                    Thank you! We have received your appointment request. Our
                    team will contact you within 24 hours to confirm your
                    session.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-primary"
                    data-testid="book-another-btn"
                  >
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-brand-beige rounded-2xl p-8 space-y-5"
                  data-testid="appointment-form"
                >
                  <h2 className="font-heading text-2xl font-bold text-brand-text">
                    Appointment Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-1.5">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="input-field"
                        data-testid="appt-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="98XXXXXXXX"
                        className="input-field"
                        data-testid="appt-phone-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-text mb-1.5">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="your@email.com"
                      className="input-field"
                      data-testid="appt-email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-1.5">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="input-field bg-white"
                        data-testid="appt-service"
                      >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        name="preferred_date"
                        value={form.preferred_date}
                        onChange={handleChange}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="input-field bg-white"
                        data-testid="appt-date"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-text mb-1.5">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share any additional details that might help us prepare for your appointment..."
                      rows={4}
                      className="input-field resize-none"
                      data-testid="appt-message"
                    />
                  </div>

                  {error && (
                    <div
                      className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm"
                      data-testid="appt-error"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center text-base"
                    data-testid="appt-submit"
                  >
                    {loading ? "Submitting..." : "Request Appointment"}
                  </button>
                  <p className="text-brand-muted text-xs text-center">
                    By submitting, you agree that your information will be used
                    to contact you about your appointment. All information is
                    kept strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Appointments;
