import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wiring for contact submissions yet — this simply confirms
    // receipt in the UI. Swap in a real POST /api/contact call when ready.
    setSubmitted(true);
  };

  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        description="Questions about a session, a piece from the collection, or just want to say hello — reach out below."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="card-surface space-y-6 p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss-100 text-moss-600">
                <MapPin size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Studio Location</p>
                <p className="mt-1 text-sm text-ink-faint">142 Willow Lane, Portland, OR 97205</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss-100 text-moss-600">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Phone</p>
                <p className="mt-1 text-sm text-ink-faint">(555) 018-2094</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss-100 text-moss-600">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <p className="mt-1 text-sm text-ink-faint">hello@aaranya.com</p>
              </div>
            </div>
            <div className="border-t border-ink/[0.06] pt-6">
              <p className="mb-4 text-sm font-semibold text-ink">Follow along</p>
              <div className="flex items-center gap-3">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social media"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-faint transition hover:border-ink hover:text-ink"
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="card-surface mt-6 flex h-48 items-center justify-center overflow-hidden">
            <div className="text-center text-ink-faint">
              <MapPin size={26} strokeWidth={1.25} className="mx-auto mb-2 text-moss-500" />
              <p className="text-xs">Map placeholder — Portland, OR</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="card-surface p-7 sm:p-9">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss-100 text-moss-600">
                  <Send size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-ink">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-ink-faint">
                  Thank you for reaching out — we typically reply within one business day.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">Name</span>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-ink/15 bg-alabaster px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-ink/15 bg-alabaster px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">Message</span>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    rows={6}
                    className="w-full resize-y rounded-xl border border-ink/15 bg-alabaster px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100"
                  />
                </label>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
