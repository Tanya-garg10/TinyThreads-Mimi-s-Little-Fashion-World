import React, { useEffect } from 'react';
import { X, Sparkles, Star, Heart, Check, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MimiSecretBox } from '../character/MimiIllustrations';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  nightMode: boolean;
  onApplySecretPromo?: (code: string) => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  onClose,
  nightMode,
  onApplySecretPromo
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F7DDE5', '#A34063', '#F5D88B', '#DCE8D7', '#E8DFF5']
        });
      } catch {
        // fallback silently
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
    >
      <div
        className={`relative w-full max-w-md rounded-3xl border-3 shadow-2xl p-6 sm:p-8 text-center transition-all overflow-hidden ${
          nightMode
            ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
            : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close secret sewing box modal"
          className="absolute top-4 right-4 p-2 rounded-full border border-current hover:opacity-75 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A34063]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-rounded font-bold bg-[#F5D88B] text-[#5C4033] border border-[#5C4033] mb-4">
          <Star className="w-3.5 h-3.5 fill-[#5C4033]" />
          <span>Secret Discovery Unlocked!</span>
          <Star className="w-3.5 h-3.5 fill-[#5C4033]" />
        </div>

        {/* Main Headline */}
        <h3 id="easter-egg-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          You found Mimi's <br />
          <span className="italic text-[#A34063]">secret sewing box! ♡</span>
        </h3>

        {/* Illustration of Opened Secret Box */}
        <div className="flex justify-center my-4">
          <MimiSecretBox className="w-48 h-44" open={true} />
        </div>

        <p className="text-sm font-sans leading-relaxed opacity-90 max-w-xs mx-auto mb-5">
          Tucked between Grandma's silver thimble and strawberry pin cushion, Mimi left a little thank-you
          for curious explorers!
        </p>

        {/* Secret Promo Voucher Box */}
        <div className="p-4 rounded-2xl bg-[#F7DDE5]/50 border-2 border-dashed border-[#A34063] mb-6 flex flex-col items-center gap-1.5">
          <span className="text-xs font-rounded font-bold uppercase tracking-wider text-[#A34063]">
            Secret Explorer Gift: 15% Off Your Bag
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg text-[#5C4033] px-3 py-1 bg-white rounded-lg border border-[#A34063]">
              TINYMAGIC15
            </span>
            {onApplySecretPromo && (
              <button
                type="button"
                onClick={() => {
                  onApplySecretPromo('TINYMAGIC15');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#A34063] text-white text-xs font-rounded font-bold hover:bg-[#852E4D] cursor-pointer"
              >
                Apply Now
              </button>
            )}
          </div>
          <span className="text-[10px] text-stone-500 font-sans">
            Automatically applies 15% discount to your Tiny Bag!
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#A34063] hover:bg-[#852E4D] text-white font-rounded font-bold text-sm shadow-md transition-all cursor-pointer border-2 border-[#5C4033]"
        >
          Keep Exploring Mimi's World ♡
        </button>
      </div>
    </div>
  );
};
