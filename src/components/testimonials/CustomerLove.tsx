import React from 'react';
import { Heart, Star, Sparkles, MessageSquareHeart } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/fashionData';

interface CustomerLoveProps {
  nightMode: boolean;
}

export const CustomerLove: React.FC<CustomerLoveProps> = ({ nightMode }) => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-rounded font-bold tracking-wider uppercase mb-3 border ${
              nightMode
                ? 'bg-[#2E1D3D] text-[#F5D88B] border-[#5E3B7A]'
                : 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
            }`}
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#A34063]" />
            <span>Illustrative Customer Love</span>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
            }`}
          >
            Whispers from <span className="italic text-[#A34063]">Happy Dreamers.</span>
          </h2>

          <p
            className={`font-sans text-xs sm:text-sm font-medium ${
              nightMode ? 'text-[#BFA8D6]' : 'text-[#835C49]'
            }`}
          >
            *Loving stories from our community of parents and little dreamers.
          </p>

          <div className="w-20 h-1 bg-[#F5D88B] mx-auto mt-3 rounded-full" />
        </div>

        {/* 3 Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={t.id}
              className={`rounded-3xl border-2 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative shadow-xs ${
                nightMode
                  ? 'bg-[#281B34] border-[#432A57] text-[#F3E8FF]'
                  : 'bg-white border-[#F7DDE5] text-[#5C4033]'
              }`}
            >
              {/* Star Rating & Sample Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-[#F5D88B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-[#5C4033]" />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 border border-stone-200 dark:border-stone-700">
                  {t.role}
                </span>
              </div>

              {/* Quote text */}
              <p className="font-serif italic text-base sm:text-lg leading-relaxed mb-6">
                “{t.quote}”
              </p>

              {/* Author & Baby Details */}
              <div className="pt-4 border-t border-dashed border-[#A34063]/25 flex items-center justify-between">
                <div>
                  <h4 className="font-rounded font-bold text-sm tracking-tight">{t.author}</h4>
                  <span className="text-xs font-hand text-[#A34063] font-bold block">
                    Baby age: {t.babyAge}
                  </span>
                </div>
                <div className="text-[11px] font-rounded font-bold px-2.5 py-1 rounded-xl bg-[#F7DDE5]/40 text-[#A34063] border border-[#EABAC8]">
                  ♥ {t.favoriteItem}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
