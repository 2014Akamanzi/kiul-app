"use client";

import { useState } from "react";
import Container from '../components/Container';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We will respond within 48 hours.");
  };

  return (
    <Container>
      {/* PAGE HEADER */}
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mt-0 mb-2">
          Contact KIUL
        </h1>
        <p className="text-sm text-[var(--kiul-text-soft)]">
          Get in touch with us for inquiries, membership, or partnership opportunities
        </p>
      </section>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
        {/* LEFT COLUMN - Contact Information */}
        <div className="space-y-4">
          
          <div>
            <h2 className="text-xl font-semibold text-[var(--kiul-text-dark)] mb-2">
              Get in Touch
            </h2>
            <p className="text-sm text-[var(--kiul-text-soft)] leading-relaxed">
              Whether you're interested in our academic programmes, publishing services, 
              or community initiatives, we're here to connect with you.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            
            {/* Email */}
            <div className="flex items-start gap-2 bg-[var(--kiul-card-bg)] p-3 rounded-lg border border-[var(--kiul-border)]">
              <div className="flex-shrink-0">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-[var(--kiul-emerald-700)]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--kiul-emerald-800)]">
                  Email
                </h3>
                <a 
                  href="mailto:info.kiul@katokifoundation.org"
                  className="text-xs text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline"
                >
                  info.kiul@katokifoundation.org
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-2 bg-[var(--kiul-card-bg)] p-3 rounded-lg border border-[var(--kiul-border)]">
              <div className="flex-shrink-0">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-[var(--kiul-emerald-700)]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--kiul-emerald-800)]">
                  WhatsApp
                </h3>
                <a 
                  href="https://wa.me/255758624863"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline"
                >
                  +255-758624863
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 bg-[var(--kiul-card-bg)] p-3 rounded-lg border border-[var(--kiul-border)]">
              <div className="flex-shrink-0">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-[var(--kiul-emerald-700)]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--kiul-emerald-800)]">
                  Location
                </h3>
                <p className="text-xs text-[var(--kiul-text-medium)] leading-relaxed">
                  Dar es Salaam, Tanzania
                </p>
              </div>
            </div>

          </div>

          {/* Response Time Notice */}
          <div className="bg-[var(--kiul-emerald-50)] border-l-4 border-[var(--kiul-emerald-700)] p-2 rounded-r-lg">
            <p className="text-xs text-[var(--kiul-text-medium)]">
              <strong className="text-[var(--kiul-emerald-800)]">Response Time:</strong> Within 48 hours
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN - Contact Form */}
        <div className="bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] rounded-xl p-4 border border-[var(--kiul-border)]">
          <h2 className="text-xl font-bold text-[var(--kiul-emerald-800)] mb-3">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Full Name */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-xs font-bold text-[var(--kiul-emerald-800)] mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-[var(--kiul-border)] rounded-lg p-2 text-sm text-[var(--kiul-text-dark)] 
                focus:ring-2 focus:ring-[var(--kiul-emerald-500)] focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-bold text-[var(--kiul-emerald-800)] mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-[var(--kiul-border)] rounded-lg p-2 text-sm text-[var(--kiul-text-dark)] 
                focus:ring-2 focus:ring-[var(--kiul-emerald-500)] focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label 
                htmlFor="subject" 
                className="block text-xs font-bold text-[var(--kiul-emerald-800)] mb-1"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-[var(--kiul-border)] rounded-lg p-2 text-sm text-[var(--kiul-text-dark)] 
                focus:ring-2 focus:ring-[var(--kiul-emerald-500)] focus:outline-none"
                placeholder="Brief subject of your inquiry"
              />
            </div>

            {/* Message */}
            <div>
              <label 
                htmlFor="message" 
                className="block text-xs font-bold text-[var(--kiul-emerald-800)] mb-1"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-[var(--kiul-border)] rounded-lg p-2 text-sm text-[var(--kiul-text-dark)] 
                focus:ring-2 focus:ring-[var(--kiul-emerald-500)] focus:outline-none resize-vertical"
                placeholder="Please provide details about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[var(--kiul-emerald-700)] text-white font-semibold px-4 py-2.5 rounded-lg text-sm
              hover:bg-[var(--kiul-emerald-800)] transition-all duration-300
              focus:ring-2 focus:ring-[var(--kiul-emerald-200)] focus:outline-none"
            >
              Send Message
            </button>

            <p className="text-[10px] text-[var(--kiul-text-light)] text-center">
              By submitting, you agree to our privacy policy.
            </p>

          </form>
        </div>

      </div>
    </Container>
  );
}
