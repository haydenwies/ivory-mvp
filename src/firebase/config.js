import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYvE5Ed3NJEbutRC87QvYKxNteryeV2hA",

  authDomain: "harmony-oms.firebaseapp.com",

  projectId: "harmony-oms",

  storageBucket: "harmony-oms.appspot.com",

  messagingSenderId: "224615611093",

  appId: "1:224615611093:web:405b369d469242472c805c",

  measurementId: "G-YCMHDSSFQQ"

};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
