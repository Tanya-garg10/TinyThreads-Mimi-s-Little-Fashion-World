import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface AnnouncementBarProps {
  nightMode: boolean;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ nightMode }) => {
  return (
    <div
      className={`w-full py-2 px-4 text-xs sm:text-sm font-rounded font-medium tracking-wide flex items-center justify-center gap-2 transition-colors duration-300 relative z-40 ${
        nightMode
          ? 'bg-[#2D1A3B] text-[#F3E8FF] border-b border-[#432A57]'
          : 'bg-[#F7DDE5] text-[#5C4033] border-b border-[#EABAC8]'
      }`}
    >
      <span className="flex items-center gap-1.5 animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-[#A34063]" />
      </span>
      <span className="text-center font-semibold">
        Made with tiny dreams and lots of love ♡
      </span>
      <span className="hidden sm:inline-block text-[#A34063] font-serif italic text-xs">
        • Free bedtime shipping over ₹1,200 •
      </span>
      <Heart className="w-3.5 h-3.5 text-[#A34063] fill-[#A34063] animate-bounce" />
    </div>
  );
};
