// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0J2EJSfvhdOeNCJ7hi5JupUmAoiqLMAM",
  authDomain: "aspiring-8cf7e.firebaseapp.com",
  databaseURL: "https://aspiring-8cf7e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aspiring-8cf7e",
  storageBucket: "aspiring-8cf7e.appspot.com",
  messagingSenderId: "414896381702",
  appId: "1:414896381702:web:0eee893e5e06e850924887",
  measurementId: "G-4TET5G58Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);