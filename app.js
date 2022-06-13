//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

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
  // Gets the first name, last name and email that the user submitted
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // Create a JSON object
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        FNAME: firstName,
        LNAME: lastName,
      }
    ]
  };

  // Turns the JSON object into a string
  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/a1445510f2";

  const options = {
    // Using method <string> A string specifying the HTTP request method. Default: 'GET'.
    // from https://nodejs.org/dist/latest-v16.x/docs/api/http.html#httprequestoptions-callback
    method: "POST",
    // Using auth <string> Basic authentication ('user:password') to compute an Authorization header.
    // from the same address.
    // Mailchimp API says, for basic HTTP authentication, --user 'anystring:TOKEN
    // See "The basics" here: https://mailchimp.com/developer/marketing/docs/fundamentals/#the-basics
    auth: "joakimai:135a9473232f0b440ff007878680eeeb-us10"
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  // Using accepted answer here: https://stackoverflow.com/questions/40537749/how-do-i-make-a-https-post-in-node-js-without-any-third-party-module
  request.write(jsonData);
  request.end();
});

// app constant is used to listen to port 3000
app.listen(port, function() {
  console.log("Server is running on port " + port);
});


// API key: 135a9473232f0b440ff007878680eeeb-us10

// List ID: a1445510f2
