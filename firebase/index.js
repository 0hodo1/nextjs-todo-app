// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsPUnd0Gy3tmstNdZ-Q6Hro5SeNCx2FeA",
  authDomain: "modern-react-app-b5454.firebaseapp.com",
  projectId: "modern-react-app-b5454",
  storageBucket: "modern-react-app-b5454.appspot.com",
  messagingSenderId: "58268936893",
  appId: "1:58268936893:web:3fb9ec85f68d49c2dee5d4",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
