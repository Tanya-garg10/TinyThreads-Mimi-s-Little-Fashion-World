import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar, AppPage } from './components/common/Navbar';
import { WelcomeBackBanner } from './components/common/WelcomeBackBanner';
import { HeroSection } from './components/hero/HeroSection';
import { MeetMimi } from './components/mimi/MeetMimi';
import { Footer } from './components/common/Footer';
import { ShoppingBagDrawer } from './components/cart/ShoppingBagDrawer';
import { EasterEggModal } from './components/easter-egg/EasterEggModal';
import { CursorSparkles } from './components/common/CursorSparkles';
import { FlashlightCursor } from './components/common/FlashlightCursor';
import { TalkToMimiWidget } from './components/chat/TalkToMimiWidget';
import { TinyChaosOverlay } from './components/chaos/TinyChaosOverlay';
import { LoginPage } from './components/auth/LoginPage';
import { Product, CartItem } from './types';
import { Check, Sparkles, ArrowLeft } from 'lucide-react';
import { audioManager } from './utils/audioManager';

// Lazy load heavy components for better performance
const OutfitBuilder = lazy(() => import('./components/outfit-builder/OutfitBuilder'));
const InteractiveStorybook = lazy(() => import('./components/storybook/InteractiveStorybook'));
const StoryJourney = lazy(() => import('./components/story/StoryJourney'));
const GuestbookSection = lazy(() => import('./components/guestbook/GuestbookSection'));
const AtelierSection = lazy(() => import('./components/atelier/AtelierSection'));
const CollectionsSection = lazy(() => import('./components/collections/CollectionsSection'));
const CustomerLove = lazy(() => import('./components/testimonials/CustomerLove'));
const NewsletterSection = lazy(() => import('./components/newsletter/NewsletterSection'));

