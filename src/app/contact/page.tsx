"use client";

import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CONTACT } from "@/constants/contact";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/actions/contact";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !subject || !message) return;
    
    setIsSubmitting(true);
    setErrorMsg("");
    
    const result = await submitInquiry(firstName, lastName, email, subject, message);
    
    if (result.success) {
      setIsSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("General Inquiry");
      setMessage("");
    } else {
      setErrorMsg(result.error);
    }
    
    setIsSubmitting(false);
  };
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Get In"
        titleAccent="Touch"
        subtitle="We're here to answer your questions, discuss your needs, and help you begin your journey to optimal mental wellness."
        backgroundImage="/contact-hero.png"
      />

      {/* Contact Section — White */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column — Contact Info */}
            <div className="space-y-12">
              <div>
                <SectionLabel>Contact Us</SectionLabel>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight mt-4 mb-6">
                  Let's Connect.
                </h2>
                <p className="text-lg text-brand-navy/60 leading-relaxed">
                  Whether you're ready to book your first session or just want to learn more about how NeurOptimal can help you, our team is ready to assist.
                </p>
              </div>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg mb-1">Visit Us</h3>
                    <p className="text-brand-navy/60 leading-relaxed">
                      {CONTACT.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg mb-1">Call or WhatsApp</h3>
                    <p className="text-brand-navy/60 leading-relaxed">
                      <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} className="hover:text-brand-gold transition-colors">
                        {CONTACT.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg mb-1">Email Us</h3>
                    <p className="text-brand-navy/60 leading-relaxed">
                      <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-gold transition-colors">
                        {CONTACT.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg mb-1">Opening Hours</h3>
                    <p className="text-brand-navy/60 leading-relaxed">
                      {CONTACT.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-8 border-t border-gray-100">
                <h3 className="font-bold text-brand-navy mb-4">Follow Our Journey</h3>
                <SocialLinks variant="muted" />
              </div>
            </div>

            {/* Right Column — Contact Form & Map */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="w-full h-64 rounded-2xl bg-gray-100 overflow-hidden relative border border-gray-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <MapPin className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-sm font-medium">Interactive Map Integration</span>
                  <span className="text-xs">Kigali, Rwanda</span>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-6">Send a Message</h3>
                
                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">Message Sent!</h4>
                    <p className="text-brand-navy/70 mb-6">
                      Thank you for reaching out. We have received your inquiry and will get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-brand-gold font-semibold hover:text-brand-gold-light transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {errorMsg && (
                      <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                        {errorMsg}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="firstName" className="text-sm font-medium text-brand-navy">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="lastName" className="text-sm font-medium text-brand-navy">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-brand-navy">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-sm font-medium text-brand-navy">Subject</label>
                      <select 
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Book a Session">Book a Session</option>
                        <option value="Corporate Partnership">Corporate Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-brand-navy">Message</label>
                      <textarea 
                        id="message" 
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-brand-gold text-brand-navy font-semibold transition-all duration-300 hover:bg-brand-gold-light mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
