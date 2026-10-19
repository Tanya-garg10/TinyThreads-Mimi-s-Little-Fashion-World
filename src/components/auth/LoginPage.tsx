import React, { useState } from 'react';
import { Sparkles, Heart, ShieldCheck, LogIn, LogOut, User, Check, ArrowRight, X, Music, Key, Settings, AlertCircle, Database } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { audioManager } from '../../utils/audioManager';
import { MimiCharacter } from '../character/MimiIllustrations';
import { FirebaseConfigObject } from '../../services/firebase';

interface LoginPageProps {
  nightMode: boolean;
  onNavigateHome: () => void;
  onNavigateToTailor?: () => void;
  onGuestContinue?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  nightMode,
  onNavigateHome,
}) => {
  const {
    user,
    loginWithDemo,
    loginWithGoogle,
    logout,
    isLoggedIn,
    isFirebaseReady,
    storedFirebaseConfig,
    updateFirebaseConfig,
    resetFirebaseConfig,
    authError,
    clearAuthError
  } = useAuth();

  const [googleLoading, setGoogleLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('gargtanya290@gmail.com');
  const [customGoogleName, setCustomGoogleName] = useState('Tanya Garg');

  // Firebase Config Form State
  const [apiKey, setApiKey] = useState(storedFirebaseConfig?.apiKey || '');
  const [authDomain, setAuthDomain] = useState(storedFirebaseConfig?.authDomain || '');
  const [projectId, setProjectId] = useState(storedFirebaseConfig?.projectId || '');
  const [appId, setAppId] = useState(storedFirebaseConfig?.appId || '');
  const [savedConfigMsg, setSavedConfigMsg] = useState(false);

  // Handle Demo Login: log in, trigger music automatically, and enter boutique
  const handleDemoLogin = (role: 'caregiver' | 'dreamer' | 'tailor') => {
    loginWithDemo(role);
    audioManager.startLullaby();
    onNavigateHome();
  };

  // 1-Click Direct Google Login via Firebase or graceful fallback
  const handleDirectGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle('Tanya Garg', 'gargtanya290@gmail.com');
      audioManager.startLullaby();
      onNavigateHome();
    } catch (err) {
      console.error(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Custom Google Account Modal Submit
  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleLoading(true);
    try {
      await loginWithGoogle(customGoogleName, customGoogleEmail);
      setShowGoogleModal(false);
      audioManager.startLullaby();
      onNavigateHome();
    } catch (err) {
      console.error(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Save user's custom Firebase credentials
  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const config: FirebaseConfigObject = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim(),
      appId: appId.trim()
    };
    updateFirebaseConfig(config);
    setSavedConfigMsg(true);
    setTimeout(() => {
      setSavedConfigMsg(false);
      setShowConfigModal(false);
    }, 1000);
  };

  return (
    <div className="py-8 md:py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mimi Welcome Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-rounded font-bold tracking-wider uppercase mb-3 border shadow-xs ${
            nightMode
              ? 'bg-[#2E1D3D] text-[#F5D88B] border-[#5E3B7A]'
              : 'bg-[#F7DDE5] text-[#A34063] border-[#EABAC8]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A34063]" />
          <span>Mimi’s Dreamer Portal • Sign In Gate</span>
        </div>

        <h1
          className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 ${
            nightMode ? 'text-[#FFF8F1]' : 'text-[#5C4033]'
          }`}
        >
          {isLoggedIn ? 'Welcome Back to Mimi’s World ♡' : 'Welcome to TinyThreads'}
        </h1>

        <p
          className={`font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed ${
            nightMode ? 'text-[#D8C7E8]' : 'text-[#6D4C3D]'
          }`}
        >
          {isLoggedIn
            ? 'Your little nursery outfits and custom tailored sketches are ready for you.'
            : 'Please sign in with Google (Firebase Auth) or pick a Demo Account below to step inside Mimi’s boutique.'}
        </p>

        {/* Firebase Credentials Quick Status Badge */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5D88B]/30 border border-[#5C4033]/20 text-[11px] font-rounded font-bold text-[#5C4033] dark:text-[#F3E8FF]">
            <Database className="w-3.5 h-3.5 text-[#A34063]" />
            <span>Firebase Auth: {isFirebaseReady ? '✅ Connected' : 'Ready (Credentials can be added anytime)'}</span>
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="ml-1 text-[#A34063] hover:underline cursor-pointer flex items-center gap-1 font-bold"
            >
              <Settings className="w-3 h-3" />
              <span>{isFirebaseReady ? 'Edit Keys' : 'Add Credentials'}</span>
            </button>
          </div>
        </div>

        {authError && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs flex items-center justify-between max-w-md mx-auto">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {authError}
            </span>
            <button onClick={clearAuthError} className="p-1 hover:bg-red-200 rounded-full cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* If already logged in: Member Passport Card */}
      {isLoggedIn && user ? (
        <div
          className={`rounded-3xl border-3 p-6 sm:p-10 shadow-xl max-w-lg mx-auto relative overflow-hidden ${
            nightMode
              ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
              : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
          }`}
        >
          <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-[#A34063]/30 pointer-events-none" />

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-dashed border-[#A34063]/30 relative z-10">
            <span className="font-rounded font-bold text-xs uppercase tracking-wider text-[#A34063]">
              Official TinyThreads Passport
            </span>
            <span className="text-xs font-mono bg-[#F5D88B] text-[#5C4033] px-2.5 py-0.5 rounded-full font-bold">
              ★ Active Dreamer
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#F7DDE5] border-2 border-[#A34063] flex items-center justify-center text-3xl shadow-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
              ) : user.role === 'caregiver' ? '🧸' : user.role === 'tailor' ? '✂️' : '🌟'}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">{user.displayName}</h3>
              <span className="text-xs font-mono opacity-75 block">{user.email}</span>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] font-rounded font-bold uppercase px-2 py-0.5 rounded-md bg-[#DCE8D7] text-[#2F4729]">
                  {user.role} role
                </span>
                {user.isDemoUser ? (
                  <span className="text-[10px] font-rounded font-bold uppercase px-2 py-0.5 rounded-md bg-[#F5D88B]/40 text-[#5C4033]">
                    1-Click Demo
                  </span>
                ) : (
                  <span className="text-[10px] font-rounded font-bold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {user.authProvider === 'firebase' ? 'Firebase Google' : 'Google Verified'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-[#EABAC8] text-xs font-sans space-y-2 mb-6 relative z-10">
            <div className="flex justify-between">
              <span className="font-semibold">Boutique Access:</span>
              <span className="text-[#A34063] font-bold">Full Access Unlocked ♡</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Bedtime Lullabies:</span>
              <span className="text-[#2F4729] font-bold flex items-center gap-1">
                <Music className="w-3.5 h-3.5" /> Auto-Chime Enabled
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <button
              type="button"
              onClick={() => {
                audioManager.startLullaby();
                onNavigateHome();
              }}
              className="flex-1 py-3 px-6 rounded-full bg-[#A34063] hover:bg-[#852E4D] text-white font-rounded font-bold text-sm border-2 border-[#5C4033] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span>Step Inside Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={logout}
              className="py-3 px-5 rounded-full border-2 border-current text-xs font-rounded font-bold hover:bg-black/5 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      ) : (
        /* Sign-In Choices for New Visitor */
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Mimi Greeting Box */}
            <div
              className={`lg:col-span-4 rounded-3xl border-3 p-6 flex flex-col items-center justify-between text-center relative overflow-hidden ${
                nightMode
                  ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
                  : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
              }`}
            >
              <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-[#A34063]/30 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#F5D88B] border border-[#5C4033] flex items-center justify-center mx-auto mb-2 text-lg">
                  ✂
                </div>
                <h3 className="font-serif text-xl font-bold">Mimi Bunny</h3>
                <p className="text-xs font-hand text-[#A34063] font-bold">
                  “I stitched a cozy corner just for your little dreamer!”
                </p>
              </div>

              <div className="my-4 relative z-10">
                <MimiCharacter className="w-44 h-44 drop-shadow-md" pose="holding-needle" />
              </div>

              <div className="text-xs font-sans opacity-85 relative z-10 bg-white/60 dark:bg-black/20 p-3 rounded-2xl border border-[#EABAC8]">
                <span>🎵 Lullaby music box chime starts automatically upon entrance.</span>
              </div>
            </div>

            {/* Right: Sign-in Methods (Google + Demo Accounts) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Option 1: Real Google Account / Firebase Login */}
              <div
                className={`rounded-3xl border-3 p-6 sm:p-7 shadow-md transition-colors ${
                  nightMode
                    ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
                    : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-rounded font-bold uppercase tracking-wider text-[#A34063] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Google Account • Firebase Auth</span>
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight mb-2">
                  Sign in with Google
                </h3>
                <p className="text-xs font-sans opacity-85 leading-relaxed mb-4">
                  {isFirebaseReady
                    ? 'Firebase Authentication is configured. One-tap verified access with your Google account.'
                    : 'Instant verified access. Sign in with Google (credentials can also be added anytime via the settings button).'}
                </p>

                {/* Direct Google 1-Click Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleDirectGoogleLogin}
                    disabled={googleLoading}
                    className="flex-1 py-3 px-5 rounded-full bg-white text-stone-800 font-rounded font-bold text-sm border-2 border-[#5C4033] shadow-md flex items-center justify-center gap-3 hover:bg-stone-50 active:scale-98 transition-all cursor-pointer"
                  >
                    {/* Google "G" SVG */}
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{googleLoading ? 'Connecting...' : 'Continue with Google (Tanya Garg)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(true)}
                    className="py-3 px-4 rounded-full border-2 border-current text-xs font-rounded font-bold hover:bg-black/5 cursor-pointer whitespace-nowrap"
                  >
                    Custom Email ✎
                  </button>
                </div>
              </div>

              {/* Option 2: 1-Click Instant Demo Accounts */}
              <div
                className={`rounded-3xl border-3 p-6 sm:p-7 shadow-md transition-colors ${
                  nightMode
                    ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
                    : 'bg-[#FFF8F1] border-[#5C4033] text-[#5C4033]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-rounded font-bold uppercase tracking-wider text-[#A34063] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Instant 1-Click Demo Personas</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Choose a Demo Persona
                </h3>
                <p className="text-xs font-sans opacity-85 leading-relaxed mb-4">
                  Want to explore immediately without entering credentials? Pick any persona below:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('caregiver')}
                    className="p-3.5 rounded-2xl border-2 border-[#EABAC8] hover:border-[#A34063] bg-white/70 dark:bg-black/20 text-left flex flex-col justify-between transition-transform hover:scale-103 cursor-pointer group shadow-xs"
                  >
                    <div>
                      <span className="text-3xl block mb-1">🧸</span>
                      <span className="font-rounded font-bold text-sm block group-hover:text-[#A34063]">
                        Aria & Oliver
                      </span>
                      <span className="text-[11px] opacity-75">Caregiver Parent</span>
                    </div>
                    <span className="text-[10px] font-hand font-bold text-[#A34063] mt-2 block">
                      1-Click Enter →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('dreamer')}
                    className="p-3.5 rounded-2xl border-2 border-[#EABAC8] hover:border-[#A34063] bg-white/70 dark:bg-black/20 text-left flex flex-col justify-between transition-transform hover:scale-103 cursor-pointer group shadow-xs"
                  >
                    <div>
                      <span className="text-3xl block mb-1">🌟</span>
                      <span className="font-rounded font-bold text-sm block group-hover:text-[#A34063]">
                        Explorer Leo
                      </span>
                      <span className="text-[11px] opacity-75">Baby Adventurer</span>
                    </div>
                    <span className="text-[10px] font-hand font-bold text-[#A34063] mt-2 block">
                      1-Click Enter →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('tailor')}
                    className="p-3.5 rounded-2xl border-2 border-[#EABAC8] hover:border-[#A34063] bg-white/70 dark:bg-black/20 text-left flex flex-col justify-between transition-transform hover:scale-103 cursor-pointer group shadow-xs"
                  >
                    <div>
                      <span className="text-3xl block mb-1">✂️</span>
                      <span className="font-rounded font-bold text-sm block group-hover:text-[#A34063]">
                        Pip the Squirrel
                      </span>
                      <span className="text-[11px] opacity-75">Junior Tailor</span>
                    </div>
                    <span className="text-[10px] font-hand font-bold text-[#A34063] mt-2 block">
                      1-Click Enter →
                    </span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Real Baby Outfits Lookbook Preview Strip - Full Pictures, Uncropped */}
          <div
            className={`rounded-3xl border-2 p-6 transition-colors ${
              nightMode
                ? 'bg-[#201427] border-[#4A2D65]'
                : 'bg-white/80 border-[#F7DDE5]'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <div>
                <span className="text-xs font-rounded font-bold uppercase tracking-wider text-[#A34063]">
                  Sneak Peek Lookbook
                </span>
                <h4 className="font-serif text-lg font-bold">Real Baby Looks Handcrafted by Mimi</h4>
              </div>
              <span className="text-xs font-hand font-bold text-[#A34063]">
                100% GOTS Organic Cotton • Ultra-Soft on New Skin ♡
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl overflow-hidden border-2 border-[#EABAC8] bg-[#FFF8F1] p-2 flex flex-col items-center">
                <div className="w-full h-48 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80"
                    alt="Real baby in Cloud Nine Onesie"
                    className="w-full h-full object-contain p-1 rounded-lg"
                  />
                </div>
                <div className="mt-2 text-center text-xs text-[#5C4033]">
                  <span className="font-rounded font-bold block">Cloud Nine Onesie</span>
                  <span className="text-[10px] text-[#A34063]">Combed organic cloud knit • ₹699</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-[#EABAC8] bg-[#FFF8F1] p-2 flex flex-col items-center">
                <div className="w-full h-48 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80"
                    alt="Real baby in Explorer Overalls"
                    className="w-full h-full object-contain p-1 rounded-lg"
                  />
                </div>
                <div className="mt-2 text-center text-xs text-[#5C4033]">
                  <span className="font-rounded font-bold block">Mini Explorer Overalls</span>
                  <span className="text-[10px] text-[#A34063]">Washed linen with twig pockets • ₹1,199</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-[#EABAC8] bg-[#FFF8F1] p-2 flex flex-col items-center">
                <div className="w-full h-48 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80"
                    alt="Real baby in Sleepy Bunny Onesie"
                    className="w-full h-full object-contain p-1 rounded-lg"
                  />
                </div>
                <div className="mt-2 text-center text-xs text-[#5C4033]">
                  <span className="font-rounded font-bold block">Sleepy Bunny Onesie</span>
                  <span className="text-[10px] text-[#A34063]">2-way zipper with bunny footies • ₹749</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Firebase Credentials Configuration Modal */}
      {showConfigModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowConfigModal(false)}
        >
          <div
            className={`relative w-full max-w-lg rounded-3xl border-3 shadow-2xl p-6 sm:p-8 transition-all ${
              nightMode
                ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
                : 'bg-white border-[#5C4033] text-[#5C4033]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-current hover:opacity-70 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#A34063] font-rounded font-bold text-xs uppercase tracking-wider">
              <Key className="w-4 h-4" />
              <span>Firebase Project Configuration</span>
            </div>
            
            <h3 className="font-serif text-2xl font-bold mb-1">
              Add Firebase Credentials
            </h3>
            <p className="text-xs font-sans opacity-80 mb-5 leading-relaxed">
              Paste your Firebase Web App configuration below. You can find these in Firebase Console → Project Settings → General → Your Apps.
            </p>

            <form onSubmit={handleSaveFirebaseConfig} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-rounded font-bold uppercase tracking-wider block mb-1">
                  API Key (apiKey):
                </label>
                <input
                  type="text"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#A34063]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-rounded font-bold uppercase tracking-wider block mb-1">
                    Auth Domain:
                  </label>
                  <input
                    type="text"
                    placeholder="my-project.firebaseapp.com"
                    value={authDomain}
                    onChange={(e) => setAuthDomain(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#A34063]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-rounded font-bold uppercase tracking-wider block mb-1">
                    Project ID:
                  </label>
                  <input
                    type="text"
                    placeholder="my-project-id"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#A34063]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-rounded font-bold uppercase tracking-wider block mb-1">
                  App ID (appId):
                </label>
                <input
                  type="text"
                  placeholder="1:123456789:web:abcdef"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#A34063]"
                  required
                />
              </div>

              {savedConfigMsg && (
                <div className="p-2.5 rounded-xl bg-green-100 text-green-800 text-xs font-bold text-center">
                  ✓ Credentials Saved! Reloading Firebase...
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-full bg-[#A34063] hover:bg-[#852E4D] text-white font-rounded font-bold text-xs shadow-md cursor-pointer transition-all"
                >
                  Save Credentials
                </button>
                {isFirebaseReady && (
                  <button
                    type="button"
                    onClick={() => {
                      resetFirebaseConfig();
                      setApiKey('');
                      setAuthDomain('');
                      setProjectId('');
                      setAppId('');
                    }}
                    className="py-2.5 px-4 rounded-full border border-red-400 text-red-600 hover:bg-red-50 text-xs font-rounded font-bold cursor-pointer"
                  >
                    Clear Credentials
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Google Account Modal Dialog */}
      {showGoogleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowGoogleModal(false)}
        >
          <div
            className={`relative w-full max-w-md rounded-3xl border-3 shadow-2xl p-6 sm:p-8 transition-all ${
              nightMode
                ? 'bg-[#25172E] border-[#5E3B7A] text-[#F3E8FF]'
                : 'bg-white border-[#5C4033] text-[#5C4033]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-current hover:opacity-70 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-300 mx-auto flex items-center justify-center mb-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold">Sign in with Google Account</h3>
              <p className="text-xs opacity-75 mt-0.5">to continue to TinyThreads — Mimi's World</p>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-1">
                  Google Display Name:
                </label>
                <input
                  type="text"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm font-sans focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-rounded font-bold uppercase tracking-wider block mb-1">
                  Google Email Address:
                </label>
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm font-sans focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={googleLoading}
                className="w-full py-3 rounded-full bg-[#A34063] hover:bg-[#852E4D] text-white font-rounded font-bold text-sm shadow-md cursor-pointer transition-all"
              >
                {googleLoading ? 'Verifying...' : 'Sign In & Enter Boutique →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