function MainApp() {
  // Navigation Page View: 'home' | 'collections' | 'tailor' | 'storybook' | 'atelier' | 'guestbook' | 'login'
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const { user, isLoggedIn } = useAuth();

  // Theme state with localStorage persistence
  const [nightMode, setNightMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tinythreads_night_mode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Sound effects & mute state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tinythreads_sound_enabled');
      return saved ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Music playback state synced with audioManager
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(() => audioManager.isPlaying());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsMusicPlaying(playing);
    });
    return unsubscribe;
  }, []);

  // Tiny Chaos Mode (Side Quest 15)
  const [chaosMode, setChaosMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tinythreads_chaos_mode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Shopping bag state with 1 initial sample item for instant delight
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tinythreads_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        cartId: 'initial-cloud-onesie',
        productId: 'cloud-nine-onesie',
        name: 'Cloud Nine Onesie',
        price: 699,
        quantity: 1,
        size: '0-3M',
        collection: 'Cloud-Soft Everyday',
        illustrationType: 'onesie-cloud'
      }
    ];
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme
  useEffect(() => {
    try {
      localStorage.setItem('tinythreads_night_mode', JSON.stringify(nightMode));
    } catch {
      // ignore
    }
    if (nightMode) {
      document.documentElement.classList.add('night');
    } else {
      document.documentElement.classList.remove('night');
    }
  }, [nightMode]);

  // Sync sound settings
  useEffect(() => {
    try {
      localStorage.setItem('tinythreads_sound_enabled', JSON.stringify(soundEnabled));
    } catch {
      // ignore
    }
    audioManager.setMuted(!soundEnabled);
  }, [soundEnabled]);

  // Sync chaos mode
  useEffect(() => {
    try {
      localStorage.setItem('tinythreads_chaos_mode', JSON.stringify(chaosMode));
    } catch {
      // ignore
    }
  }, [chaosMode]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tinythreads_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Auto-start music on first user interaction if not already playing
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!audioManager.isPlaying()) {
        audioManager.startLullaby();
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string = '0-3M') => {
    audioManager.playClickSound();
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && item.size === size
    );

    if (existingIndex > -1) {
      const newItems = [...cartItems];
      newItems[existingIndex].quantity += 1;
      setCartItems(newItems);
    } else {
      const newItem: CartItem = {
        cartId: `${product.id}-${size}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size,
        collection: product.collectionName,
        illustrationType: product.illustrationType
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`Added ${product.name} to Mimi's Bag ♡`);
  };

  const handleAddCustomLook = (item: CartItem) => {
    audioManager.playClickSound();
    setCartItems([...cartItems, item]);
    showToast(`Added Custom Look to Mimi's Bag ♡`);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    audioManager.playClickSound();
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    audioManager.playClickSound();
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
    setDiscountPercent(15);
    showToast(`Secret Perk Applied: 15% discount on your order!`);
  };

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMusic = () => {
    audioManager.playClickSound();
    audioManager.toggleLullaby();
  };

  // Keyboard accessibility for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartDrawerOpen(false);
        setEasterEggOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#F7DDE5] selection:text-[#A34063] ${
        nightMode
          ? 'bg-[#1B1222] text-[#F3E8FF]'
          : 'bg-[#FFF8F1] text-[#5C4033]'
      } ${chaosMode ? 'chaos-active' : ''}`}
    >
      {/* Sparkle cursor trail (Side Quest 12) */}
      <CursorSparkles />

      {/* Flashlight cursor for night mode (Tier 2) */}
      <FlashlightCursor nightMode={nightMode} />

      {/* Responsive Chaos Mode Overlay (Side Quest 15) */}
      <TinyChaosOverlay
        active={chaosMode}
        onToggle={() => setChaosMode(false)}
        nightMode={nightMode}
      />

      {/* Top Announcement Bar */}
      <AnnouncementBar nightMode={nightMode} />

      {/* Mimi Remembers You Welcome Banner (Only when logged in) */}
      {isLoggedIn && <WelcomeBackBanner nightMode={nightMode} />}

      {/* Navigation Header with Top Music Button */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        nightMode={nightMode}
        onToggleNightMode={() => setNightMode(!nightMode)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onTriggerEasterEgg={() => setEasterEggOpen(true)}
        chaosMode={chaosMode}
        onToggleChaosMode={() => setChaosMode(!chaosMode)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Dedicated Page Back Link if not on Home and logged in */}
      {isLoggedIn && currentPage !== 'home' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-rounded font-bold text-[#A34063] hover:underline cursor-pointer p-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </button>
        </div>
      )}

      {/* Main Content Router */}
      {!isLoggedIn ? (
        /* FIRST GATE: SIGN UP / LOGIN (Google or 1-Click Demo) */
        <main>
          <LoginPage
            nightMode={nightMode}
            onNavigateHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        /* LOGGED IN: BOUTIQUE & ALL MULTI-PAGE VIEWS */
        <main>
          {/* PAGE 1: BOUTIQUE (Main Landing Page) */}
          {currentPage === 'home' && (
            <>
              <HeroSection
                nightMode={nightMode}
                onExploreCollections={() => handleNavigate('collections')}
                onMeetMimi={() => handleNavigate('storybook')}
                onTriggerEasterEgg={() => setEasterEggOpen(true)}
              />

              <MeetMimi
                nightMode={nightMode}
                onOpenTailorStudio={() => handleNavigate('tailor')}
              />

              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading collections...</div>}>
                <CollectionsSection
                  nightMode={nightMode}
                  onAddToCart={handleAddToCart}
                />
              </Suspense>

              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading tailor studio...</div>}>
                <OutfitBuilder
                  nightMode={nightMode}
                  onAddCustomLookToCart={handleAddCustomLook}
                />
              </Suspense>

              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading atelier...</div>}>
                <AtelierSection nightMode={nightMode} />
              </Suspense>

              {/* Interactive Storybook Highlight */}
              <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-rounded font-bold uppercase tracking-wider text-[#A34063]">
                    Interactive Storybook Feature
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1 mb-2">
                    Mimi and the Little Cloud
                  </h2>
                  <p className="text-sm opacity-85">
                    A gentle bedtime picture book with touch and keyboard page-turning.
                  </p>
                </div>
                <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading storybook...</div>}>
                  <InteractiveStorybook nightMode={nightMode} />
                </Suspense>
              </section>

              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading story journey...</div>}>
                <StoryJourney nightMode={nightMode} />
              </Suspense>

              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading guestbook...</div>}>
                <GuestbookSection nightMode={nightMode} />
              </Suspense>

              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading testimonials...</div>}>
                <CustomerLove nightMode={nightMode} />
              </Suspense>

              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading newsletter...</div>}>
                <NewsletterSection nightMode={nightMode} />
              </Suspense>
            </>
          )}

          {/* PAGE 2: DEDICATED COLLECTIONS PAGE */}
          {currentPage === 'collections' && (
            <div className="pt-4">
              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading collections...</div>}>
                <CollectionsSection
                  nightMode={nightMode}
                  onAddToCart={handleAddToCart}
                />
              </Suspense>
            </div>
          )}

          {/* PAGE 3: DEDICATED TINY TAILOR STUDIO PAGE */}
          {currentPage === 'tailor' && (
            <div className="pt-4">
              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading tailor studio...</div>}>
                <OutfitBuilder
                  nightMode={nightMode}
                  onAddCustomLookToCart={handleAddCustomLook}
                />
              </Suspense>
            </div>
          )}

          {/* PAGE 4: DEDICATED STORYBOOK & SCROLL STORY PAGE */}
          {currentPage === 'storybook' && (
            <div className="pt-4 space-y-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading storybook...</div>}>
                  <InteractiveStorybook nightMode={nightMode} />
                </Suspense>
              </div>
              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading story journey...</div>}>
                <StoryJourney nightMode={nightMode} />
              </Suspense>
            </div>
          )}

          {/* PAGE 5: DEDICATED ATELIER PAGE */}
          {currentPage === 'atelier' && (
            <div className="pt-4">
              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading atelier...</div>}>
                <AtelierSection nightMode={nightMode} />
              </Suspense>
              <MeetMimi
                nightMode={nightMode}
                onOpenTailorStudio={() => handleNavigate('tailor')}
              />
            </div>
          )}

          {/* PAGE 6: DEDICATED GUESTBOOK PAGE */}
          {currentPage === 'guestbook' && (
            <div className="pt-4">
              <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading guestbook...</div>}>
                <GuestbookSection nightMode={nightMode} />
              </Suspense>
            </div>
          )}

          {/* PAGE 7: DEDICATED LOGIN / PASSPORT PAGE */}
          {currentPage === 'login' && (
            <LoginPage
              nightMode={nightMode}
              onNavigateHome={() => handleNavigate('home')}
            />
          )}
        </main>
      )}

      {/* Talk to Mimi Rule-Based Chat Widget (Tier 3 Requirement 9) */}
      <TalkToMimiWidget
        nightMode={nightMode}
        onNavigateToTab={(tab) => handleNavigate(tab as AppPage)}
      />

      {/* Footer & Early-Web Nostalgia */}
      <Footer
        nightMode={nightMode}
        onTriggerEasterEgg={() => setEasterEggOpen(true)}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <ShoppingBagDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        nightMode={nightMode}
        promoCode={promoCode}
        discountPercent={discountPercent}
      />

      {/* Secret Sewing Box Easter Egg Modal */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
        nightMode={nightMode}
        onApplySecretPromo={handleApplyPromo}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#A34063] text-white px-5 py-3 rounded-full font-rounded font-bold text-xs sm:text-sm shadow-xl border-2 border-[#5C4033] flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-[#F5D88B]" />
          <span>{toastMessage}</span>
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
