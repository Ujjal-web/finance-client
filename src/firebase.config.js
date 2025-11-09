// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAedXsUs5mIaZStsPrHt4sXNCWIfsg6pKI",
    authDomain: "finance-server.firebaseapp.com",
    projectId: "finance-server",
    storageBucket: "finance-server.firebasestorage.app",
    messagingSenderId: "71455984117",
    appId: "1:71455984117:web:54eabacf8b8fcf155c78bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);