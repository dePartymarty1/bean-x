import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "bean-x.firebaseapp.com",
  projectId: "bean-x",
  storageBucket: "bean-x.appspot.com",
  messagingSenderId: "908545804297",
  appId: "1:908545804297:web:70e17216396a92e4b650d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) //authentication
export const db = getFirestore(app) //database from firestore
export const storage = getStorage(app) //storage

export default app

// With this firebase config file we can establish connection to our firebase account (i.e. sign in and google authentication)
