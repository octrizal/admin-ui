import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXo9vjv5TM7Pj4ASUb5cD2AmhXvkXslZI",
  authDomain: "store-tutorial-43bf8.firebaseapp.com",
  projectId: "store-tutorial-43bf8",
  storageBucket: "store-tutorial-43bf8.appspot.com",
  messagingSenderId: "301230966683",
  appId: "1:301230966683:web:aa30278b464dffc7b3833e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Ensure `app` is passed as a parameter
export const db = getFirestore(app);
export const storage = getStorage(app);