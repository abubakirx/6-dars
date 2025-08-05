import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeb2_DA1JI4zsYyhyrSrc6W4AflNcbxsA",
  authDomain: "abubakir-project.firebaseapp.com",
  projectId: "abubakir-project",
  storageBucket: "abubakir-project.firebasestorage.app",
  messagingSenderId: "381865110072",
  appId: "1:381865110072:web:dd5d20e3235972bb0754cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth
export const auth = getAuth();
//db

export const db = getFirestore();
