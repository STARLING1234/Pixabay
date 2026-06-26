import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAYfzNfirV147wYe1BbdSNr-1gzXZ0W7Ro",
  authDomain: "reactauth-f0ccd.firebaseapp.com",
  projectId: "reactauth-f0ccd",
  storageBucket: "reactauth-f0ccd.firebasestorage.app",
  messagingSenderId: "921928611721",
  appId: "1:921928611721:web:d7706907fc0746d63d9358"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);