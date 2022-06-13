//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000;

// Using this so we can refer to static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Adds signup.html to home page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  console.log(firstName, lastName, email);
});

// app constant is used to listen to port 3000
app.listen(port, function() {
  console.log("Server is running on port " + port);
});
