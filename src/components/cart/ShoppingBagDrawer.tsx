import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Check, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../../types';
import { ProductIllustration } from '../character/MimiIllustrations';
import { OutfitPreviewSvg } from '../outfit-builder/OutfitPreviewSvg';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  nightMode: boolean;
  promoCode?: string;
  discountPercent?: number;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  nightMode,
  promoCode,
  discountPercent = 0
}) => {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 1200;
  const progressToFreeShipping = Math.min(100, Math.round((finalTotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const handleConfirmDemoOrder = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#A34063', '#F5D88B', '#F7DDE5', '#DCE8D7']
      });
    } catch {
      // safe fallback
    }
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
      setOrderPlaced(false);
      setCheckoutModalOpen(false);
      onClose();
    }, 2800);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end transition-opacity duration-300"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Mimi's Shopping Bag"
      >
        <div
          className={`w-full max-w-md h-full flex flex-col justify-between shadow-2xl transition-transform duration-300 relative ${
            nightMode
              ? 'bg-[#1F1426] text-[#F3E8FF] border-l border-[#3E254F]'
              : 'bg-[#FFF8F1] text-[#5C4033] border-l border-[#F7DDE5]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-dashed border-[#A34063]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#F7DDE5] border border-[#A34063] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#A34063]" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold tracking-tight">Mimi's Tiny Bag</h3>
                <span className="text-xs font-hand text-[#A34063] font-bold">
                  {items.length} {items.length === 1 ? 'outfit selected' : 'outfits selected'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close bag drawer"
              className="p-2 rounded-full border border-current hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A34063]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Bedtime Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#F7DDE5]/30 border-b border-[#EABAC8]/40 text-xs">
            {finalTotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-1.5 text-[#5E8255] font-rounded font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Hooray! You’ve unlocked Free Bedtime Shipping! ☁️</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-rounded font-semibold text-[11px]">
                  <span>Add ₹{(freeShippingThreshold - finalTotal).toLocaleString('en-IN')} for Free Shipping</span>
                  <span>{progressToFreeShipping}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white border border-[#EABAC8] overflow-hidden">
                  <div
                    className="h-full bg-[#A34063] rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List / Empty State */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-24 h-24 rounded-full bg-[#F7DDE5] border-2 border-dashed border-[#A34063] flex items-center justify-center text-4xl">
                  🧺
                </div>
                <h4 className="font-serif text-xl font-bold">Your Tiny Bag is empty</h4>
                <p className="text-xs font-sans max-w-xs opacity-80 leading-relaxed">
                  Mimi’s sewing table is brimming with soft fabrics. Choose an outfit from the collection or create a look in Tiny Tailor!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#A34063] text-white text-xs font-rounded font-bold shadow-xs hover:bg-[#852E4D] cursor-pointer"
                >
                  Explore Outfits ♡
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 flex gap-3.5 items-center relative transition-colors ${
                    nightMode
                      ? 'bg-[#291B33] border-[#432A57]'
                      : 'bg-white border-[#F7DDE5]'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-xl bg-[#FFF8F1] border border-[#EABAC8] flex-shrink-0 flex items-center justify-center p-1 relative overflow-hidden">
                    {item.customDetails ? (
                      <OutfitPreviewSvg
                        base={item.customDetails.baseOutfit}
                        color={item.customDetails.color}
                        accessory={item.customDetails.accessory}
                        className="w-16 h-16 scale-90"
                      />
                    ) : (
                      <ProductIllustration
                        type={item.illustrationType || 'onesie-cloud'}
                        className="w-14 h-14"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-sm sm:text-base truncate">
                      {item.name}
                    </h5>
                    {item.size && (
                      <span className="text-[11px] font-mono text-stone-500 block">
                        Size: {item.size}
                      </span>
                    )}
                    {item.customDetails && (
                      <span className="text-[10px] font-hand text-[#A34063] font-bold block truncate">
                        Custom: {item.customDetails.color} • {item.customDetails.accessory.replace('_', ' ')}
                      </span>
                    )}
                    <span className="font-serif font-bold text-sm text-[#A34063]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.cartId)}
                      aria-label="Remove item from bag"
                      className="text-stone-400 hover:text-[#A34063] transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#FFF8F1] border border-[#EABAC8] rounded-full px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        aria-label="Decrease quantity"
                        className="text-stone-600 hover:text-black font-bold text-xs"
                      >
                        <Minus className="w-3 h-3 text-[#5C4033]" />
                      </button>
                      <span className="text-xs font-mono font-bold w-4 text-center text-[#5C4033]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        aria-label="Increase quantity"
                        className="text-stone-600 hover:text-black font-bold text-xs"
                      >
                        <Plus className="w-3 h-3 text-[#5C4033]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-dashed border-[#A34063]/30 bg-white/20 flex flex-col gap-3">
              {/* Promo Code Applied tag if any */}
              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-xs font-rounded font-bold text-[#A34063] bg-[#F7DDE5] px-3 py-1.5 rounded-xl border border-[#EABAC8]">
                  <span>Promo Code applied: {promoCode}</span>
                  <span>-{discountPercent}% (₹{discountAmount.toLocaleString('en-IN')})</span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs opacity-80">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono">₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-xs text-[#A34063] font-bold">
                  <span>Secret Box Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                <span className="font-serif">Estimated Total</span>
                <span className="font-serif text-xl sm:text-2xl text-[#A34063]">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-[#A34063] hover:bg-[#852E4D] text-white font-rounded font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#5C4033] active:scale-95"
              >
                <span>Proceed to Demo Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-[10px] text-center opacity-70">
                Demo Prototype: No real currency or payment details will be requested.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Demo Checkout Modal */}
      {checkoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => !orderPlaced && setCheckoutModalOpen(false)}
        >
          <div
            className={`relative w-full max-w-md rounded-3xl border-3 shadow-2xl p-6 sm:p-8 text-center transition-all ${
              nightMode
                ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
                : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {orderPlaced ? (
              <div className="py-6 flex flex-col items-center space-y-4 animate-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-[#DCE8D7] border-2 border-[#5E8255] flex items-center justify-center text-3xl">
                  🌸
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Hooray! Mimi’s Parcel is Packaged!
                </h3>
                <p className="text-sm font-sans max-w-xs leading-relaxed opacity-90">
                  Thank you for playing with Mimi’s Little Fashion World! In a real boutique, your baby’s outfits would be hand-tied in pink gingham twine.
                </p>
                <div className="p-3 rounded-xl bg-white/70 border border-[#A34063] text-xs font-mono text-[#A34063]">
                  Order #MIMI-TINY-{(Math.random() * 9000 + 1000).toFixed(0)} ♡
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F7DDE5] border-2 border-[#A34063] mx-auto flex items-center justify-center">
                  <Heart className="w-7 h-7 text-[#A34063] fill-[#A34063]" />
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Mimi’s Demo Checkout
                </h3>
                <p className="text-xs font-sans leading-relaxed opacity-90">
                  This is a preview of your boutique order for Mimi’s Little Fashion World. Your total comes to{' '}
                  <strong className="text-[#A34063]">₹{finalTotal.toLocaleString('en-IN')}</strong> with complimentary bedtime gift packaging.
                </p>

                <div className="p-4 rounded-2xl bg-white/60 border border-[#EABAC8] text-left text-xs space-y-1.5 font-sans">
                  <div className="flex justify-between">
                    <span className="font-semibold">Recipient:</span>
                    <span>Baby Dreamer Nursery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Packaging:</span>
                    <span>Chamomile-washed cotton tote & ribbon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Items:</span>
                    <span>{items.reduce((s, i) => s + i.quantity, 0)} baby garments</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="flex-1 py-3 rounded-full border border-current text-xs font-rounded font-bold hover:bg-black/5 cursor-pointer"
                  >
                    Back to Bag
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDemoOrder}
                    className="flex-1 py-3 rounded-full bg-[#A34063] text-white text-xs font-rounded font-bold border-2 border-[#5C4033] hover:bg-[#852E4D] shadow-md cursor-pointer"
                  >
                    Confirm Demo Order ♡
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
