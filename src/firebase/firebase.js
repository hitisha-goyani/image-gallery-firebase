// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA41ErQ1sXo2yrjLwv70ACJYDZvthjkLJQ",
  authDomain: "fir-login-8e6a3.firebaseapp.com",
  projectId: "fir-login-8e6a3",
  storageBucket: "fir-login-8e6a3.firebasestorage.app",
  messagingSenderId: "225578314310",
  appId: "1:225578314310:web:5c620b7e1bbb209008b847",
  measurementId: "G-WQSSMMGWQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)