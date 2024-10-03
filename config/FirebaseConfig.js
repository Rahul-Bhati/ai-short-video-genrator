// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_Firebase_API_KEY,
  authDomain: "netflix-a06cd.firebaseapp.com",
  projectId: "netflix-a06cd",
  storageBucket: "netflix-a06cd.appspot.com",
  messagingSenderId: "723647198160",
  appId: "1:723647198160:web:fc91939a10cf9bebc2bfd5",
  measurementId: "G-93PPYW5MK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);