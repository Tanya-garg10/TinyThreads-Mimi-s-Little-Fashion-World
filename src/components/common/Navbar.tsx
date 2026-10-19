import React, { useState, useEffect } from 'react';
import { ShoppingBag, Moon, Sun, Menu, X, Sparkles, User, Zap, Music, Volume2, VolumeX, LogOut, Gamepad2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { audioManager } from '../../utils/audioManager';

export type AppPage = 'home' | 'collections' | 'tailor' | 'storybook' | 'atelier' | 'guestbook' | 'login';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  nightMode: boolean;
  onToggleNightMode: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onTriggerEasterEgg?: () => void;
  chaosMode: boolean;
  onToggleChaosMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenGame?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  nightMode,
  onToggleNightMode,
  cartCount,
  onOpenCart,
  onTriggerEasterEgg,
  chaosMode,
  onToggleChaosMode,
  soundEnabled,
  onToggleSound,
  isMusicPlaying,
  onToggleMusic,
  onOpenGame
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: AppPage; badge?: string }[] = [
    { label: 'Boutique', page: 'home' },
    { label: 'Collections', page: 'collections' },
    { label: 'Tiny Tailor', page: 'tailor' },
    { label: 'Storybook', page: 'storybook', badge: 'New ♡' },
    { label: 'Atelier', page: 'atelier' },
    { label: 'Guestbook', page: 'guestbook' },
  ];

  const handleNavClick = (page: AppPage) => {
    audioManager.playClickSound();
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoutClick = () => {
    audioManager.playClickSound();
    logout();
    onNavigate('login');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? nightMode
            ? 'bg-[#1B1222]/95 backdrop-blur-md shadow-md border-b border-[#382548]'
            : 'bg-[#FFF8F1]/95 backdrop-blur-md shadow-sm border-b border-[#F7DDE5]'
          : nightMode
          ? 'bg-[#1B1222] border-b border-transparent'
          : 'bg-[#FFF8F1] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Left: Custom TinyThreads Wordmark with bunny ear mark */}
        <button
          type="button"
          onClick={() => handleNavClick(isLoggedIn ? 'home' : 'login')}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A34063] rounded-xl p-1 text-left cursor-pointer"
          aria-label="TinyThreads Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F7DDE5] border-2 border-[#A34063] flex items-center justify-center relative shadow-sm group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
              <ellipse cx="14" cy="11" rx="3.5" ry="8" fill="#FFF8F1" stroke="#A34063" strokeWidth="1.8" />
              <ellipse cx="14" cy="11" rx="1.8" ry="5" fill="#F7DDE5" />
              <ellipse cx="26" cy="11" rx="3.5" ry="8" fill="#FFF8F1" stroke="#A34063" strokeWidth="1.8" />
              <ellipse cx="26" cy="11" rx="1.8" ry="5" fill="#F7DDE5" />
              <circle cx="20" cy="25" r="10" fill="#FFF8F1" stroke="#A34063" strokeWidth="1.8" />
              <path
                d="M20 22 C18 19, 14 20, 15 24 C16 28, 20 30, 20 30 C20 30, 24 28, 25 24 C26 20, 22 19, 20 22 Z"
                fill="#F5D88B"
                stroke="#5C4033"
                strokeWidth="1.2"
              />
            </svg>
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (onTriggerEasterEgg) onTriggerEasterEgg();
              }}
              title="Mimi's Secret Stitch"
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F5D88B] border border-[#5C4033] rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              ★
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                nightMode ? 'text-[#F3E8FF]' : 'text-[#5C4033]'
              }`}
            >
              TinyThreads
            </span>
            <span className="font-hand text-xs text-[#A34063] font-bold -mt-1 tracking-wide">
              Mimi's Little Fashion World
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links (Only shown when logged in) */}
        {isLoggedIn && (
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => handleNavClick(link.page)}
                className={`font-rounded text-sm xl:text-base font-semibold tracking-wide transition-all duration-200 relative py-1 hover:text-[#A34063] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A34063] rounded-lg flex items-center gap-1.5 ${
                  currentPage === link.page
                    ? 'text-[#A34063] font-bold'
                    : nightMode
                    ? 'text-[#D8C7E8]'
                    : 'text-[#5C4033]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-hand font-bold px-1.5 py-0.2 rounded-full bg-[#F5D88B] text-[#5C4033] border border-[#5C4033]">
                    {link.badge}
                  </span>
                )}
                {currentPage === link.page && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#A34063] rounded-full" />
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Right side: Music Button (PRIMARY NAVBAR FEATURE!) + Theme + User + Shopping Bag */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* MIMI'S LULLABY MUSIC BUTTON (Right in Navbar as requested!) */}
          <button
            type="button"
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Click to Pause Mimi’s Lullaby' : 'Click to Play Mimi’s Lullaby Music Box 🎵'}
            aria-label={isMusicPlaying ? 'Pause Mimi’s Lullaby' : 'Play Mimi’s Lullaby'}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border-2 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-rounded font-bold shadow-xs active:scale-95 ${
              isMusicPlaying
                ? 'bg-[#F7DDE5] border-[#A34063] text-[#A34063] ring-2 ring-[#A34063]/30 animate-pulse'
                : 'bg-white/90 dark:bg-black/30 border-current opacity-85 hover:opacity-100 hover:bg-[#F7DDE5]/40'
            }`}
          >
            <Music className={`w-4 h-4 text-[#A34063] ${isMusicPlaying ? 'animate-bounce' : ''}`} />
            <span className="hidden xs:inline">
              {isMusicPlaying ? 'Music: Playing ♪' : 'Music: Play 🎵'}
            </span>
          </button>

          {/* Sound FX Toggle (Clicks/Pops) */}
          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'UI Sounds On' : 'UI Sounds Muted'}
            aria-label={soundEnabled ? 'Mute UI sounds' : 'Enable UI sounds'}
            className={`p-2 rounded-xl border transition-all cursor-pointer hidden md:flex ${
              soundEnabled
                ? 'bg-[#DCE8D7] border-[#BED5B6] text-[#2F4729]'
                : 'bg-white/60 dark:bg-black/20 border-current opacity-70'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mini-Game Button */}
          {onOpenGame && (
            <button
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onOpenGame();
              }}
              title="Play Catch the Dreams Game"
              aria-label="Play Catch the Dreams Game"
              className="p-2 rounded-xl border-2 border-[#A34063] bg-[#F7DDE5] text-[#A34063] transition-all cursor-pointer hover:bg-[#EABAC8] hover:scale-105"
            >
              <Gamepad2 className="w-4 h-4" />
            </button>
          )}

          {/* Day / Night Theme Toggle */}
          <button
            onClick={() => {
              audioManager.playClickSound();
              onToggleNightMode();
            }}
            type="button"
            aria-label={nightMode ? 'Switch to sunny daytime mode' : 'Switch to cozy bedtime night mode'}
            className={`p-2 sm:p-2.5 rounded-full border-2 transition-all cursor-pointer ${
              nightMode
                ? 'bg-[#2D1A3B] border-[#7B2846] text-[#F5D88B]'
                : 'bg-[#FFF8F1] border-[#F7DDE5] text-[#A34063]'
            }`}
          >
            {nightMode ? <Sun className="w-4 h-4 text-[#F5D88B]" /> : <Moon className="w-4 h-4 text-[#A34063]" />}
          </button>

          {/* User Account / Profile + Logout Button */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-1 p-1 rounded-full border-2 border-[#BED5B6] bg-[#DCE8D7]/60">
              <button
                type="button"
                onClick={() => handleNavClick('login')}
                title={`Signed in as ${user.displayName} (click for Passport)`}
                className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-rounded font-bold text-[#2F4729] hover:underline cursor-pointer"
              >
                <span className="text-sm">
                  {user.role === 'caregiver' ? '🧸' : user.role === 'tailor' ? '✂️' : '🌟'}
                </span>
                <span className="hidden sm:inline max-w-[110px] truncate">
                  {user.displayName.split(' ')[0]}
                </span>
              </button>

              <button
                type="button"
                onClick={handleLogoutClick}
                title="Sign Out"
                className="p-1 rounded-full text-[#A34063] hover:bg-black/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleNavClick('login')}
              className="py-1.5 px-3 rounded-full border-2 border-[#A34063] bg-[#F7DDE5] text-[#A34063] text-xs font-rounded font-bold flex items-center gap-1 hover:bg-[#A34063] hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Shopping Bag Drawer Button (Only when logged in) */}
          {isLoggedIn && (
            <button
              onClick={() => {
                audioManager.playClickSound();
                onOpenCart();
              }}
              type="button"
              aria-label={`Open shopping bag, ${cartCount} items`}
              className={`relative p-2 sm:px-3 sm:py-2 rounded-full border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                nightMode
                  ? 'bg-[#A34063] border-[#F7DDE5] text-white hover:bg-[#7B2846]'
                  : 'bg-[#A34063] border-[#5C4033] text-white hover:bg-[#7B2846]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline font-rounded text-xs font-bold">Bag</span>
              <span
                className={`inline-flex items-center justify-center min-w-[18px] h-4.5 px-1 text-[11px] font-bold rounded-full ${
                  cartCount > 0
                    ? 'bg-[#F5D88B] text-[#5C4033]'
                    : 'bg-white/30 text-white'
                }`}
              >
                {cartCount}
              </span>
            </button>
          )}

          {/* Mobile Menu Button */}
          {isLoggedIn && (
            <button
              onClick={() => {
                audioManager.playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`lg:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
                nightMode
                  ? 'bg-[#281B34] border-[#432A57] text-[#F3E8FF]'
                  : 'bg-white border-[#F7DDE5] text-[#5C4033]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && isLoggedIn && (
        <div
          className={`lg:hidden border-b transition-all duration-300 px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-4 ${
            nightMode
              ? 'bg-[#1B1222]/98 border-[#382548] text-[#F3E8FF]'
              : 'bg-[#FFF8F1]/98 border-[#F7DDE5] text-[#5C4033]'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-left py-2.5 px-4 rounded-xl font-rounded font-semibold text-base transition-colors flex items-center justify-between cursor-pointer ${
                  currentPage === link.page
                    ? 'bg-[#A34063] text-white'
                    : 'hover:bg-[#F7DDE5]/30'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-xs font-hand font-bold px-2 py-0.5 rounded-full bg-[#F5D88B] text-[#5C4033]">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Mobile Music Box button */}
            <button
              type="button"
              onClick={() => {
                onToggleMusic();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 rounded-xl font-rounded text-sm bg-[#F7DDE5]/40 text-[#A34063] font-bold flex items-center justify-between cursor-pointer"
            >
              <span>Mimi’s Lullaby Music Box 🎵</span>
              <span>{isMusicPlaying ? 'Playing ♪ (Tap to Pause)' : 'Play Music'}</span>
            </button>

            {/* Mobile Chaos Mode button */}
            <button
              type="button"
              onClick={() => {
                onToggleChaosMode();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 rounded-xl font-mono text-sm bg-yellow-300/40 text-[#5C4033] flex items-center justify-between cursor-pointer"
            >
              <span>Tiny Chaos Mode ⚡</span>
              <span>{chaosMode ? 'Active' : 'Off'}</span>
            </button>

            {/* Mobile Logout option */}
            <button
              type="button"
              onClick={() => {
                handleLogoutClick();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 rounded-xl font-rounded text-sm bg-red-100/50 text-red-800 font-bold flex items-center justify-between cursor-pointer"
            >
              <span>Sign Out ({user?.displayName})</span>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
