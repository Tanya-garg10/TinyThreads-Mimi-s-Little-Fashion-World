import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Heart, ShieldCheck, Check, Maximize2 } from 'lucide-react';
import { Product } from '../../types';
import { ProductIllustration } from '../character/MimiIllustrations';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  nightMode: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  nightMode
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '0-3M');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  const [showFullZoom, setShowFullZoom] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 700);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <div
          className={`relative w-full max-w-2xl rounded-3xl border-3 shadow-2xl p-5 sm:p-7 transition-all overflow-hidden ${
            nightMode
              ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
              : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full border border-current hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A34063] z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Left: Real Lookbook Photo / Illustration Showcase */}
            <div className="sm:col-span-6 flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFF8F1] border-2 border-[#EABAC8] shadow-inner relative overflow-hidden">
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 bg-[#F5D88B] text-[#5C4033] text-[10px] font-rounded font-bold px-2.5 py-0.5 rounded-full border border-[#5C4033] shadow-xs">
                  {product.badge}
                </span>
              )}

              {/* Fit / Full View Toggle Controls */}
              {product.realImageUrl && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-full border border-[#EABAC8] shadow-xs">
                  <button
                    type="button"
                    onClick={() => setFitMode(fitMode === 'contain' ? 'cover' : 'contain')}
                    className="px-2 py-0.5 text-[10px] font-rounded font-bold text-[#A34063] hover:underline cursor-pointer"
                    title="Toggle Full Picture Visibility"
                  >
                    {fitMode === 'contain' ? '🔍 Full Fit (Puri Photo)' : '🖼️ Crop Cover'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFullZoom(true)}
                    className="p-1 hover:bg-[#F7DDE5] rounded-full text-[#A34063] cursor-pointer"
                    title="Zoom Picture"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {product.realImageUrl ? (
                <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-white/80 border border-[#F7DDE5] flex items-center justify-center shadow-xs">
                  <img
                    src={product.realImageUrl}
                    alt={product.name}
                    className={`w-full h-full transition-all duration-300 ${
                      fitMode === 'contain' ? 'object-contain p-2' : 'object-cover'
                    }`}
                  />
                  {/* Mimi Sketch overlay badge */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs rounded-xl p-1 border border-[#EABAC8] shadow-xs flex items-center gap-1">
                    <ProductIllustration type={product.illustrationType} className="w-6 h-6" />
                    <span className="text-[9px] font-hand font-bold text-[#A34063] pr-1">Mimi Original</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 flex items-center justify-center">
                  <ProductIllustration type={product.illustrationType} className="w-40 h-40 drop-shadow-sm" />
                </div>
              )}
              <span className="mt-2 text-xs font-hand text-[#A34063] font-bold text-center">
                100% GOTS Organic Cotton • Feather-Soft for Baby ♡
              </span>
            </div>

            {/* Right: Info & Size Selection */}
            <div className="sm:col-span-6 flex flex-col gap-3">
              <div>
                <span className="text-xs font-rounded font-bold uppercase tracking-wider text-[#A34063]">
                  {product.collectionName}
                </span>
                <h3 id="quick-view-title" className="font-serif text-2xl font-bold tracking-tight mt-0.5">
                  {product.name}
                </h3>
                <div className="font-serif text-xl font-bold text-[#A34063] mt-1">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans leading-relaxed opacity-90">
                {product.description}
              </p>

              {/* Fabric & safety notes */}
              <div className="p-2.5 rounded-xl bg-[#F7DDE5]/30 border border-[#EABAC8] text-xs flex flex-col gap-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#A34063]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Fabric: {product.fabric}</span>
                </div>
                <div className="opacity-80">
                  Palette: {product.colorTag}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-1.5">
                  Select Baby Size:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-rounded font-bold border-2 transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#A34063] text-white border-[#5C4033]'
                          : 'bg-white/80 border-[#EABAC8] hover:border-[#A34063]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Bag Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full py-3 px-5 rounded-full font-rounded font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation
                      ? 'bg-[#5E8255] border-2 border-[#3D5A35]'
                      : 'bg-[#A34063] hover:bg-[#852E4D] border-2 border-[#5C4033] active:scale-95'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Mimi’s Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag — ₹{product.price.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Zoom Modal */}
      {showFullZoom && product.realImageUrl && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowFullZoom(false)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-white rounded-3xl p-4 border-4 border-[#F5D88B] shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFullZoom(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 border border-[#5C4033] flex items-center justify-center text-[#5C4033] hover:bg-[#F7DDE5] cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="font-serif font-bold text-lg text-[#5C4033] mb-2">
              {product.name} — Full High-Res View
            </div>
            <div className="w-full max-h-[70vh] overflow-hidden rounded-2xl flex items-center justify-center bg-[#FFF8F1]">
              <img
                src={product.realImageUrl}
                alt={product.name}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="mt-3 flex items-center justify-between w-full px-2 text-xs font-rounded font-bold text-[#A34063]">
              <span>{product.collectionName} • 100% Organic Cotton</span>
              <span>₹{product.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
