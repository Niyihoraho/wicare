"use client";

import { useState } from "react";
import { loginAdmin } from "@/actions/auth";
import { X, Lock, Loader2, ArrowRight } from "lucide-react";

export function AdminLoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setError("");

    const result = await loginAdmin(password);

    if (result.success) {
      setIsOpen(false);
      setPassword("");
      // Force a hard reload to ensure layout and server components re-fetch auth state
      window.location.reload();
    } else {
      setError(result.error || "Incorrect password");
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="font-display text-xl font-bold tracking-wide text-brand-cream hover:text-brand-gold transition-colors duration-300 focus:outline-none"
      >
        WI CARE
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-navy/90 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-brand-navy">Admin Access</h3>
                    <p className="text-brand-navy/60 text-sm">Please enter the master password</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm text-center font-medium">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-navy placeholder:font-normal"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-navy text-white font-semibold transition-all hover:bg-brand-navy-mid disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
