import React, { useState } from 'react';
import { Sparkles, Eye, ShoppingBag, Heart, Check, Maximize2, X, SlidersHorizontal } from 'lucide-react';
import { COLLECTIONS_DATA, PRODUCTS_DATA } from '../../data/fashionData';
import { Product, CollectionCategory } from '../../types';
import { ProductIllustration } from '../character/MimiIllustrations';
import { ProductQuickViewModal } from './ProductQuickViewModal';

interface CollectionsSectionProps {
  nightMode: boolean;
  onAddToCart: (product: Product, size?: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  nightMode,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<CollectionCategory>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [mediaMode, setMediaMode] = useState<'photo' | 'sketch'>('photo');
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain'); // 'contain' ensures full visibility ("puri photo visible")
  const [fullscreenImage, setFullscreenImage] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    if (activeTab === 'all') return true;
    return p.collectionId === activeTab;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0] || '0-3M');
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <section id="collections" className="py-16 md:py-24 relative overflow-hidden">
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
            <span>The Little Collections</span>
          </div>
          
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              nightMode ? 'text-[#F3E8FF]' : 'text-[#5C4033]'
            }`}
          >
            Stitched with Cloud-Soft Dreams
          </h2>
          
          <p className="text-base sm:text-lg font-sans opacity-90 max-w-xl mx-auto leading-relaxed">
            Every piece is crafted from hypoallergenic GOTS-certified organic cotton yarns, flat-locked seams, and pinch-proof trims.
          </p>
        </div>

        {/* Collection Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full font-rounded text-sm font-bold transition-all duration-200 cursor-pointer border-2 ${
              activeTab === 'all'
                ? 'bg-[#A34063] text-white border-[#5C4033] shadow-sm'
                : nightMode
                ? 'bg-[#281B34] border-[#432A57] text-[#D8C7E8] hover:border-[#A34063]'
                : 'bg-[#FFF8F1] border-[#EABAC8] text-[#5C4033] hover:border-[#A34063]'
            }`}
          >
            All Outfits (9)
          </button>

          {COLLECTIONS_DATA.map((col) => {
            const isActive = activeTab === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setActiveTab(col.id as CollectionCategory)}
                className={`px-5 py-2 rounded-full font-rounded text-sm font-bold transition-all duration-200 cursor-pointer border-2 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#A34063] text-white border-[#5C4033] shadow-sm'
                    : nightMode
                    ? 'bg-[#281B34] border-[#432A57] text-[#D8C7E8] hover:border-[#A34063]'
                    : 'bg-[#FFF8F1] border-[#EABAC8] text-[#5C4033] hover:border-[#A34063]'
                }`}
              >
                <span>{col.title}</span>
              </button>
            );
          })}
        </div>

        {/* Media & Fit Mode Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {/* Photo vs Sketch switch */}
          <div className="p-1 rounded-full bg-[#F7DDE5]/40 border border-[#EABAC8] flex items-center gap-1 text-xs font-rounded font-bold">
            <button
              type="button"
              onClick={() => setMediaMode('photo')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                mediaMode === 'photo'
                  ? 'bg-[#A34063] text-white shadow-xs'
                  : 'text-[#5C4033] dark:text-[#D8C7E8] hover:bg-white/40'
              }`}
            >
              📸 Real Baby Lookbook
            </button>
            <button
              type="button"
              onClick={() => setMediaMode('sketch')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                mediaMode === 'sketch'
                  ? 'bg-[#A34063] text-white shadow-xs'
                  : 'text-[#5C4033] dark:text-[#D8C7E8] hover:bg-white/40'
              }`}
            >
              🎨 Mimi's Sketches
            </button>
          </div>

          {/* Picture visibility Fit Mode toggle (Full Fit vs Fill Cover) */}
          {mediaMode === 'photo' && (
            <div className="p-1 rounded-full bg-white/70 dark:bg-[#281B34] border border-[#EABAC8] flex items-center gap-1 text-xs font-rounded font-bold">
              <span className="text-[10px] text-stone-500 px-2 font-mono hidden sm:inline">Photo View:</span>
              <button
                type="button"
                onClick={() => setFitMode('contain')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  fitMode === 'contain'
                    ? 'bg-[#F5D88B] text-[#5C4033] font-bold shadow-xs'
                    : 'text-[#5C4033] dark:text-[#D8C7E8] hover:bg-[#F7DDE5]/50'
                }`}
                title="Puri picture visible bina kisi cut ke"
              >
                <span>🔍 Full Picture (Puri Visible)</span>
              </button>
              <button
                type="button"
                onClick={() => setFitMode('cover')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  fitMode === 'cover'
                    ? 'bg-[#F5D88B] text-[#5C4033] font-bold shadow-xs'
                    : 'text-[#5C4033] dark:text-[#D8C7E8] hover:bg-[#F7DDE5]/50'
                }`}
              >
                <span>🖼️ Fill Card</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = recentlyAddedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className={`group rounded-3xl border-2 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative ${
                  nightMode
                    ? 'bg-[#281B34] border-[#432A57] hover:border-[#A34063] shadow-md hover:shadow-xl hover:shadow-[#A34063]/10'
                    : 'bg-white border-[#F7DDE5] hover:border-[#A34063] shadow-sm hover:shadow-xl hover:shadow-[#A34063]/10'
                }`}
              >
                {/* Badge if available */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-[#F5D88B] border border-[#5C4033] text-[#5C4033] px-2.5 py-0.5 rounded-full text-[10px] font-rounded font-bold shadow-xs">
                    {product.badge}
                  </div>
                )}

                {/* Card Action Controls (Quick View & Fullscreen Zoom) */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                  {mediaMode === 'photo' && product.realImageUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenImage(product);
                      }}
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-[#EABAC8] flex items-center justify-center text-[#5C4033] shadow-xs hover:scale-110 transition-transform cursor-pointer"
                      title="View Full Picture (Pura Photo Dekhein)"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#A34063]" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-[#EABAC8] flex items-center justify-center text-[#5C4033] shadow-xs hover:scale-110 transition-transform cursor-pointer"
                    title="Quick View Details"
                  >
                    <Eye className="w-4 h-4 text-[#A34063]" />
                  </button>
                </div>

                {/* Product Image / Illustration Container - Spacious & Uncropped */}
                <div className="w-full h-64 sm:h-72 rounded-2xl bg-[#FFF8F1] border-2 border-[#F7DDE5] flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all p-2">
                  {mediaMode === 'photo' && product.realImageUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={product.realImageUrl}
                        alt={`${product.name} worn by adorable baby`}
                        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                          fitMode === 'contain'
                            ? 'object-contain rounded-xl p-1 drop-shadow-sm'
                            : 'object-cover rounded-xl'
                        }`}
                        loading="lazy"
                      />
                      {/* Mimi's sketch watermark badge in bottom corner */}
                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs rounded-xl p-1 border border-[#EABAC8] shadow-xs flex items-center gap-1 pointer-events-none">
                        <ProductIllustration type={product.illustrationType} className="w-6 h-6" />
                        <span className="text-[9px] font-hand font-bold text-[#A34063] pr-1">Mimi Sketch</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-2 border border-dashed border-[#A34063]/20 rounded-xl pointer-events-none" />
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        <ProductIllustration type={product.illustrationType} className="w-36 h-36 drop-shadow-sm" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-[#A34063] font-rounded font-bold">
                    <span>{product.collectionName}</span>
                    <span className="text-[11px] font-mono text-[#5C4033] dark:text-[#D8C7E8] font-normal">
                      {product.sizes[0]} - {product.sizes[product.sizes.length - 1]}
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-lg sm:text-xl font-bold mt-1 tracking-tight transition-colors group-hover:text-[#A34063] ${
                      nightMode ? 'text-[#F3E8FF]' : 'text-[#5C4033]'
                    }`}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs font-sans text-stone-500 dark:text-stone-300 line-clamp-2 mt-1 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-dashed border-[#EABAC8]/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-rounded text-stone-400 block font-semibold">
                        Price
                      </span>
                      <span className="font-serif text-lg font-bold text-[#A34063]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`px-4 py-2 rounded-full font-rounded font-bold text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        isJustAdded
                          ? 'bg-[#5E8255] text-white border border-[#3D5A35]'
                          : 'bg-[#F7DDE5] hover:bg-[#A34063] text-[#A34063] hover:text-white border border-[#EABAC8] hover:border-[#5C4033]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {fullscreenImage && fullscreenImage.realImageUrl && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[92vh] bg-white rounded-3xl p-5 border-4 border-[#F5D88B] shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 border border-[#5C4033] flex items-center justify-center text-[#5C4033] hover:bg-[#F7DDE5] cursor-pointer shadow-md z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-3">
              <span className="text-xs font-rounded font-bold text-[#A34063] uppercase tracking-wider block">
                {fullscreenImage.collectionName}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#5C4033]">
                {fullscreenImage.name}
              </h3>
            </div>
            
            {/* Full Image Container */}
            <div className="w-full max-h-[65vh] overflow-hidden rounded-2xl flex items-center justify-center bg-[#FFF8F1] border-2 border-[#EABAC8] p-3 shadow-inner">
              <img
                src={fullscreenImage.realImageUrl}
                alt={fullscreenImage.name}
                className="max-h-[60vh] w-auto object-contain rounded-xl drop-shadow-md"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between w-full px-2 gap-3">
              <div className="text-xs font-sans text-stone-600">
                <span className="font-bold text-[#A34063]">Fabric:</span> {fullscreenImage.fabric}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl font-bold text-[#A34063]">
                  ₹{fullscreenImage.price.toLocaleString('en-IN')}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    handleQuickAdd(fullscreenImage, e);
                    setFullscreenImage(null);
                  }}
                  className="px-4 py-2 bg-[#A34063] hover:bg-[#852E4D] text-white rounded-full text-xs font-rounded font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
        nightMode={nightMode}
      />
    </section>
  );
};
