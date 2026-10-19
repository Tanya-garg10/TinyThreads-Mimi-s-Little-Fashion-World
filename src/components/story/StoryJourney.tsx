import React, { useState } from 'react';
import { Sparkles, BookOpen, ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import { STORY_SCENES } from '../../data/fashionData';

interface StoryJourneyProps {
  nightMode: boolean;
}

export const StoryJourney: React.FC<StoryJourneyProps> = ({ nightMode }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const currentScene = STORY_SCENES[activeSceneIndex];

  return (
    <section id="our-story" className="py-16 md:py-24 relative overflow-hidden">
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
            <BookOpen className="w-3.5 h-3.5 text-[#A34063]" />
            <span>Storybook Chronicles</span>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
            }`}
          >
            Our Little <span className="italic text-[#A34063]">Story.</span>
          </h2>

          <p
            className={`font-sans text-base sm:text-lg ${
              nightMode ? 'text-[#D8C7E8]' : 'text-[#6D4C3D]'
            }`}
          >
            Turn the pages to see how a stray spool of golden thread sparked Mimi’s world.
          </p>

          <div className="w-24 h-1 bg-[#F5D88B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Storybook Binder Layout */}
        <div
          className={`rounded-3xl border-3 shadow-xl overflow-hidden transition-all duration-300 relative ${
            nightMode
              ? 'bg-[#24172F] border-[#5E3B7A]'
              : 'bg-[#FFF8F1] border-[#5C4033]'
          }`}
        >
          {/* Top Story Chapter Bar */}
          <div className="p-4 sm:p-5 border-b border-dashed border-[#A34063]/30 flex flex-wrap items-center justify-between gap-3 bg-white/20">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {STORY_SCENES.map((scene, idx) => (
                <button
                  key={scene.number}
                  type="button"
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-rounded font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    activeSceneIndex === idx
                      ? 'bg-[#A34063] text-white border-[#5C4033] shadow-xs'
                      : nightMode
                      ? 'bg-[#1D1226] border-[#432A57] text-[#D8C7E8] hover:border-[#A34063]'
                      : 'bg-white border-[#F7DDE5] text-[#5C4033] hover:border-[#A34063]'
                  }`}
                >
                  Chapter {scene.number}: {scene.title.split(' ')[1] || scene.title}
                </button>
              ))}
            </div>

            {/* Stepper controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveSceneIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeSceneIndex === 0}
                aria-label="Previous Chapter"
                className="p-1.5 rounded-full border border-current disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold">
                {activeSceneIndex + 1} / {STORY_SCENES.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveSceneIndex((prev) => Math.min(STORY_SCENES.length - 1, prev + 1))}
                disabled={activeSceneIndex === STORY_SCENES.length - 1}
                aria-label="Next Chapter"
                className="p-1.5 rounded-full border border-current disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Story Page */}
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left: Illustrated Story Vignette */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm aspect-square rounded-3xl bg-[#FFF8F1] border-3 border-[#5C4033] p-6 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group">
                  {/* Decorative corner staples */}
                  <span className="absolute top-2 left-2 text-xs opacity-40">✦</span>
                  <span className="absolute top-2 right-2 text-xs opacity-40">✦</span>
                  <span className="absolute bottom-2 left-2 text-xs opacity-40">✦</span>
                  <span className="absolute bottom-2 right-2 text-xs opacity-40">✦</span>

                  {activeSceneIndex === 0 && (
                    <div className="flex flex-col items-center text-center animate-fade-in">
                      <div className="text-6xl mb-3 animate-float">🧺</div>
                      <div className="font-serif text-lg font-bold text-[#5C4033]">The Attic Hamper</div>
                      <p className="text-xs font-hand text-[#A34063] font-bold mt-1 max-w-[200px]">
                        Uncovering grandma’s botanical floral prints & golden threads.
                      </p>
                    </div>
                  )}

                  {activeSceneIndex === 1 && (
                    <div className="flex flex-col items-center text-center animate-fade-in">
                      <div className="text-6xl mb-3 animate-float">🧸</div>
                      <div className="font-serif text-lg font-bold text-[#5C4033]">Barnaby’s New Look</div>
                      <p className="text-xs font-hand text-[#A34063] font-bold mt-1 max-w-[200px]">
                        A baby-sized romper made with an oversized brass thimble.
                      </p>
                    </div>
                  )}

                  {activeSceneIndex === 2 && (
                    <div className="flex flex-col items-center text-center animate-fade-in">
                      <div className="text-6xl mb-3 animate-float">🌳</div>
                      <div className="font-serif text-lg font-bold text-[#5C4033]">Hollow Oak Studio</div>
                      <p className="text-xs font-hand text-[#A34063] font-bold mt-1 max-w-[200px]">
                        Measuring tape garlands and happy orders from forest parents!
                      </p>
                    </div>
                  )}

                  {activeSceneIndex === 3 && (
                    <div className="flex flex-col items-center text-center animate-fade-in">
                      <div className="text-6xl mb-3 animate-float">✨</div>
                      <div className="font-serif text-lg font-bold text-[#5C4033]">TinyThreads Today</div>
                      <p className="text-xs font-hand text-[#A34063] font-bold mt-1 max-w-[200px]">
                        Spreading imagination and cloud-soft hugs to nurseries everywhere.
                      </p>
                    </div>
                  )}
                </div>

                {/* Caption card */}
                <div className="mt-4 px-4 py-1.5 rounded-full bg-white/70 border border-[#EABAC8] text-xs font-mono text-[#5C4033]">
                  {currentScene.sceneTheme}
                </div>
              </div>

              {/* Right: Narrative Story Text */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#A34063]">
                    {currentScene.number}
                  </span>
                  <div>
                    <span className="text-xs font-rounded font-bold uppercase tracking-widest text-[#A34063] block">
                      Scene {currentScene.number}
                    </span>
                    <h3
                      className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                        nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
                      }`}
                    >
                      {currentScene.title}
                    </h3>
                  </div>
                </div>

                <div className="font-hand text-lg text-[#A34063] font-bold">
                  {currentScene.subtitle}
                </div>

                <p
                  className={`font-sans text-base sm:text-lg leading-relaxed ${
                    nightMode ? 'text-[#D8C7E8]' : 'text-[#5C4033]'
                  }`}
                >
                  {currentScene.narrative}
                </p>

                {/* Hand-drawn Callout Note */}
                <div
                  className={`mt-4 p-4 sm:p-5 rounded-2xl border-2 border-dashed flex items-center gap-3.5 ${
                    nightMode
                      ? 'bg-[#1E1326] border-[#7B2846] text-[#F5D88B]'
                      : 'bg-[#F7DDE5]/40 border-[#A34063] text-[#A34063]'
                  }`}
                >
                  <Heart className="w-5 h-5 flex-shrink-0 fill-current" />
                  <p className="font-hand text-lg sm:text-xl font-bold italic">
                    {currentScene.detailQuote}
                  </p>
                </div>

                {/* Navigation CTA */}
                <div className="mt-4 flex items-center gap-4">
                  {activeSceneIndex < STORY_SCENES.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveSceneIndex(activeSceneIndex + 1)}
                      className="inline-flex items-center gap-2 font-rounded font-bold text-sm text-[#A34063] hover:text-[#7B2846] cursor-pointer"
                    >
                      <span>Read Next Scene: {STORY_SCENES[activeSceneIndex + 1].title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="font-hand text-base text-[#A34063] font-bold">
                      ♡ And so the adventures continue every day...
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
