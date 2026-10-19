import React from 'react';
import { Sparkles, Heart, Compass, Scissors, Star } from 'lucide-react';
import { MimiSewingMachine } from '../character/MimiIllustrations';

interface MeetMimiProps {
  nightMode: boolean;
  onOpenTailorStudio: () => void;
}

export const MeetMimi: React.FC<MeetMimiProps> = ({ nightMode, onOpenTailorStudio }) => {
  const traits = [
    {
      title: 'Imagination collector',
      icon: Star,
      description: 'Finds design inspiration in fluffy storm clouds, garden ladybugs, and lullaby notes.',
      color: 'bg-[#F5D88B]/40 text-[#5C4033] border-[#E8C56B]'
    },
    {
      title: 'Professional cuddle enthusiast',
      icon: Heart,
      description: 'Believes seams should never itch, fabrics should feel like kisses, and babies deserve cozy hugs.',
      color: 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
    },
    {
      title: 'Tiny fashion dreamer',
      icon: Compass,
      description: 'Transforms miniature scraps of linen, muslin, and velvet into heirloom baby treasures.',
      color: 'bg-[#DCE8D7] text-[#3D5A35] border-[#BED5B6]'
    }
  ];

  const swatches = [
    { name: 'Cloud Cotton', color: '#FFF8F1', border: '#EADCC8', pattern: '100% Organic' },
    { name: 'Blush Velvet', color: '#F7DDE5', border: '#EABAC8', pattern: 'Gentle Hug' },
    { name: 'Meadow Linen', color: '#DCE8D7', border: '#BED5B6', pattern: 'Breathable' },
    { name: 'Sunbeam Muslin', color: '#F5D88B', border: '#E8C56B', pattern: 'Pure Joy' },
    { name: 'Twilight Rib', color: '#E8DFF5', border: '#C8BAE4', pattern: 'Dream Spun' }
  ];

  return (
    <section id="meet-mimi" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-rounded font-bold tracking-wider uppercase mb-3 border ${
              nightMode
                ? 'bg-[#2E1D3D] text-[#F5D88B] border-[#5E3B7A]'
                : 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-[#A34063]" />
            <span>The Little Designer Behind The Threads</span>
          </div>
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
            }`}
          >
            Small paws.{' '}
            <span className="italic text-[#A34063]">Big imagination.</span>
          </h2>
          <div className="w-20 h-1 bg-[#F5D88B] mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Mimi's Story & Character Chips */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl border-2 shadow-sm relative transition-all ${
                nightMode
                  ? 'bg-[#281B34] border-[#432A57]'
                  : 'bg-white border-[#F7DDE5]'
              }`}
            >
              {/* Paper quote mark */}
              <div className="font-serif text-6xl text-[#A34063]/20 absolute top-3 left-4 select-none leading-none">
                “
              </div>

              <p
                className={`font-sans text-base sm:text-lg leading-relaxed mb-4 relative z-10 ${
                  nightMode ? 'text-[#D8C7E8]' : 'text-[#5C4033]'
                }`}
              >
                Once upon a little morning, <strong>Mimi</strong> discovered a tiny box of colorful fabrics
                in her grandmother’s attic. She began stitching outfits for her stuffed friends, turning
                leftover scraps into cloud-soft rompers, adventure-ready overalls, and dreamy bedtime sets.
              </p>
              <p
                className={`font-sans text-base sm:text-lg leading-relaxed relative z-10 ${
                  nightMode ? 'text-[#BFA8D6]' : 'text-[#6D4C3D]'
                }`}
              >
                Soon, her tiny studio became a place where every little outfit had a story — designed
                with room for chubby cheeks to smile, little hands to clap, and big little dreams to take flight.
              </p>

              {/* Early web decorative footnote */}
              <div className="mt-6 pt-4 border-t border-dashed border-[#A34063]/30 flex flex-wrap items-center justify-between text-xs font-hand text-[#A34063] font-bold">
                <span>📍 Atelier Location: The Hollow Oak tree by the Buttercup Meadow</span>
                <span>✂ Certified 100% pinch-free seams</span>
              </div>
            </div>

            {/* Three Character Traits as Playful Visual Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {traits.map((trait) => {
                const Icon = trait.icon;
                return (
                  <div
                    key={trait.title}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-2 shadow-xs transition-transform hover:-translate-y-1 ${trait.color}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-rounded font-bold text-sm tracking-tight">{trait.title}</span>
                    </div>
                    <p className="text-xs font-sans leading-relaxed opacity-90">
                      {trait.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick button to tailor studio */}
            <div className="pt-2">
              <button
                onClick={onOpenTailorStudio}
                className="inline-flex items-center gap-2 font-rounded font-bold text-sm text-[#A34063] hover:text-[#7B2846] transition-colors group cursor-pointer"
              >
                <span>Visit Mimi’s Tiny Tailor to customize an outfit</span>
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </button>
            </div>
          </div>

          {/* Right: Mimi's Studio Scene & Fabric Swatch Board */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              className={`p-6 rounded-3xl border-3 shadow-md relative overflow-hidden ${
                nightMode
                  ? 'bg-[#22152E] border-[#5E3B7A]'
                  : 'bg-[#FFF8F1] border-[#5C4033]'
              }`}
            >
              {/* Studio corner banner */}
              <div className="flex items-center justify-between pb-4 border-b border-dashed border-[#A34063]/30">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#A34063] inline-block" />
                  <span className="font-rounded font-bold text-sm text-[#5C4033] dark:text-[#F3E8FF]">
                    Mimi’s Studio Workbench
                  </span>
                </div>
                <span className="font-hand font-bold text-xs text-[#A34063]">
                  Active Project: Spring Rompers
                </span>
              </div>

              {/* Sewing Machine Illustration */}
              <div className="flex justify-center py-4">
                <MimiSewingMachine className="w-56 h-48" />
              </div>

              {/* Swatch Board & Tools */}
              <div className="mt-2 pt-4 border-t border-dashed border-[#A34063]/30">
                <div className="text-xs font-rounded font-bold uppercase tracking-wider mb-2.5 text-[#5C4033] dark:text-[#D8C7E8] flex items-center justify-between">
                  <span>Mimi’s Favorite Fabric Swatches</span>
                  <span className="font-hand normal-case text-xs text-[#A34063]">Soft as baby whispers</span>
                </div>

                {/* Swatches strip */}
                <div className="grid grid-cols-5 gap-2">
                  {swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                      title={`${swatch.name} — ${swatch.pattern}`}
                    >
                      <div
                        className="w-11 h-11 rounded-xl border-2 shadow-xs relative flex items-center justify-center"
                        style={{ backgroundColor: swatch.color, borderColor: swatch.border }}
                      >
                        {/* Tiny needle stitch accent */}
                        <span className="text-[10px] text-[#5C4033] opacity-60">✂</span>
                      </div>
                      <span className="text-[9px] font-rounded font-bold text-center mt-1 text-[#5C4033] dark:text-[#D8C7E8] truncate w-full">
                        {swatch.name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
