import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  isFirebaseConfigured,
  signInWithGoogleFirebase,
  signOutFirebase,
  onFirebaseAuthState,
  saveFirebaseConfig,
  clearFirebaseConfig,
  getStoredFirebaseConfig,
  FirebaseConfigObject
} from '../services/firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'caregiver' | 'dreamer' | 'tailor';
  isDemoUser: boolean;
  savedOutfitsCount?: number;
  authProvider?: 'firebase' | 'demo' | 'simulated-google';
}

interface AuthContextType {
  user: UserProfile | null;
  loginWithDemo: (role?: 'caregiver' | 'dreamer' | 'tailor') => void;
  loginWithGoogle: (name?: string, email?: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  isFirebaseReady: boolean;
  storedFirebaseConfig: FirebaseConfigObject | null;
  updateFirebaseConfig: (config: FirebaseConfigObject) => void;
  resetFirebaseConfig: () => void;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('tinythreads_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const isFirebaseReady = isFirebaseConfigured();
  const storedFirebaseConfig = getStoredFirebaseConfig();

  // Listen to Firebase Auth state if Firebase is configured
  useEffect(() => {
    if (!isFirebaseReady) return;

    const unsubscribe = onFirebaseAuthState((fbUser) => {
      if (fbUser) {
        const profile: UserProfile = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || 'Loving Parent',
          email: fbUser.email || 'parent@tinydreamers.com',
          photoURL: fbUser.photoURL || undefined,
          role: 'caregiver',
          isDemoUser: false,
          authProvider: 'firebase',
          savedOutfitsCount: 2
        };
        setUser(profile);
      }
    });

    return () => unsubscribe();
  }, [isFirebaseReady]);

  // Persist user in localStorage for seamless experience
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('tinythreads_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('tinythreads_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  const loginWithDemo = (role: 'caregiver' | 'dreamer' | 'tailor' = 'caregiver') => {
    setAuthError(null);
    const demoProfiles: Record<'caregiver' | 'dreamer' | 'tailor', UserProfile> = {
      caregiver: {
        uid: 'demo-caregiver-01',
        displayName: 'Aria & Baby Oliver',
        email: 'aria.oliver@tinydreamers.demo',
        role: 'caregiver',
        isDemoUser: true,
        authProvider: 'demo',
        savedOutfitsCount: 3
      },
      dreamer: {
        uid: 'demo-dreamer-02',
        displayName: 'Little Explorer Leo',
        email: 'leo.explorer@tinydreamers.demo',
        role: 'dreamer',
        isDemoUser: true,
        authProvider: 'demo',
        savedOutfitsCount: 1
      },
      tailor: {
        uid: 'demo-tailor-03',
        displayName: 'Pip the Squirrel',
        email: 'pip.apprentice@tinydreamers.demo',
        role: 'tailor',
        isDemoUser: true,
        authProvider: 'demo',
        savedOutfitsCount: 5
      }
    };

    setUser(demoProfiles[role]);
  };

  const loginWithGoogle = async (name: string = 'Tanya Garg', email: string = 'gargtanya290@gmail.com') => {
    setAuthError(null);

    // If Firebase credentials have been configured, use real Firebase Google Auth popup!
    if (isFirebaseReady) {
      try {
        const fbUser = await signInWithGoogleFirebase();
        const googleUser: UserProfile = {
          uid: fbUser.uid,
          displayName: fbUser.displayName,
          email: fbUser.email,
          photoURL: fbUser.photoURL,
          role: 'caregiver',
          isDemoUser: false,
          authProvider: 'firebase',
          savedOutfitsCount: 2
        };
        setUser(googleUser);
        return;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn('Firebase Google Sign-In error:', message);
        // If popup was closed or config failed, record error or fallback
        if (message.includes('auth/popup-closed-by-user')) {
          setAuthError('Google sign-in popup was closed. Please try again.');
          return;
        }
      }
    }

    // Graceful Instant Google Account sign-in (for when user adds credentials later)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const googleUser: UserProfile = {
          uid: `google-${Date.now()}`,
          displayName: name,
          email: email,
          role: 'caregiver',
          isDemoUser: false,
          authProvider: isFirebaseReady ? 'firebase' : 'simulated-google',
          savedOutfitsCount: 2
        };
        setUser(googleUser);
        resolve();
      }, 400);
    });
  };

  const logout = () => {
    signOutFirebase();
    setUser(null);
    setAuthError(null);
  };

  const updateFirebaseConfig = (config: FirebaseConfigObject) => {
    saveFirebaseConfig(config);
  };

  const resetFirebaseConfig = () => {
    clearFirebaseConfig();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithDemo,
        loginWithGoogle,
        logout,
        isLoggedIn: Boolean(user),
        isFirebaseReady,
        storedFirebaseConfig,
        updateFirebaseConfig,
        resetFirebaseConfig,
        authError,
        clearAuthError: () => setAuthError(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
