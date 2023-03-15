import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7puEVztuzPu94qTndejEAAyuHUrdCHKM",
  authDomain: "servicer-230ea.firebaseapp.com",
  projectId: "servicer-230ea",
  storageBucket: "servicer-230ea.appspot.com",
  messagingSenderId: "54291227889",
  appId: "1:54291227889:web:099e443c1bf6ce28593550",
  measurementId: "G-GNNN7EHX9D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// initializ database connection

const db = getFirestore(app);

export { auth, db };
