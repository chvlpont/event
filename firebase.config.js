// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { signInWithCustomToken } from "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_API_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_API_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_API_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_API_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_API_APP_ID,
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Communicates with NoSQL database
const db = getFirestore(app);

// Communicates with firebase storage
const storage = getStorage(app);

// Connect to Firebase auth
const auth = getAuth(app);

export { db, storage, app, signInWithCustomToken, auth };
