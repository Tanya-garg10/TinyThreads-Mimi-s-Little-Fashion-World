import React from 'react';
import { Heart, ArrowUp, Sparkles, Github, Star, Coffee } from 'lucide-react';

interface FooterProps {
  nightMode: boolean;
  onTriggerEasterEgg: () => void;
}

export const Footer: React.FC<FooterProps> = ({ nightMode, onTriggerEasterEgg }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      className={`border-t-3 transition-colors duration-300 relative overflow-hidden ${
        nightMode
          ? 'bg-[#170E1F] border-[#382348] text-[#F3E8FF]'
          : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
      }`}
    >
      {/* Retro Status Strip (Early Web Nostalgia) */}
      <div
        className={`w-full py-2.5 px-4 text-xs font-mono border-b flex flex-wrap items-center justify-between gap-2 ${
          nightMode
            ? 'bg-[#21142C] border-[#382348] text-[#D8C7E8]'
            : 'bg-[#F7DDE5]/60 border-[#EABAC8] text-[#5C4033]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="font-semibold">Mimi’s Status:</span>
          <span>Drafting daisy-chain embroidery for newborn rompers 🧶</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <span>Meadow Grove Weather: 21°C Gentle Breeze 🌤</span>
          <span>•</span>
          <span>Soundtrack: Music box lullaby in F-major 🎵</span>
        </div>

        {/* Retro Visitor Counter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-sans font-semibold">Dreamers Visited:</span>
          <span className="counter-box text-xs">004,829</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Wordmark */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#F7DDE5] border-2 border-[#A34063] flex items-center justify-center">
                <span className="text-lg">🐰</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                TinyThreads
              </span>
            </div>

            <p className="font-hand text-lg text-[#A34063] font-bold">
              “Little outfits. Big little adventures.”
            </p>

            <p className="font-sans text-xs leading-relaxed max-w-sm opacity-80">
              An enchanting baby fashion atelier designed with gentle organic textures,
              hand-stitched love, and childhood imagination.
            </p>

            {/* Made with Love Badge (Early Web Soul) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7DDE5] border border-[#A34063] text-xs font-rounded font-bold text-[#A34063] shadow-xs mt-1">
              <Heart className="w-3.5 h-3.5 fill-[#A34063]" />
              <span>Handcrafted with early-web soul & lots of love ♡</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <span className="font-rounded font-bold text-xs uppercase tracking-wider text-[#A34063]">
              Boutique Chapters
            </span>
            <ul className="space-y-1.5 text-sm font-rounded">
              <li>
                <a href="#meet-mimi" className="hover:text-[#A34063] transition-colors">
                  Meet Mimi the Bunny
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#A34063] transition-colors">
                  The Little Collections
                </a>
              </li>
              <li>
                <a href="#tiny-tailor" className="hover:text-[#A34063] transition-colors">
                  Tiny Tailor Studio
                </a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-[#A34063] transition-colors">
                  Mimi’s Process
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-[#A34063] transition-colors">
                  Attic Discoveries Story
                </a>
              </li>
            </ul>
          </div>

          {/* Easter egg clue & GitHub */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3 text-left md:text-right">
            <span className="font-rounded font-bold text-xs uppercase tracking-wider text-[#A34063]">
              Curious Explorers
            </span>

            <p className="font-sans text-xs opacity-80 max-w-xs">
              Did you find Mimi’s hidden brass sewing box? Keep your eye out for tiny sparkling thimbles!
            </p>

            <button
              type="button"
              onClick={onTriggerEasterEgg}
              className="text-xs font-hand font-bold text-[#A34063] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Click for a hint from Mimi</span>
              <Sparkles className="w-3 h-3" />
            </button>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-current text-xs font-rounded font-bold hover:bg-black/5 transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top ☁️</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-12 pt-6 border-t border-dashed border-[#A34063]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans opacity-75">
          <p>
            © 2026 TinyThreads — A fictional boutique built with imagination. All characters are original.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">Handcrafted with Love ♡</span>
            <span>•</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#A34063] inline-flex items-center gap-1 font-semibold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
