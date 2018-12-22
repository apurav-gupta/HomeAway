const express = require("express");
const router = express.Router();
const dbkey = require("../../config/keys");
const passport = require("passport");
var kafka = require("../../kafka/client");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

// Load User model
const Owners = require("../../models/Owners");

/*********************OWNER SIGN UP******************** */

router.post("/OwnerSignup", (request, res) => {
  console.log("inside owner sign up");
  console.log(request.body.firstname);
  console.log(request.body.lastname);
  console.log(request.body.email);
  console.log(request.body.password);
  console.log(request.body.phonenumber);

  kafka.make_request("owner_signup", request.body, function(err, results) {
    console.log("In Owner sign up result call");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(203).send();
    } else {
      if (results.status == 200) {
        console.log("Inside Owner Sign Up Success");
        return res.status(200).send(results);
      } else {
        console.log("Sign Up Failed");
        return res.status(202).send("Sign Up Failed");
      }
    }
  });
});

/****************OWNER LOGIN ******************************* */

router.post("/OwnerLogin", (req, res) => {
  console.log("Inside Owner Login Post Request");
  console.log(req.body.username);
  console.log(req.body.password);
  kafka.make_request("login_owner", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(404).json({
        message: "Authorization Failed",
        err: err
      });
    } else {
      console.log("Inside Owner Login Success");
      return res.status(200).json({
        message: "Authorization Successful",
        token: results
      });
    }
  });
});
module.exports = router;
