import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "calories-3c537.firebaseapp.com",
  databaseURL:
    "https://calories-3c537-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "calories-3c537",
  storageBucket: "calories-3c537.firebasestorage.app",
  messagingSenderId: "725975435147",
  appId: "1:725975435147:web:baf5d46acbe185ceb9d18e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
export const DATABASE = getDatabase(app);
export const RD_PROJECT_ITEMS = "/app_calories/items/";
export const RD_PROJECT_USERS = "/app_calories/users/";
