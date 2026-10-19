import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { MimiCharacter, ProductIllustration } from '../character/MimiIllustrations';

interface HeroSectionProps {
  nightMode: boolean;
  onExploreCollections: () => void;
  onMeetMimi: () => void;
  onTriggerEasterEgg: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  nightMode,
  onExploreCollections,
  onMeetMimi,
  onTriggerEasterEgg
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24">
      {/* Decorative background clouds / stars */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10">
        {/* Soft pastel decorative blobs */}
        <div
          className={`absolute -top-16 -left-16 w-80 h-80 rounded-full blur-3xl opacity-60 transition-colors duration-500 ${
            nightMode ? 'bg-[#3D1A54]' : 'bg-[#F7DDE5]'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl opacity-50 transition-colors duration-500 ${
            nightMode ? 'bg-[#2A1D47]' : 'bg-[#DCE8D7]'
          }`}
        />
        <div
          className={`absolute -bottom-10 left-1/4 w-72 h-72 rounded-full blur-2xl opacity-40 transition-colors duration-500 ${
            nightMode ? 'bg-[#401C38]' : 'bg-[#F5D88B]'
          }`}
        />

        {/* Floating decorative SVGs */}
        {/* Floating cloud left */}
        <div className="absolute top-12 left-6 lg:left-16 animate-float opacity-75">
          <svg width="70" height="42" viewBox="0 0 70 42" fill="none">
            <path
              d="M12 36 C5 36, 0 31, 0 24 C0 17, 6 12, 13 12 C16 5, 23 0, 32 0 C42 0, 50 6, 52 14 C58 14, 64 19, 64 26 C64 33, 58 36, 50 36 Z"
              fill={nightMode ? '#3C2652' : '#FFF8F1'}
              stroke={nightMode ? '#6E4E8E' : '#EABAC8'}
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Floating golden star right */}
        <div className="absolute top-20 right-8 lg:right-24 animate-sparkle">
          <svg width="34" height="34" viewBox="0 0 24 24" fill={nightMode ? '#F5D88B' : '#F5D88B'}>
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" stroke="#5C4033" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Floating spool of thread */}
        <div className="absolute bottom-16 right-10 lg:right-1/3 animate-float-alt opacity-80 hidden sm:block">
          <svg width="40" height="46" viewBox="0 0 40 46" fill="none">
            <rect x="10" y="6" width="20" height="34" rx="4" fill="#A34063" stroke="#5C4033" strokeWidth="2" />
            <line x1="10" y1="14" x2="30" y2="14" stroke="#FFF8F1" strokeWidth="1.5" />
            <line x1="10" y1="22" x2="30" y2="22" stroke="#FFF8F1" strokeWidth="1.5" />
            <line x1="10" y1="30" x2="30" y2="30" stroke="#FFF8F1" strokeWidth="1.5" />
            <rect x="6" y="2" width="28" height="6" rx="2" fill="#D4A373" stroke="#5C4033" strokeWidth="2" />
            <rect x="6" y="38" width="28" height="6" rx="2" fill="#D4A373" stroke="#5C4033" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Small Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-rounded font-bold tracking-wider uppercase mb-5 border shadow-xs ${
                nightMode
                  ? 'bg-[#2E1D3D] text-[#F5D88B] border-[#5E3B7A]'
                  : 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A34063]" />
              <span>A Little Boutique for Little Dreamers</span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight mb-5 transition-colors ${
                nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
              }`}
            >
              Little outfits.{' '}
              <span className="block mt-1">
                Big little{' '}
                <span className="relative inline-block text-[#A34063]">
                  adventures.
                  {/* Whimsical underline stitch */}
                  <svg
                    viewBox="0 0 240 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2.5 left-0 w-full h-3 text-[#F5D88B]"
                  >
                    <path
                      d="M4 12 C50 3, 140 16, 236 7"
                      stroke="#F5D88B"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 12 C52 4, 142 16, 234 8"
                      stroke="#A34063"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              className={`font-sans text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-7 transition-colors ${
                nightMode ? 'text-[#D8C7E8]' : 'text-[#6D4C3D]'
              }`}
            >
              Meet <strong className="font-semibold text-[#A34063]">Mimi</strong>, the little bunny
              with big fashion dreams. Discover tiny outfits, cozy collections, and a magical world
              stitched together with childhood imagination.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6">
              <button
                onClick={onExploreCollections}
                type="button"
                className="group px-6 sm:px-7 py-3.5 rounded-full bg-[#A34063] hover:bg-[#852E4D] active:scale-95 text-white font-rounded text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-[#F5D88B]"
              >
                <span>Explore the Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onMeetMimi}
                type="button"
                className={`px-6 py-3.5 rounded-full font-rounded text-base font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A34063] ${
                  nightMode
                    ? 'bg-[#281B34] border-[#5E3B7A] text-[#F3E8FF] hover:bg-[#39244A]'
                    : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033] hover:bg-[#F7DDE5]'
                }`}
              >
                <span>Meet Mimi ♡</span>
              </button>
            </div>

            {/* Handwritten note & Easter egg seed */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-[#F5D88B]/30 flex items-center justify-center text-[#A34063]">
                <Heart className="w-4 h-4 fill-[#A34063]" />
              </div>
              <p className="font-hand text-lg sm:text-xl text-[#A34063] font-bold tracking-wide">
                “Designed with love, one tiny stitch at a time.”
              </p>

              {/* Discoverable Secret Easter Egg Needle Button */}
              <button
                onClick={onTriggerEasterEgg}
                title="Mimi's Secret Sewing Box"
                aria-label="Secret Easter Egg: Mimi's Secret Sewing Box"
                className="ml-2 w-7 h-7 rounded-full bg-[#F5D88B] border border-[#5C4033] flex items-center justify-center text-xs font-bold text-[#5C4033] hover:scale-125 transition-transform cursor-pointer shadow-xs animate-bounce"
              >
                🪡
              </button>
            </div>
          </div>

          {/* Right Column: Character Fashion Scene Illustration */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Atelier Backdrop Frame */}
            <div
              className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl border-3 shadow-xl transition-all duration-300 ${
                nightMode
                  ? 'bg-[#281B34] border-[#5E3B7A] shadow-[#130B19]/50'
                  : 'bg-[#FFF8F1] border-[#5C4033] shadow-[#5C4033]/10'
              }`}
            >
              {/* Early-web stitch border ribbon inside */}
              <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-[#A34063]/30 pointer-events-none" />

              {/* Little banner tag on corner */}
              <div className="absolute -top-3.5 right-6 bg-[#F5D88B] border-2 border-[#5C4033] text-[#5C4033] px-3 py-0.5 rounded-full text-xs font-rounded font-bold shadow-xs">
                Mimi’s Atelier ✂
              </div>

              {/* Mimi the Bunny Designer Character */}
              <div className="flex flex-col items-center">
                <MimiCharacter className="w-64 h-64 sm:w-72 sm:h-72" pose="holding-needle" />

                {/* Character Nameplate */}
                <div
                  className={`-mt-4 px-5 py-2 rounded-2xl border-2 shadow-sm text-center z-20 ${
                    nightMode
                      ? 'bg-[#1B1222] border-[#7B2846] text-[#F3E8FF]'
                      : 'bg-white border-[#5C4033] text-[#5C4033]'
                  }`}
                >
                  <div className="font-rounded font-bold text-sm sm:text-base flex items-center justify-center gap-1.5">
                    <span>Mimi Bunny</span>
                    <span className="text-[#A34063]">✂ Chief Dream Designer</span>
                  </div>
                  <div className="text-xs font-hand text-[#A34063] font-bold">
                    Specialty: Cloud-soft rompers & bedtime lullabies
                  </div>
                </div>
              </div>

              {/* Floating mini outfit badges around Mimi */}
              {/* Top-left: Cloud Onesie */}
              <div className="absolute -top-4 -left-4 sm:-left-6 w-20 h-20 sm:w-22 sm:h-22 bg-[#FFF8F1] border-2 border-[#5C4033] rounded-2xl p-1.5 shadow-md animate-float flex flex-col items-center justify-center">
                <ProductIllustration type="onesie-cloud" className="w-12 h-12" />
                <span className="text-[9px] font-rounded font-bold text-[#5C4033]">Cloud Onesie</span>
              </div>

              {/* Bottom-right: Mini Explorer Overalls */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 w-20 h-20 sm:w-22 sm:h-22 bg-[#FFF8F1] border-2 border-[#5C4033] rounded-2xl p-1.5 shadow-md animate-float-alt flex flex-col items-center justify-center">
                <ProductIllustration type="overalls-explorer" className="w-12 h-12" />
                <span className="text-[9px] font-rounded font-bold text-[#5C4033]">Explorer</span>
              </div>

              {/* Bottom-left: Real Baby Polaroid Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 w-28 sm:w-32 p-1.5 pb-2.5 rounded-xl bg-white border-2 border-[#5C4033] shadow-lg transform -rotate-6 z-20 hidden sm:block">
                <div className="w-full h-20 sm:h-24 rounded-lg overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=400&q=80"
                    alt="Baby wearing TinyThreads"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="font-hand font-bold text-[10px] text-[#A34063] block text-center mt-1">
                  Oliver in Cloud Onesie ♡
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
