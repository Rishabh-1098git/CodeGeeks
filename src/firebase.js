// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCmi2hD36kbopVmuQfDC80TkuBxXVQJaAQ",
  authDomain: "codegram-6ba30.firebaseapp.com",
  projectId: "codegram-6ba30",
  storageBucket: "codegram-6ba30.appspot.com",
  messagingSenderId: "9356546273",
  appId: "1:9356546273:web:ed261ae38bfed0e13c67a0",
  measurementId: "G-23L6F3QF8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, db, provider, storage };