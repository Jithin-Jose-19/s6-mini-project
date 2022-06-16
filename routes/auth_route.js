const router = require("express").Router();
const { Router } = require('express');
const firebase = require('firebase/app');
require("firebase/auth");
require("firebase/firestore");
const { initializeApp } = require('firebase/app');
const { onAuthStateChanged, getAuth } = require("firebase/auth");
//const { getAnalytics } = require("firebase/analytics");
const firebaseConfig = {

    apiKey: "AIzaSyCVQiwCFBuxh55Y5YJDkFUHhlzJHumuIh0",

    authDomain: "lovs-mits.firebaseapp.com",

    projectId: "lovs-mits",

    storageBucket: "lovs-mits.appspot.com",

    messagingSenderId: "43411901509",

    appId: "1:43411901509:web:df97b84d3a147b1bd0a72c",

    measurementId: "G-SVH16F3830"

};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);
//const db = getFirestore(firebaseApp)
const firebaseAuth = getAuth()

router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            console.log("failed");
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
    res.render("/");
})

module.exports = router;