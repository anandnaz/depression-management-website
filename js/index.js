const express = require("express");
const path = require("path");
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.signup_name,
        contact: req.body.signup_contact,
        username: req.body.signup_username,
        email: req.body.signup_email,
        password: req.body.signup_password
    }

    const existingUser = await collection.findOne({ username: data.username });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("home");
    }

});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ username: req.body.login_username });
        if (check) {
            // Compare the password directly
            if (check.password === req.body.login_password) {
                res.render("home");
            } else {
                res.send("Wrong Password");
            }
        } else {
            res.send("Username not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

app.get("/meditation", (req, res) => {
    res.render("meditation");
});

app.get("/counselor", (req, res) => {
    res.render("counselor");
});

app.get("/questionnaire", (req, res) => {
    res.render("questionnaire");
});

app.get("/diary", (req, res) => {
    res.render("diary");
});

app.get("/quotes", (req, res) => {
    res.render("quotes");
});

app.get("/videos", (req, res) => {
    res.render("videos");
});

app.get("/home", (req, res) => {
    res.render("home");
});