const router = require("express").Router();
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCVQiwCFBuxh55Y5YJDkFUHhlzJHumuIh0",
  authDomain: "lovs-mits.firebaseapp.com",
  projectId: "lovs-mits",
  storageBucket: "lovs-mits.appspot.com",
  messagingSenderId: "43411901509",
  appId: "1:43411901509:web:df97b84d3a147b1bd0a72c",
  measurementId: "G-SVH16F3830",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // signed in
      var user = userCredential.user;
      const loginId = user.providerData[0].uid
      res.render('user-profile',{loginId});
    })
    .catch((error) => {
      console.log("failed");
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

router.post("/logout", async (req, res, next) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("user logged out");
      res.redirect("/")
    })
    .catch((error) => {
      // An error happened.
    });
});

module.exports = router;
