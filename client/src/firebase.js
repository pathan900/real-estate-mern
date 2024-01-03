// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-ec496.firebaseapp.com",
  projectId: "real-estate-mern-ec496",
  storageBucket: "real-estate-mern-ec496.appspot.com",
  messagingSenderId: "1046524229342",
  appId: "1:1046524229342:web:1de5a03d27b79ed47eb44f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
