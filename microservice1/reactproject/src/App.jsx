import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Product from './Product'
import Weather from './Weather'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import Tasklist from './Tasklist'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function App() {
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
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/product' element={<Product />}></Route>
      <Route path='/weather' element={<Weather />}></Route>
      <Route path='/tasklist' element={<Tasklist />}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
