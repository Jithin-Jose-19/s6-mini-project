const express = require('express')

const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const firebase = require("firebase");

app.use("/auth", require("./routes/auth.route"));

app.get('/', (req, res) => {
    res.render("login");
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})