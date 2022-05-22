import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtkltF3uL0rfX6VRE3XkjP-SqB32LFyqw",
  authDomain: "ivory-development.firebaseapp.com",
  projectId: "ivory-development",
  storageBucket: "ivory-development.appspot.com",
  messagingSenderId: "1070239732241",
  appId: "1:1070239732241:web:9cf1955912e28b094717b0",
  measurementId: "G-6JB6F8259D",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
