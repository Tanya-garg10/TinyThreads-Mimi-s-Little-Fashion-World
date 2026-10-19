import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Heart, Sparkles } from 'lucide-react';

interface NewsletterSectionProps {
  nightMode: boolean;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ nightMode }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please share a valid email address for Mimi to send her note ♡');
      return;
    }

    // Prototype simulated submission
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl border-3 p-8 sm:p-12 text-center shadow-xl transition-all relative overflow-hidden ${
            nightMode
              ? 'bg-[#281B34] border-[#5E3B7A] text-[#F3E8FF]'
              : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
          }`}
        >
          {/* Inner stitch border */}
          <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-[#A34063]/30 pointer-events-none" />

          {/* Postal Stamp Badge */}
          <div className="absolute top-4 right-6 sm:right-8 transform rotate-6 hidden sm:block">
            <div className="w-14 h-16 rounded-md bg-[#F7DDE5] border-2 border-dashed border-[#A34063] flex flex-col items-center justify-center p-1 shadow-xs">
              <span className="text-xl">🐰</span>
              <span className="text-[7px] font-mono font-bold text-[#A34063]">MIMI AIRMAIL</span>
            </div>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            {/* Header */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-rounded font-bold bg-[#F7DDE5] text-[#A34063] border border-[#EABAC8] mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>A Tiny Note from Mimi</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Stories & Stitches, delivered <span className="italic text-[#A34063]">softly.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed opacity-90 mb-7">
              Little updates, new collections, and a little sprinkle of imagination. (We promise never to crowd your inbox with anything louder than a bunny hop.)
            </p>

            {submitted ? (
              <div className="p-5 rounded-2xl bg-[#DCE8D7] border-2 border-[#5E8255] text-[#2F4729] animate-in fade-in flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-[#5E8255]" />
                <h4 className="font-rounded font-bold text-base sm:text-lg">
                  Mimi’s envelope is on its way! ♡
                </h4>
                <p className="text-xs font-sans max-w-sm">
                  Thank you for subscribing to Mimi’s little dispatch. (This is a prototype demo, no spam will ever be sent!)
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="mt-2 text-xs font-rounded font-bold underline hover:opacity-80"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your sweetest email address..."
                    aria-label="Email address for Mimi's newsletter"
                    className={`w-full px-5 py-3.5 rounded-full border-2 text-sm font-sans focus:outline-none transition-colors ${
                      nightMode
                        ? 'bg-[#1D1226] border-[#432A57] text-white placeholder-stone-400 focus:border-[#A34063]'
                        : 'bg-white border-[#EABAC8] text-[#5C4033] placeholder-stone-400 focus:border-[#A34063]'
                    }`}
                  />
                  {error && (
                    <span className="text-xs text-[#A34063] font-rounded font-bold block text-left mt-1.5 ml-4">
                      {error}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#A34063] hover:bg-[#852E4D] active:scale-95 text-white font-rounded font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#5C4033]"
                >
                  <span>Join the Dreamers</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <p className="text-[11px] font-sans opacity-70 mt-4">
              Demo prototype • No personal info shared • Unsubscribe anytime with a gentle tap
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
