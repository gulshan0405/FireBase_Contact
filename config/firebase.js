// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAta3a7JzRbPi5CojsgSxf0NL70Hmtef80",
  authDomain: "vite-contact-eb472.firebaseapp.com",
  projectId: "vite-contact-eb472",
  storageBucket: "vite-contact-eb472.firebasestorage.app",
  messagingSenderId: "571498378232",
  appId: "1:571498378232:web:a7d459c936546594069c0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);