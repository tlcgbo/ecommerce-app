// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn-sfS9fDxP4NWpEDNETbIioZhuZdVS84",
  authDomain: "ecommerce-b934c.firebaseapp.com",
  projectId: "ecommerce-b934c",
  storageBucket: "ecommerce-b934c.firebasestorage.app",
  messagingSenderId: "1091187327001",
  appId: "1:1091187327001:web:c3b358ae9d67a19b6d6a88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;