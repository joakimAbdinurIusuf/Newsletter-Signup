//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000;

// Adds signup.html to home page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

// app constant is used to listen to port 3000
app.listen(port, function() {
  console.log("Server is running on port " + port);
});
