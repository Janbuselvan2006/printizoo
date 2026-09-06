import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const cleanVal = (val, fallback) => {
  if (val && typeof val === 'string') {
    const cleaned = val.replace(/["',]/g, '').trim();
    if (cleaned) return cleaned;
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: cleanVal(import.meta.env.VITE_FIREBASE_API_KEY, 'AIzaSyAJuQNZkgqPBHaSFtfRPmDJRnNtUOPohjA'),
  authDomain: cleanVal(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, 'printizoo.firebaseapp.com'),
  projectId: cleanVal(import.meta.env.VITE_FIREBASE_PROJECT_ID, 'printizoo'),
  storageBucket: cleanVal(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, 'printizoo.firebasestorage.app'),
  messagingSenderId: cleanVal(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, '442473314942'),
  appId: cleanVal(import.meta.env.VITE_FIREBASE_APP_ID, '1:442473314942:web:89cb5b1ff30d793adff62f')
};

let app = null;
let auth = null;
let db = null;

try {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization warning:', error);
}

export { auth, db };
export default app;
