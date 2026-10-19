import React from 'react';
import { Sparkles, Scissors, Wand2, Compass, Heart } from 'lucide-react';
import { ATELIER_STEPS } from '../../data/fashionData';

interface AtelierSectionProps {
  nightMode: boolean;
}

export const AtelierSection: React.FC<AtelierSectionProps> = ({ nightMode }) => {
  return (
    <section id="atelier" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-rounded font-bold tracking-wider uppercase mb-3 border ${
              nightMode
                ? 'bg-[#2E1D3D] text-[#F5D88B] border-[#5E3B7A]'
                : 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-[#A34063]" />
            <span>Mimi’s Crafting Process</span>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
            }`}
          >
            Mimi's Tiny <span className="italic text-[#A34063]">Atelier.</span>
          </h2>

          <p
            className={`font-sans text-base sm:text-lg ${
              nightMode ? 'text-[#D8C7E8]' : 'text-[#6D4C3D]'
            }`}
          >
            How a tiny idea in a bunny's imagination turns into baby's softest keepsake.
          </p>

          <div className="w-24 h-1 bg-[#F5D88B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Staggered / Connected Steps Grid */}
        <div className="relative">
          {/* Thread connection line running through cards on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 -translate-y-12 z-0 pointer-events-none">
            <svg width="100%" height="20" fill="none" className="overflow-visible">
              <path
                d="M 50 10 Q 300 -20 600 15 T 1100 10"
                stroke="#A34063"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {ATELIER_STEPS.map((stepItem, index) => {
              const icons = [Scissors, Wand2, Compass];
              const StepIcon = icons[index] || Sparkles;

              return (
                <div
                  key={stepItem.step}
                  className={`rounded-3xl border-2 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 relative shadow-sm hover:shadow-xl ${
                    nightMode
                      ? 'bg-[#281B34] border-[#432A57] hover:border-[#A34063]'
                      : 'bg-white border-[#F7DDE5] hover:border-[#A34063]'
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A34063]">
                      {stepItem.step}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-rounded font-bold border ${
                        index === 0
                          ? 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
                          : index === 1
                          ? 'bg-[#F5D88B]/40 text-[#5C4033] border-[#E8C56B]'
                          : 'bg-[#DCE8D7] text-[#3D5A35] border-[#BED5B6]'
                      }`}
                    >
                      {stepItem.tag}
                    </span>
                  </div>

                  {/* Step Illustrated / Real Photography Vignette */}
                  <div className="w-full h-44 rounded-2xl bg-[#FFF8F1] border border-[#F7DDE5] mb-6 relative overflow-hidden group">
                    {index === 0 && (
                      <div className="relative w-full h-full">
                        <img
                          src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=500&q=80"
                          alt="Organic linen and cotton rolls"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-[10px] font-hand font-bold text-white">
                            Raw Organic Linen & Cotton Bolts 🌿
                          </span>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="relative w-full h-full">
                        <img
                          src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=500&q=80"
                          alt="Sewing spools and buttons"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-[10px] font-hand font-bold text-white">
                            Coconut Buttons & Pastel Floss ✂
                          </span>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="relative w-full h-full">
                        <img
                          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80"
                          alt="Baby gift package"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-[10px] font-hand font-bold text-white">
                            Chamomile Washed & Gift Tied 🎁
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col flex-grow">
                    <h3
                      className={`font-serif text-xl sm:text-2xl font-bold mb-1 tracking-tight ${
                        nightMode ? 'text-[#F3E8FF]' : 'text-[#5C4033]'
                      }`}
                    >
                      {stepItem.title}
                    </h3>
                    <p className="text-xs font-hand text-[#A34063] font-bold mb-3 text-base">
                      {stepItem.subtitle}
                    </p>
                    <p className="text-sm font-sans leading-relaxed opacity-90 text-stone-600 dark:text-stone-300">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
