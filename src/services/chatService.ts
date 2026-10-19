import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, getDocs, writeBatch } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';

export interface ChatMessage {
  id: string;
  sender: 'mimi' | 'user';
  text: string;
  time: string;
  timestamp?: any;
}

const MESSAGES_COLLECTION = 'chat_messages';

/**
 * Get Firestore instance from firebase.ts
 */
const getFirestoreInstance = () => {
  if (!isFirebaseConfigured() || !db) {
    return null;
  }
  return db;
};

/**
 * Send a chat message to Firebase
 */
export const sendChatMessage = async (message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<string | null> => {
  const db = getFirestoreInstance();
  if (!db) {
    console.warn('Firestore not configured, message not saved');
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
      ...message,
      timestamp: serverTimestamp(),
      userId: auth?.currentUser?.uid || 'anonymous'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return null;
  }
};

/**
 * Subscribe to chat messages for the current user
 */
export const subscribeToChatMessages = (
  callback: (messages: ChatMessage[]) => void,
  userId?: string
): (() => void) => {
  const db = getFirestoreInstance();
  if (!db) {
    console.warn('Firestore not configured, using local storage fallback');
    // Fallback to localStorage
    const stored = localStorage.getItem('tinythreads_chat_messages');
    if (stored) {
      try {
        callback(JSON.parse(stored));
      } catch {
        callback([]);
      }
    } else {
      callback([]);
    }
    return () => {};
  }

  const uid = userId || auth?.currentUser?.uid || 'anonymous';
  const q = query(
    collection(db, MESSAGES_COLLECTION),
    orderBy('timestamp', 'asc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages: ChatMessage[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        sender: data.sender,
        text: data.text,
        time: data.time || 'Just now',
        timestamp: data.timestamp
      });
    });
    callback(messages);
  }, (error) => {
    console.error('Error subscribing to chat messages:', error);
    callback([]);
  });

  return unsubscribe;
};

/**
 * Clear all chat messages for the current user
 */
export const clearChatMessages = async (): Promise<void> => {
  const db = getFirestoreInstance();
  if (!db) {
    localStorage.removeItem('tinythreads_chat_messages');
    return;
  }

  try {
    const q = query(collection(db, MESSAGES_COLLECTION));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (error) {
    console.error('Error clearing chat messages:', error);
  }
};

/**
 * Save messages to localStorage (fallback when Firebase is not configured)
 */
export const saveMessagesToLocal = (messages: ChatMessage[]): void => {
  try {
    localStorage.setItem('tinythreads_chat_messages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
};
