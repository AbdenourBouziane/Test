// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCoSmKPw7-Mj-MNOASBcfnAe1kF1YgeB04",

  authDomain: "game-changers-9c9f5.firebaseapp.com",

  databaseURL: "https://game-changers-9c9f5-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "game-changers-9c9f5",

  storageBucket: "game-changers-9c9f5.appspot.com",

  messagingSenderId: "223591611476",

  appId: "1:223591611476:web:22909db5680a190ad781c1",

  measurementId: "G-KNTXHT2PDG"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
// initialize firestore database service
const db = getFirestore();

// initialize authentication service
const auth = getAuth();

export { auth, db };
