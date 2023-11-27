// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdADYy_tlANIzzyegxnXS0hn82AT3zwtI",
    authDomain: "drinkly-f950f.firebaseapp.com",
    projectId: "drinkly-f950f",
    storageBucket: "drinkly-f950f.appspot.com",
    messagingSenderId: "831649482073",
    appId: "1:831649482073:web:1192f21e094fd714c0f848",
    measurementId: "G-ZWH7414QG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);
export default db;