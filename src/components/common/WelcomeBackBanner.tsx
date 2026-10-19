import React, { useState, useEffect } from 'react';
import { Sparkles, X, Heart } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

interface WelcomeBackBannerProps {
  nightMode: boolean;
}

export const WelcomeBackBanner: React.FC<WelcomeBackBannerProps> = ({ nightMode }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [visitCount, setVisitCount] = useState(1);

  useEffect(() => {
    try {
      const storedVisits = localStorage.getItem('tinythreads_visit_count');
      const hasSeenDismissed = sessionStorage.getItem('tinythreads_dismissed_welcome');

      if (storedVisits) {
        const count = parseInt(storedVisits, 10) + 1;
        localStorage.setItem('tinythreads_visit_count', count.toString());
        setVisitCount(count);

        if (!hasSeenDismissed) {
          setShowBanner(true);
        }
      } else {
        localStorage.setItem('tinythreads_visit_count', '1');
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    audioManager.playClickSound();
    setShowBanner(false);
    try {
      sessionStorage.setItem('tinythreads_dismissed_welcome', 'true');
    } catch {
      // ignore
    }
  };

  if (!showBanner || visitCount <= 1) return null;

  return (
    <div
      className={`w-full py-2.5 px-4 text-xs font-rounded font-semibold border-b flex items-center justify-between gap-3 transition-all animate-in slide-in-from-top-2 relative z-30 ${
        nightMode
          ? 'bg-[#351F45] text-[#FDE68A] border-[#5E3B7A]'
          : 'bg-[#FFF8DB] text-[#5C4033] border-[#F5D88B]'
      }`}
    >
      <div className="flex items-center gap-2 mx-auto">
        <Sparkles className="w-4 h-4 text-[#A34063] animate-pulse" />
        <span>
          You’re back, little dreamer! Mimi saved a little magic for you ♡ (Visit #{visitCount})
        </span>
        <Heart className="w-3.5 h-3.5 text-[#A34063] fill-[#A34063]" />
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss welcome message"
        className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
