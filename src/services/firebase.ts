import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';

export interface FirebaseConfigObject {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
}

const STORAGE_KEY = 'tinythreads_firebase_config';

/**
 * Retrieve saved Firebase credentials from localStorage, environment variables, or default placeholder.
 */
export const getStoredFirebaseConfig = (): FirebaseConfigObject | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.apiKey !== 'YOUR_API_KEY_HERE') {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  // Check Vite environment variables if defined
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    };
  }

  return null;
};

export const saveFirebaseConfig = (config: FirebaseConfigObject): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  // Reload app to re-initialize firebase with new credentials
  window.location.reload();
};

export const clearFirebaseConfig = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

export const isFirebaseConfigured = (): boolean => {
  const cfg = getStoredFirebaseConfig();
  return Boolean(cfg && cfg.apiKey && cfg.apiKey.length > 10 && cfg.projectId);
};

export const initFirebase = (): { auth: Auth | null; isConfigured: boolean } => {
  const config = getStoredFirebaseConfig();

  if (!config || !config.apiKey || config.apiKey === 'YOUR_API_KEY_HERE') {
    return { auth: null, isConfigured: false };
  }

  try {
    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    return { auth, isConfigured: true };
  } catch (error) {
    console.warn('Firebase initialization warning:', error);
    return { auth: null, isConfigured: false };
  }
};

// Initialize on module load
const { auth: initializedAuth, isConfigured: hasConfig } = initFirebase();

export { initializedAuth as auth, googleProvider, hasConfig };

/**
 * Trigger Real Google Sign-In with Firebase Popup
 */
export const signInWithGoogleFirebase = async (): Promise<{
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}> => {
  const { auth: activeAuth, isConfigured } = initFirebase();

  if (!isConfigured || !activeAuth) {
    throw new Error('FIREBASE_CONFIG_MISSING');
  }

  const provider = googleProvider || new GoogleAuthProvider();
  const result = await signInWithPopup(activeAuth, provider);
  const user = result.user;

  return {
    uid: user.uid,
    displayName: user.displayName || 'Loving Parent',
    email: user.email || 'parent@example.com',
    photoURL: user.photoURL || undefined
  };
};

/**
 * Sign out from Firebase Auth
 */
export const signOutFirebase = async (): Promise<void> => {
  if (auth) {
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
  }
};

/**
 * Subscribe to Firebase Auth state
 */
export const onFirebaseAuthState = (callback: (user: FirebaseUser | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
