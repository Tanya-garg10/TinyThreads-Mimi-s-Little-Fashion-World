import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

interface StorybookPage {
  pageNumber: number;
  title: string;
  subtitle: string;
  story: string;
  illustrationSvg: React.ReactNode;
  accentQuote: string;
  themeColor: string;
}

interface InteractiveStorybookProps {
  nightMode: boolean;
}

export const InteractiveStorybook: React.FC<InteractiveStorybookProps> = ({ nightMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | null>(null);
  const [displayPage, setDisplayPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const pages: StorybookPage[] = [
    {
      pageNumber: 1,
      title: 'The Fluffy Visitor',
      subtitle: 'A quiet morning by the clothesline',
      story:
        'One crisp lavender morning, Mimi stepped into her garden to hang freshly washed cotton swatches. Resting right between two peach rompers was a stray baby cloud, snoring softly like a kitten.',
      accentQuote: '“Oh my whiskers,” Mimi whispered, “you’re much too little to be out in the sky all alone!”',
      themeColor: '#F7DDE5',
      illustrationSvg: (
        <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
          {/* Clothesline */}
          <line x1="10" y1="50" x2="190" y2="50" stroke="#5C4033" strokeWidth="2.5" />
          {/* Wooden pegs */}
          <rect x="40" y="44" width="4" height="12" fill="#D4A373" />
          <rect x="85" y="44" width="4" height="12" fill="#D4A373" />
          <rect x="155" y="44" width="4" height="12" fill="#D4A373" />
          {/* Hanging baby onesie */}
          <path d="M30 52 L55 52 L50 85 L35 85 Z" fill="#F7DDE5" stroke="#5C4033" strokeWidth="1.5" />
          {/* The sleeping little cloud on the line */}
          <g transform="translate(80, 52)">
            <path
              d="M10 28 C4 28, 0 22, 0 16 C0 10, 6 6, 12 6 C14 2, 20 0, 28 0 C36 0, 42 4, 44 8 C48 8, 52 12, 52 16 C52 22, 48 28, 40 28 Z"
              fill="#FFF8F1"
              stroke="#5C4033"
              strokeWidth="2.5"
            />
            {/* Sleeping eyes */}
            <path d="M16 16 Q20 20 24 16" stroke="#5C4033" strokeWidth="1.8" fill="none" />
            <path d="M28 16 Q32 20 36 16" stroke="#5C4033" strokeWidth="1.8" fill="none" />
            {/* Rosy pink cheek */}
            <circle cx="14" cy="18" r="2.5" fill="#F7DDE5" />
            <circle cx="38" cy="18" r="2.5" fill="#F7DDE5" />
            {/* Zzz */}
            <text x="48" y="8" fontSize="10" fill="#A34063" fontWeight="bold">z</text>
            <text x="56" y="2" fontSize="8" fill="#A34063" fontWeight="bold">z</text>
          </g>
          {/* Mimi watching in delight */}
          <circle cx="150" cy="120" r="28" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2.5" />
          <ellipse cx="142" cy="78" rx="6" ry="20" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2" />
          <ellipse cx="158" cy="78" rx="6" ry="20" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2" />
          <circle cx="142" cy="118" r="3" fill="#5C4033" />
          <circle cx="158" cy="118" r="3" fill="#5C4033" />
          <path d="M147 124 Q150 128 153 124" stroke="#5C4033" strokeWidth="1.5" fill="none" />
        </svg>
      )
    },
    {
      pageNumber: 2,
      title: 'A Tiny Shiver',
      subtitle: 'When chilly mountain breezes blow',
      story:
        'A gust of frosty breeze rustled through the oak trees. The baby cloud woke up, trembling and turning a misty grey. Tiny teardrop raindrops began to plip-plop on Mimi’s soft slippers.',
      accentQuote: '“Hold on, little dreamer,” Mimi smiled. “Nobody gets cold in my fashion world!”',
      themeColor: '#DCE8D7',
      illustrationSvg: (
        <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
          {/* Shivering grey-blue cloud */}
          <g transform="translate(60, 40)">
            <path
              d="M15 38 C6 38, 0 30, 0 22 C0 14, 8 8, 16 8 C18 3, 26 0, 36 0 C48 0, 56 6, 58 12 C64 12, 70 17, 70 24 C70 32, 64 38, 54 38 Z"
              fill="#E2E8F0"
              stroke="#5C4033"
              strokeWidth="2.5"
            />
            {/* Shivering jagged mouth */}
            <path d="M25 24 L30 22 L35 25 L40 22 L45 25" stroke="#5C4033" strokeWidth="2" fill="none" />
            <circle cx="26" cy="18" r="3" fill="#5C4033" />
            <circle cx="44" cy="18" r="3" fill="#5C4033" />
            {/* Raindrops falling */}
            <path d="M22 48 Q20 54 22 58 Q24 58 24 54 Z" fill="#60A5FA" />
            <path d="M38 52 Q36 58 38 62 Q40 62 40 58 Z" fill="#60A5FA" />
            <path d="M52 46 Q50 52 52 56 Q54 56 54 52 Z" fill="#60A5FA" />
          </g>
          {/* Mimi running to fetch her yarn basket */}
          <rect x="40" y="110" width="120" height="12" rx="4" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" />
          <path d="M110 90 C110 70, 150 70, 150 90 Z" fill="#F7DDE5" stroke="#5C4033" strokeWidth="2" />
          <circle cx="120" cy="100" r="10" fill="#F5D88B" />
          <circle cx="140" cy="100" r="10" fill="#A34063" />
        </svg>
      )
    },
    {
      pageNumber: 3,
      title: 'The Buttercup Scarf',
      subtitle: 'Stitching sunlight into woolen yarn',
      story:
        'Mimi darted inside and retrieved her grandest pair of rosewood knitting needles and a skein of spun buttercup yarn. Her bunny paws clicked softly: knit one, purl two, sprinkle three stitches of love.',
      accentQuote: 'The needles danced in a golden blur until a cozy, fringed mini scarf was born.',
      themeColor: '#F5D88B',
      illustrationSvg: (
        <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
          {/* Rosewood knitting needles crossed */}
          <line x1="30" y1="30" x2="170" y2="150" stroke="#7A4E38" strokeWidth="4" strokeLinecap="round" />
          <circle cx="28" cy="28" r="6" fill="#F5D88B" stroke="#5C4033" strokeWidth="1.5" />
          <line x1="170" y1="30" x2="30" y2="150" stroke="#7A4E38" strokeWidth="4" strokeLinecap="round" />
          <circle cx="172" cy="28" r="6" fill="#F5D88B" stroke="#5C4033" strokeWidth="1.5" />
          {/* Bright buttercup knitted scarf banner */}
          <path
            d="M50 75 Q100 60 150 75 Q160 110 145 120 Q100 100 55 120 Z"
            fill="#F5D88B"
            stroke="#5C4033"
            strokeWidth="3"
          />
          {/* Knit loops & tassels */}
          <line x1="60" y1="85" x2="140" y2="85" stroke="#E2B13C" strokeWidth="2" strokeDasharray="4 3" />
          <line x1="65" y1="95" x2="135" y2="95" stroke="#E2B13C" strokeWidth="2" strokeDasharray="4 3" />
          {/* Hearts & sparkles around */}
          <text x="40" y="50" fontSize="16">✨</text>
          <text x="145" y="55" fontSize="16">💖</text>
          <text x="95" y="145" fontSize="16">✂️</text>
        </svg>
      )
    },
    {
      pageNumber: 4,
      title: 'Drifting in Warmth',
      subtitle: 'A starry lullaby for the nursery sky',
      story:
        'Mimi gently looped the sunny scarf around the cloud’s puffy middle. Instantly, the cloud blushed with golden warmth, smiling wide. With a joyful twirl, it floated up into the evening sky, scattering lullaby stars for little dreamers below.',
      accentQuote: '“Now the whole sky is cozy,” whispered Mimi, waving her measuring tape like a ribbon.',
      themeColor: '#E8DFF5',
      illustrationSvg: (
        <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
          {/* Cozy cloud wearing its yellow scarf */}
          <g transform="translate(60, 35)">
            <path
              d="M15 36 C6 36, 0 28, 0 20 C0 12, 8 6, 16 6 C18 2, 26 0, 36 0 C48 0, 56 6, 58 12 C64 12, 70 17, 70 24 C70 32, 64 36, 54 36 Z"
              fill="#FFF8F1"
              stroke="#5C4033"
              strokeWidth="2.5"
            />
            {/* Happy eyes & smile */}
            <circle cx="28" cy="18" r="3" fill="#5C4033" />
            <circle cx="46" cy="18" r="3" fill="#5C4033" />
            <path d="M33 22 Q37 28 41 22" stroke="#A34063" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="22" cy="22" r="3" fill="#F7DDE5" />
            <circle cx="52" cy="22" r="3" fill="#F7DDE5" />

            {/* Knitted scarf wrapped snugly */}
            <path
              d="M12 28 C28 24, 46 24, 60 28 C64 34, 58 38, 48 36 L44 54 L34 54 L38 36 C28 36, 16 36, 12 28 Z"
              fill="#F5D88B"
              stroke="#5C4033"
              strokeWidth="2"
            />
          </g>
          {/* Moon & twinkling constellation stars */}
          <path d="M150 20 C140 20, 130 30, 130 44 C130 58, 142 68, 155 68 C145 66, 142 50, 148 38 C151 32, 156 26, 150 20 Z" fill="#F5D88B" />
          <text x="30" y="80" fontSize="14">⭐</text>
          <text x="155" y="100" fontSize="14">✨</text>
          <text x="80" y="140" fontSize="14">🌟</text>
          <text x="120" y="130" fontSize="12">💤</text>
        </svg>
      )
    }
  ];

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
        goToNext();
      } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, pages.length]);

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > swipeThreshold && currentPage < pages.length - 1) {
      goToNext();
    } else if (diff < -swipeThreshold && currentPage > 0) {
      goToPrev();
    }
  };

  const goToNext = () => {
    if (currentPage < pages.length - 1 && !isAnimating) {
      audioManager.playClickSound();
      setIsAnimating(true);
      setAnimationDirection('next');
      setDisplayPage(currentPage); // Show current page during flip out
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setDisplayPage(currentPage + 1); // Show new page after flip
        setTimeout(() => {
          setIsAnimating(false);
          setAnimationDirection(null);
        }, 400);
      }, 400);
    }
  };

  const goToPrev = () => {
    if (currentPage > 0 && !isAnimating) {
      audioManager.playClickSound();
      setIsAnimating(true);
      setAnimationDirection('prev');
      setDisplayPage(currentPage); // Show current page during flip out
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setDisplayPage(currentPage - 1); // Show new page after flip
        setTimeout(() => {
          setIsAnimating(false);
          setAnimationDirection(null);
        }, 400);
      }, 400);
    }
  };

  const activePageData = pages[displayPage];

  return (
    <div
      className={`rounded-3xl border-3 shadow-xl overflow-hidden transition-all duration-300 relative ${
        nightMode
          ? 'bg-[#22152E] border-[#5E3B7A]'
          : 'bg-[#FFF8F1] border-[#5C4033]'
      }`}
    >
      {/* Book Cover Header Bar */}
      <div className="p-4 sm:p-5 border-b border-dashed border-[#A34063]/30 flex items-center justify-between bg-white/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#F7DDE5] border border-[#A34063] flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[#A34063]" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
              Mimi and the Little Cloud
            </h3>
            <span className="text-[11px] font-hand text-[#A34063] font-bold">
              An interactive original bedtime storybook
            </span>
          </div>
        </div>

        {/* Page counter pills */}
        <div className="flex items-center gap-2">
          {pages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                setCurrentPage(idx);
                setDisplayPage(idx);
              }}
              aria-label={`Go to page ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                displayPage === idx
                  ? 'bg-[#A34063] scale-125'
                  : 'bg-[#EABAC8] hover:bg-[#A34063]/60'
              }`}
            />
          ))}
          <span className="text-xs font-mono font-bold ml-2">
            Page {displayPage + 1} of {pages.length}
          </span>
        </div>
      </div>

      {/* Main Page Turn Viewport */}
      <div
        className="p-6 sm:p-10 relative min-h-[380px] flex items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full ${
            isAnimating
              ? animationDirection === 'next'
                ? 'animate-[flipOutRight_0.4s_ease-in-out]'
                : 'animate-[flipOutLeft_0.4s_ease-in-out]'
              : 'animate-in fade-in duration-300'
          }`}
        >
          
          {/* Left: Illustrated Story Vignette */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[280px] aspect-square rounded-3xl bg-[#FFF8F1] border-3 border-[#5C4033] p-4 shadow-md flex items-center justify-center relative overflow-hidden group">
              <div className="w-full h-full flex items-center justify-center">
                {activePageData.illustrationSvg}
              </div>
              <span className="absolute bottom-2 right-3 text-[10px] font-hand font-bold text-[#A34063]">
                Fig {activePageData.pageNumber}.0
              </span>
            </div>
          </div>

          {/* Right: Narrative Page Text */}
          <div className="md:col-span-7 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 text-xs font-rounded font-bold uppercase tracking-wider text-[#A34063]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chapter {activePageData.pageNumber}</span>
            </div>

            <h4
              className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
              }`}
            >
              {activePageData.title}
            </h4>

            <span className="font-hand text-base text-[#A34063] font-bold">
              {activePageData.subtitle}
            </span>

            <p
              className={`font-sans text-base sm:text-lg leading-relaxed ${
                nightMode ? 'text-[#D8C7E8]' : 'text-[#5C4033]'
              }`}
            >
              {activePageData.story}
            </p>

            {/* Hand-drawn accent quote */}
            <div className="p-3.5 rounded-2xl bg-[#F7DDE5]/40 border-2 border-dashed border-[#A34063]/40 flex items-center gap-3">
              <Heart className="w-4 h-4 text-[#A34063] flex-shrink-0 fill-[#A34063]" />
              <p className="font-hand text-base sm:text-lg font-bold text-[#A34063] italic">
                {activePageData.accentQuote}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Storybook Bottom Navigation Footer */}
      <div className="p-4 sm:p-5 border-t border-dashed border-[#A34063]/30 flex items-center justify-between bg-white/20">
        <button
          type="button"
          onClick={goToPrev}
          disabled={displayPage === 0}
          className="px-4 py-2 rounded-full border-2 border-[#5C4033] text-xs font-rounded font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <span className="text-xs font-hand font-bold text-[#A34063] hidden sm:inline">
          Swipe or use ← → keys to turn pages!
        </span>

        <button
          type="button"
          onClick={goToNext}
          disabled={displayPage === pages.length - 1}
          className="px-5 py-2 rounded-full bg-[#A34063] text-white border-2 border-[#5C4033] text-xs font-rounded font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#852E4D] shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
