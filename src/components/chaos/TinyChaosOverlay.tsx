import React from 'react';
import { Sparkles, X, Zap } from 'lucide-react';

interface TinyChaosOverlayProps {
  active: boolean;
  onToggle: () => void;
  nightMode: boolean;
}

export const TinyChaosOverlay: React.FC<TinyChaosOverlayProps> = ({
  active,
  onToggle,
  nightMode
}) => {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {/* Top Retro Animated Rainbow Thread Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-yellow-400 via-green-400 via-blue-400 to-purple-500 animate-pulse" />

      {/* Retro Floating Sticker 1: Top Left */}
      <div className="absolute top-24 left-3 sm:left-8 transform -rotate-12 pointer-events-auto">
        <div className="px-3 py-1.5 rounded-lg bg-[#F5D88B] border-2 border-[#5C4033] shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold text-[#5C4033] animate-bounce">
          <span>★</span>
          <span>BEST OF BABY WEB 2002</span>
          <span>★</span>
        </div>
      </div>

      {/* Retro Floating Sticker 2: Top Right */}
      <div className="absolute top-28 right-3 sm:right-10 transform rotate-8 pointer-events-auto hidden sm:block">
        <div className="px-3 py-1 rounded-full bg-[#F7DDE5] border-2 border-[#A34063] shadow-lg text-xs font-rounded font-bold text-[#A34063] animate-pulse">
          🐰 100% PINCH-FREE SEAMS!
        </div>
      </div>

      {/* Retro Floating Sticker 3: Bottom Left Under Construction */}
      <div className="absolute bottom-28 left-4 transform rotate-6 pointer-events-auto hidden md:block">
        <div className="px-3 py-1 rounded-md bg-yellow-300 border-2 border-black shadow-md text-xs font-mono font-bold text-black flex items-center gap-1.5">
          <span>🚧</span>
          <span>MIMI AT WORK • DREAMING KNITS</span>
          <span>🚧</span>
        </div>
      </div>

      {/* Floating retro animated star doodles */}
      <span className="absolute top-1/4 left-1/5 text-2xl text-[#F5D88B] animate-spin" style={{ animationDuration: '8s' }}>
        ✦
      </span>
      <span className="absolute top-2/3 right-1/6 text-3xl text-[#A34063] animate-bounce hidden sm:inline" style={{ animationDuration: '3s' }}>
        ★
      </span>
      <span className="absolute bottom-1/3 left-1/10 text-xl text-[#60A5FA] animate-pulse">
        ✿
      </span>

      {/* Floating Banner Tag indicating Chaos Mode is Active */}
      <div className="fixed bottom-20 left-6 z-50 pointer-events-auto">
        <div className="p-2.5 rounded-2xl bg-[#A34063] text-white border-2 border-[#5C4033] shadow-2xl flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
          <span className="text-xs font-rounded font-bold">Tiny Chaos Active!</span>
          <button
            type="button"
            onClick={onToggle}
            className="ml-1 px-2 py-0.5 rounded-lg bg-white/20 hover:bg-white/30 text-[10px] font-mono cursor-pointer"
          >
            Turn Off
          </button>
        </div>
      </div>
    </div>
  );
};
