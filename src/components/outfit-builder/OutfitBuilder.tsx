import React, { useState } from 'react';
import { Sparkles, Dices, RotateCcw, ShoppingBag, Check, Heart, Smile } from 'lucide-react';
import { OutfitBase, OutfitColor, OutfitAccessory, CartItem } from '../../types';
import { OutfitPreviewSvg } from './OutfitPreviewSvg';

interface OutfitBuilderProps {
  nightMode: boolean;
  onAddCustomLookToCart: (item: CartItem) => void;
}

const BASE_OPTIONS: { id: OutfitBase; label: string; desc: string; icon: string }[] = [
  { id: 'onesie', label: 'Snug Onesie', desc: 'Kimono wrap with nickel-free snaps', icon: '☁' },
  { id: 'romper', label: 'Bubble Romper', desc: 'Breezy gathers & wooden buttons', icon: '🌿' },
  { id: 'pajamas', label: 'Pajama Set', desc: 'Silky ribbed knit for sweet lullabies', icon: '🌙' },
];

const COLOR_OPTIONS: { id: OutfitColor; label: string; color: string; border: string }[] = [
  { id: 'blush', label: 'Soft Blush', color: '#F7DDE5', border: '#EABAC8' },
  { id: 'cream', label: 'Warm Cream', color: '#FFF8F1', border: '#E2D3BF' },
  { id: 'sage', label: 'Meadow Sage', color: '#DCE8D7', border: '#BED5B6' },
  { id: 'lavender', label: 'Lavender', color: '#E8DFF5', border: '#C8BAE4' },
  { id: 'butter', label: 'Butter Yellow', color: '#F5D88B', border: '#DEC06A' },
];

