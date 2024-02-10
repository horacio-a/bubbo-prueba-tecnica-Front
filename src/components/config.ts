// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC97CwxjkzuhJA8Jtpxk2DUmh4tw8MRbFQ",
  authDomain: "images-bubbo.firebaseapp.com",
  projectId: "images-bubbo",
  storageBucket: "images-bubbo.appspot.com",
  messagingSenderId: "754415142953",
  appId: "1:754415142953:web:52b094a0d2ed7d1b277438",
  measurementId: "G-2WG31QSCXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)