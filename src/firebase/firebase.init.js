// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyhc9ktPHnESYcA5ev5ENs1llLd_3vGrE",
    authDomain: "ema-john-router-auth-123456.firebaseapp.com",
    projectId: "ema-john-router-auth-123456",
    storageBucket: "ema-john-router-auth-123456.appspot.com",
    messagingSenderId: "1030434174269",
    appId: "1:1030434174269:web:46cd5296371b6826304154"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;