// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXz94utDJwHKH-VOczDu589t-iVshYkGg",
  authDomain: "wardrobe-b29bd.firebaseapp.com",
  projectId: "wardrobe-b29bd",
  storageBucket: "wardrobe-b29bd.appspot.com",
  messagingSenderId: "747920178349",
  appId: "1:747920178349:web:6f810b6d70049a54d69a24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
