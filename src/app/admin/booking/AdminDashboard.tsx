"use client";

import { useState } from "react";
import { Slot, Booking, addAvailableSlot, removeAvailableSlot, updateBookingStatus, updateBookingDate, removeBooking, submitBooking } from "@/actions/booking";
import { Calendar, Clock, Trash2, Check, X, Edit, User, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminDashboard({ initialData }: { initialData: { availableSlots: Slot[], bookings: Booking[] } }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  // Manual Booking Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeId, setSelectedTimeId] = useState("");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const uniqueDates = Array.from(new Set(initialData.availableSlots.map(s => s.date))).sort();
  const timesForDate = initialData.availableSlots.filter(s => s.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));

  // Delete modal state for Slots
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Delete modal state for Bookings
  const [deleteBookingModalOpen, setDeleteBookingModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isDeletingBooking, setIsDeletingBooking] = useState(false);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    await addAvailableSlot(date, time);
    setDate("");
    setTime("");
  };

  const handleRemoveSlot = (id: string) => {
    setSlotToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteSlot = async () => {
    if (!slotToDelete) return;
    setIsDeleting(true);
    try {
      await removeAvailableSlot(slotToDelete);
      setDeleteModalOpen(false);
      setSlotToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to remove slot.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRemoveBookingClick = (id: string) => {
    setBookingToDelete(id);
    setDeleteBookingModalOpen(true);
  };

  const confirmDeleteBooking = async () => {
    if (!bookingToDelete) return;
    setIsDeletingBooking(true);
    try {
      await removeBooking(bookingToDelete);
      setDeleteBookingModalOpen(false);
      setBookingToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to remove booking.");
    } finally {
      setIsDeletingBooking(false);
    }
  };

  const handleManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTimeId || !name || !email || !phone || !sessionType) return;
    setIsSubmittingBooking(true);
    try {
      await submitBooking(selectedTimeId, name, email, phone, sessionType);
      setName("");
      setEmail("");
      setPhone("");
      setSessionType("");
      setSelectedDate("");
      setSelectedTimeId("");
      alert("Booking successfully added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add booking. It might no longer be available.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'DONE' | 'FAIL' | 'CANCELLED') => {
    await updateBookingStatus(id, status);
  };

  const openEditModal = (booking: Booking) => {
    setEditingBooking(booking);
    setEditDate(booking.date);
    setEditTime(booking.time);
  };

  const handleUpdateDate = async () => {
    if (editingBooking && editDate && editTime) {
      await updateBookingDate(editingBooking.id, editDate, editTime);
      setEditingBooking(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <SectionLabel>Admin Panel</SectionLabel>
          <h1 className="font-display text-4xl font-bold text-brand-navy mt-2">
            Booking Management
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Manage Available Slots */}
          <div className="space-y-8">
            {/* Add New Slot Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-gold" />
                Add Available Slot
              </h2>
              <form onSubmit={handleAddSlot} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-navy text-white font-semibold py-2 rounded-md hover:bg-brand-navy-light transition-colors"
                >
                  Add Slot
                </button>
              </form>
            </div>

            {/* List of Available Slots */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
                Available Slots
              </h2>
              {initialData.availableSlots.length === 0 ? (
                <p className="text-gray-500 text-sm">No slots added yet.</p>
              ) : (
                <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
                  {initialData.availableSlots.map((slot) => (
                    <li key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-navy">{slot.date}</p>
                          <p className="text-xs text-gray-500">{slot.time}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSlot(slot.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                        title="Delete slot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Manual Admin Booking Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-brand-gold" />
                Add Manual Booking
              </h2>
              <form className="space-y-4" onSubmit={handleManualBooking}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Client Name" 
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-brand-gold outline-none"
                  />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address" 
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-brand-gold outline-none"
                  />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number" 
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-brand-gold outline-none sm:col-span-2"
                  />
                </div>

                <select 
                  required
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-brand-gold outline-none"
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
                      setSelectedTimeId("");
                    }}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-brand-gold outline-none"
                  >
                    <option value="" disabled>Select Date</option>
                    {uniqueDates.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                    {uniqueDates.length === 0 && (
                      <option value="" disabled>No slots available</option>
                    )}
                  </select>

                  <select 
                    required
                    disabled={!selectedDate}
                    value={selectedTimeId}
                    onChange={(e) => setSelectedTimeId(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-brand-gold outline-none disabled:opacity-50"
                  >
                    <option value="" disabled>Select Time</option>
                    {timesForDate.map(slot => (
                      <option key={slot.id} value={slot.id}>{slot.time}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full bg-brand-navy text-white font-semibold py-2.5 rounded-md hover:bg-brand-navy-light transition-colors mt-2 disabled:opacity-70"
                >
                  {isSubmittingBooking ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Manage Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-display text-xl font-bold text-brand-navy mb-6">
                Client Bookings
              </h2>
              {initialData.bookings.length === 0 ? (
                <p className="text-gray-500 text-sm">No bookings yet.</p>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-250px)] min-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
                  {initialData.bookings.map((booking) => (
                    <div key={booking.id} className="p-5 border border-gray-200 rounded-xl flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                      
                      {/* Booking Info */}
                      <div className="space-y-3 flex-grow">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                            booking.status === 'DONE' ? 'bg-green-100 text-green-700' :
                            booking.status === 'FAIL' ? 'bg-red-100 text-red-700' :
                            booking.status === 'CANCELLED' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {booking.sessionType}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-brand-navy">{booking.userName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{booking.userPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-600">{booking.userEmail || "No Email"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-brand-gold" />
                            <span className="text-sm font-semibold text-brand-navy">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-brand-gold" />
                            <span className="text-sm font-semibold text-brand-navy">{booking.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6">
                        <button 
                          onClick={() => openEditModal(booking)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-navy bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4" /> Edit Time
                        </button>
                        {booking.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(booking.id, 'DONE')}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100"
                            >
                              <Check className="w-4 h-4" /> Mark Done
                            </button>
                            <button 
                              onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-orange-700 bg-orange-50 border border-orange-200 rounded-md hover:bg-orange-100"
                            >
                              <X className="w-4 h-4" /> Cancel Status
                            </button>
                            <button
                              onClick={() => handleRemoveBookingClick(booking.id)}
                              className={`p-2 rounded-lg transition-colors bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100`}
                              title="Delete Booking Forever"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Edit Modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-display text-xl font-bold text-brand-navy mb-4">
              Edit Booking Time
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Update the scheduled date and time for <strong>{editingBooking.userName}</strong>.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Date</label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Time</label>
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setEditingBooking(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-navy"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateDate}
                className="px-6 py-2 text-sm font-semibold bg-brand-gold text-brand-navy rounded-md hover:bg-brand-gold-light"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
