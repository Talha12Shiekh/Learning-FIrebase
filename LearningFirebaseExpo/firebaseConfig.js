import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDezJG6C_ML7-XJhcljX4YCmWdoech5_uE",
  authDomain: "firstexpogofirebaseproject.firebaseapp.com",
  projectId: "firstexpogofirebaseproject",
  storageBucket: "firstexpogofirebaseproject.appspot.com",
  messagingSenderId: "395283591738",
  appId: "1:395283591738:web:98f645c0387cf974ecbb03",
  databaseURL:"https://firstexpogofirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
