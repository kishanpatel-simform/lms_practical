const express = require("express");
const path = require("path");

//initializing express
const app = express();

//Set view engine name and template directory path to express
app.set("view engine", "pug");

//setting path for express for views
app.set("views", path.join(__dirname, "views"));

//setting port
app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running on " + 3000);
});

fields = [{ name: "Mission" }, { name: "About Us" }, { name: "News" }, { name: "Contact Us" }];

// this will render index page
//! route /?username=kishan
app.get("/", (req, res) => {
    const username = req.query.username;
    res.render("index", { user: username, fields: fields });
});

//this send simple text
//! route News/?username=kishan
app.get("/News", (req, res) => {
    const username = req.query.username;
    res.send(`Welcome ${username} to Express News`);
});

//this will serve JSON
//! route Technology/?username=kishan
app.get("/Technology", (req, res) => {
    const username = req.query.username;
    res.send({ name: username, technology: "NodeJs" });
});