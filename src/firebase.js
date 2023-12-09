// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUWSPPpvo0ld9Kj_bmObSAr544vNouGus",
  authDomain: "discreet-ac75c.firebaseapp.com",
  projectId: "discreet-ac75c",
  storageBucket: "discreet-ac75c.appspot.com",
  messagingSenderId: "332092804361",
  appId: "1:332092804361:web:c276214d52d4c502c397d8",
  measurementId: "G-7X4VEWR467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);