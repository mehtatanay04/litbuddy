import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA7qtpFybp7tJex4OEYZwHSMHl6g8GUO6I",
  authDomain: "litbuddy-b7208.firebaseapp.com",
  projectId: "litbuddy-b7208",
  storageBucket: "litbuddy-b7208.firebasestorage.app",
  messagingSenderId: "131403954017",
  appId: "1:131403954017:web:eb06791b5fc76f57587720",
  measurementId: "G-P741TDKSYJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;