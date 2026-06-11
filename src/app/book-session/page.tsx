"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Calendar, MessageCircle, Clock, CheckCircle2, Lock } from "lucide-react";
import { getBookingData, submitBooking, Slot } from "@/actions/booking";

export default function BookSessionPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeId, setSelectedTimeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionType, setSessionType] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getBookingData().then(data => setSlots(data.availableSlots));
  }, []);

  const uniqueDates = Array.from(new Set(slots.map(s => s.date))).sort();
  const timesForDate = slots.filter(s => s.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTimeId || !name || !email || !phone || !sessionType) return;
    setIsSubmitting(true);
    try {
      await submitBooking(selectedTimeId, name, email, phone, sessionType);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Failed to book slot. It might no longer be available.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Book a"
        titleAccent="Session"
        subtitle="Ready to begin your brain optimization journey? Choose how you'd like to book your first appointment below."
        backgroundImage="/book-session-hero.png"
      />

      {/* Booking Options Section — Cream */}
      <section className="relative py-24 sm:py-32 bg-brand-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.25] mix-blend-multiply"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Option 1: WhatsApp (Quickest) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-brand-gold/30 hover:shadow-md transition-all h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-bl-full group-hover:bg-[#25D366]/10 transition-colors" />
              
              <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7 text-[#25D366]" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">
                Book via WhatsApp
              </h3>
              <p className="text-brand-navy/60 leading-relaxed mb-8">
                The quickest way to reach us. Send us a message on WhatsApp and our team will reply immediately with available slots and pricing.
              </p>
              
              <a 
                href="https://wa.me/250788000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#25D366] text-white font-semibold transition-all hover:bg-[#20bd5a] w-full sm:w-auto shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Message on WhatsApp
              </a>
            </div>

            {/* Option 2: Interactive Appointment Booking */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-brand-gold/30 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-brand-gold" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">
                Book an Appointment
              </h3>
              <p className="text-brand-navy/60 leading-relaxed mb-8">
                Select an available date and time below to reserve your session instantly.
              </p>

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fade-in">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-navy mb-2">Booking Confirmed!</h4>
                  <p className="text-sm text-brand-navy/70 mb-4">
                    Your appointment has been successfully requested. We will contact you shortly to confirm the details.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setSelectedDate("");
                      setSelectedTimeId("");
                      setName("");
                      setEmail("");
                      setPhone("");
                      setSessionType("");
                      getBookingData().then(data => setSlots(data.availableSlots));
                    }}
                    className="text-brand-gold font-semibold hover:text-brand-gold-light transition-colors text-sm"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name" 
                      className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 outline-none"
                    />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address" 
                      className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 outline-none"
                    />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number" 
                      className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 outline-none"
                    />
                  </div>

                  <select 
                    required
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 outline-none text-brand-navy/60"
                  >
                    <option value="" disabled>Select Session Type</option>
                    <option value="First Time Intro Session">First Time Intro Session</option>
                    <option value="Standard Single Session">Standard Single Session</option>
                    <option value="Consultation Only">Consultation Only</option>
                  </select>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select 
                      required
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTimeId(""); // Reset time when date changes
                      }}
                      className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 outline-none text-brand-navy/60"
                    >
                      <option value="" disabled>Select Date</option>
                      {uniqueDates.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                      {uniqueDates.length === 0 && (
                        <option value="" disabled>No dates available</option>
                      )}
                    </select>

                    <select 
                      required
                      disabled={!selectedDate}
                      value={selectedTimeId}
                      onChange={(e) => setSelectedTimeId(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-gold/50 outline-none text-brand-navy/60 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Select Time</option>
                      {timesForDate.map(slot => (
                        <option key={slot.id} value={slot.id}>{slot.time}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-brand-gold text-brand-navy font-semibold transition-all duration-300 hover:bg-brand-gold-light mt-2 disabled:opacity-70"
                  >
                    <Calendar className="w-5 h-5" />
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* What to Expect — Dark Navy */}
      <section className="relative py-24 sm:py-32 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/topography-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,168,76,0.1)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel dark>First Visit</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-cream mt-4 mb-4">
              What to Expect
            </h2>
            <p className="text-white/60 text-lg">
              Your first session is all about comfort and discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-bold text-brand-cream text-lg">Duration</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Plan for about 45-60 minutes for your first visit. The actual training takes 33 minutes.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-bold text-brand-cream text-lg">No Prep Needed</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                There's nothing you need to do to prepare. Just come as you are, ready to relax.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-bold text-brand-cream text-lg">Brief Consult</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We'll start with a brief chat to understand your goals and explain the process before training begins.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
