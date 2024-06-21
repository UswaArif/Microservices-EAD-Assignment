import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; 
import { Link } from 'react-router-dom';
import axios from 'axios'

//Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp({        
        apiKey: "AIzaSyC0J2EJSfvhdOeNCJ7hi5JupUmAoiqLMAM",
        authDomain: "aspiring-8cf7e.firebaseapp.com",
        databaseURL: "https://aspiring-8cf7e-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "aspiring-8cf7e",
        storageBucket: "aspiring-8cf7e.appspot.com",
        messagingSenderId: "414896381702",
        appId: "1:414896381702:web:0eee893e5e06e850924887",
        measurementId: "G-4TET5G58Q9"
    });
}


function Product() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // other state variables and functions...

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
        }
    }, []);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const db = firebase.firestore();
            await db.collection("products").add({
                name: name,
                price: parseFloat(price), 
                quantity: parseInt(quantity) ,
                email: email
            });
            
            console.log("Product added successfully");
            setName("");
            setPrice("");
            setQuantity("");

        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productName">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            id="productName"
                            placeholder="Enter Name"
                            autoComplete="off"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice">
                            <strong>Price</strong>
                        </label>
                        <input
                            type="number"
                            id="productPrice"
                            placeholder="Enter Price"
                            autoComplete="off"
                            className="form-control rounded-0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productQuantity">
                            <strong>Quantity</strong>
                        </label>
                        <input
                            type="number"
                            id="productQuantity"
                            placeholder="Enter Quantity"
                            autoComplete="off"
                            className="form-control rounded-0"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Add Product
                    </button>
                    <div style={{ marginTop: '10px' }}></div>
                    <Link to="/tasklist" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Task List
                    </Link>
                    <div style={{ marginTop: '10px' }}></div>
                    <Link to="/weather" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Weather
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Product;
