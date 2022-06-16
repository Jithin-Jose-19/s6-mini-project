const express = require('express')
const firebase = require('firebase/app');
require("firebase/auth");
require("firebase/firestore");

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use("/auth", require("./routes/auth_route"));

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


app.get('/', (req, res) => {
    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            console.log("USer logged in");
            res.render('pages/home')
        } else {
            console.log("User not logged in ");
            res.render('pages/login')
        }
    })

})

app.listen(port, () => {
    console.log('App listening at port ${port}')
})