const ACCESSORY_OPTIONS: { id: OutfitAccessory; label: string; icon: string; quoteTag: string }[] = [
  { id: 'bunny_hat', label: 'Bunny Hat', icon: '🐰', quoteTag: 'with floppy ear charm' },
  { id: 'tiny_bow', label: 'Tiny Bow', icon: '🎀', quoteTag: 'tied with ribbon perfection' },
  { id: 'cloud_patch', label: 'Cloud Patch', icon: '☁️', quoteTag: 'fluffy as morning daydreams' },
  { id: 'star_patch', label: 'Star Patch', icon: '⭐', quoteTag: 'twinkling with nighttime wonder' },
];

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  nightMode,
  onAddCustomLookToCart
}) => {
  const [base, setBase] = useState<OutfitBase>('onesie');
  const [color, setColor] = useState<OutfitColor>('blush');
  const [accessory, setAccessory] = useState<OutfitAccessory>('bunny_hat');
  const [justAdded, setJustAdded] = useState(false);

  // Dynamic friendly quote generator
  const getMimiQuote = () => {
    const baseNames = {
      onesie: 'cloud-soft onesie',
      romper: 'darling bubble romper',
      pajamas: 'cozy bedtime pajama set'
    };
    const colorNames = {
      blush: 'soft blush',
      cream: 'warm vanilla cream',
      sage: 'fresh meadow sage',
      lavender: 'twilight lavender',
      butter: 'golden sunbeam butter'
    };
    const accNames = {
      bunny_hat: 'a floppy bunny hat for cozy warmth',
      tiny_bow: 'a dainty hand-tied ribbon bow',
      cloud_patch: 'a smiling cloud embroidered patch',
      star_patch: 'a golden twinkling starlight badge'
    };

    return `“Mimi says: This ${colorNames[color]} ${baseNames[base]} with ${accNames[accessory]} is ready for a big little adventure!”`;
  };

  // Surprise Me Handler
  const handleSurpriseMe = () => {
    const randomBase = BASE_OPTIONS[Math.floor(Math.random() * BASE_OPTIONS.length)].id;
    const randomColor = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)].id;
    const randomAccessory = ACCESSORY_OPTIONS[Math.floor(Math.random() * ACCESSORY_OPTIONS.length)].id;

    setBase(randomBase);
    setColor(randomColor);
    setAccessory(randomAccessory);
  };

  // Reset Look
  const handleReset = () => {
    setBase('onesie');
    setColor('blush');
    setAccessory('bunny_hat');
  };

  // Add Custom Look to Bag
  const handleAddLook = () => {
    const customItem: CartItem = {
      cartId: `custom-${Date.now()}`,
      name: `Custom Tailor Look: ${color.charAt(0).toUpperCase() + color.slice(1)} ${base.charAt(0).toUpperCase() + base.slice(1)}`,
      price: 899,
      quantity: 1,
      size: '3-6M',
      collection: 'Tiny Tailor Custom Look',
      customDetails: {
        baseOutfit: base,
        color,
        accessory
      },
      illustrationType: 'custom'
    };

    onAddCustomLookToCart(customItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <section id="tiny-tailor" className="py-16 md:py-24 relative overflow-hidden">
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
            <Sparkles className="w-3.5 h-3.5 text-[#A34063]" />
            <span>Your Very Own Little Look</span>
          </div>

          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
            }`}
          >
            Let's put together <span className="italic text-[#A34063]">something adorable.</span>
          </h2>

          <p
            className={`font-sans text-base sm:text-lg ${
              nightMode ? 'text-[#D8C7E8]' : 'text-[#6D4C3D]'
            }`}
          >
            Mix and match silhouettes, pastel dye pots, and hand-embroidered charms in Mimi’s interactive tailor studio.
          </p>

          <div className="w-24 h-1 bg-[#F5D88B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Tailor Studio Workspace Card */}
        <div
          className={`rounded-3xl border-3 p-6 sm:p-10 shadow-xl transition-colors relative ${
            nightMode
              ? 'bg-[#22152E] border-[#5E3B7A]'
              : 'bg-[#FFF8F1] border-[#5C4033]'
          }`}
        >
          {/* Subtle stitch border interior */}
          <div className="absolute inset-3 rounded-2xl border-2 border-dashed border-[#A34063]/25 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Large Live SVG Preview & Mimi's Speech Bubble */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              
              {/* Studio Mannequin Hanger Area */}
              <div
                className={`w-full max-w-md p-6 rounded-3xl border-2 shadow-inner flex flex-col items-center justify-center relative overflow-hidden ${
                  nightMode
                    ? 'bg-[#180E21] border-[#382348]'
                    : 'bg-white border-[#F7DDE5]'
                }`}
              >
                {/* Floating sparkle icon */}
                <div className="absolute top-4 left-4 animate-sparkle text-[#F5D88B]">
                  ★
                </div>
                <div className="absolute top-4 right-4 animate-sparkle text-[#A34063]">
                  ✦
                </div>

                {/* The Live Interactive SVG Preview */}
                <OutfitPreviewSvg base={base} color={color} accessory={accessory} />

                {/* Selected Spec Tag */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-rounded font-bold bg-[#F7DDE5] text-[#A34063] border border-[#EABAC8]">
                    {base.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-rounded font-bold bg-[#F5D88B]/40 text-[#5C4033] border border-[#E8C56B]">
                    {color.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-rounded font-bold bg-[#DCE8D7] text-[#3D5A35] border border-[#BED5B6]">
                    {accessory.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Dynamic Mimi Quote Bubble */}
              <div
                className={`mt-6 w-full max-w-md p-4 rounded-2xl border-2 shadow-xs flex items-center gap-3.5 relative ${
                  nightMode
                    ? 'bg-[#2D1B3D] border-[#5E3B7A] text-[#F3E8FF]'
                    : 'bg-white border-[#EABAC8] text-[#5C4033]'
                }`}
              >
                {/* Mimi mini avatar */}
                <div className="w-12 h-12 rounded-full bg-[#F7DDE5] border-2 border-[#A34063] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <span className="text-xl">🐰</span>
                </div>
                <div className="flex-1">
                  <p className="font-hand text-base sm:text-lg font-bold leading-snug text-[#A34063]">
                    {getMimiQuote()}
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Customization Controls & Action Buttons */}
            <div className="lg:col-span-6 flex flex-col gap-7">
              
              {/* Control 1: Base Outfit */}
              <div>
                <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-2.5 text-[#5C4033] dark:text-[#D8C7E8]">
                  Step 1: Choose Base Silhouette
                </label>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {BASE_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBase(item.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        base === item.id
                          ? 'bg-[#A34063] text-white border-[#5C4033] shadow-md scale-102'
                          : nightMode
                          ? 'bg-[#2B1B38] border-[#452A5B] text-[#D8C7E8] hover:border-[#A34063]'
                          : 'bg-white border-[#F7DDE5] text-[#5C4033] hover:border-[#A34063]'
                      }`}
                    >
                      <span className="text-lg mb-1">{item.icon}</span>
                      <span className="font-rounded font-bold text-xs sm:text-sm">{item.label}</span>
                      <span className="text-[10px] opacity-80 mt-0.5 line-clamp-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Color Palette */}
              <div>
                <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-2.5 text-[#5C4033] dark:text-[#D8C7E8]">
                  Step 2: Pick Mimi’s Pastel Dye
                </label>
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                  {COLOR_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setColor(item.id)}
                      className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        color === item.id
                          ? 'border-[#5C4033] ring-2 ring-[#A34063] scale-105 shadow-md bg-white/10'
                          : 'border-transparent hover:scale-102'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full border-2 shadow-xs flex items-center justify-center"
                        style={{ backgroundColor: item.color, borderColor: item.border }}
                      >
                        {color === item.id && <Check className="w-4 h-4 text-[#5C4033]" />}
                      </div>
                      <span className="text-[10px] font-rounded font-bold text-center text-[#5C4033] dark:text-[#D8C7E8] truncate w-full">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 3: Charming Accessory */}
              <div>
                <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-2.5 text-[#5C4033] dark:text-[#D8C7E8]">
                  Step 3: Stitched Charm or Accessory
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ACCESSORY_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAccessory(item.id)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center gap-1 transition-all cursor-pointer ${
                        accessory === item.id
                          ? 'bg-[#A34063] text-white border-[#5C4033] shadow-md scale-102'
                          : nightMode
                          ? 'bg-[#2B1B38] border-[#452A5B] text-[#D8C7E8] hover:border-[#A34063]'
                          : 'bg-white border-[#F7DDE5] text-[#5C4033] hover:border-[#A34063]'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-rounded font-bold text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Surprise Me, Reset, Add to Bag */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  className={`w-full sm:w-auto px-5 py-3 rounded-full font-rounded font-bold text-xs sm:text-sm border-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    nightMode
                      ? 'bg-[#2E1D3D] border-[#5E3B7A] text-[#F5D88B] hover:bg-[#3D254E]'
                      : 'bg-white border-[#5C4033] text-[#5C4033] hover:bg-[#F7DDE5]'
                  }`}
                >
                  <Dices className="w-4 h-4 text-[#A34063]" />
                  <span>Surprise Me!</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className={`w-full sm:w-auto px-4 py-3 rounded-full font-rounded font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    nightMode
                      ? 'border-[#452A5B] text-[#D8C7E8] hover:bg-white/5'
                      : 'border-[#EABAC8] text-stone-600 hover:bg-white'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Look</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddLook}
                  className={`w-full sm:flex-1 py-3 px-6 rounded-full font-rounded font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#5C4033] ${
                    justAdded
                      ? 'bg-[#5E8255]'
                      : 'bg-[#A34063] hover:bg-[#852E4D] active:scale-95'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added Custom Look to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add My Look to Bag — ₹899</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
