import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVBt4qIn7zCHun-QA-cS8e1ibuA1uxXys",
  authDomain: "crypto-site-71aa1.firebaseapp.com",
  projectId: "crypto-site-71aa1",
  storageBucket: "crypto-site-71aa1.firebasestorage.app",
  messagingSenderId: "555222901864",
  appId: "1:555222901864:web:9468ca401d9286df9607dd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};
