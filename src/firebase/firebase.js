// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd8-lc0qW0-EfWevJtO5D6FFG_bQisglI",
  authDomain: "moviehub-8f82c.firebaseapp.com",
  projectId: "moviehub-8f82c",
  storageBucket: "moviehub-8f82c.appspot.com",
  messagingSenderId: "38481318776",
  appId: "1:38481318776:web:3f21a81e346e6879ad6e8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export default app;

//https://console.firebase.google.com/u/0/project/moviehub-8f82c/firestore/data/~2Fmovies~2FXsbcO3Nw8IfYEH7xUMOg
