// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chirkut-blog.firebaseapp.com",
  projectId: "chirkut-blog",
  storageBucket: "chirkut-blog.firebasestorage.app",
  messagingSenderId: "888132515023",
  appId: "1:888132515023:web:977c3f0a32f2c165b373ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);