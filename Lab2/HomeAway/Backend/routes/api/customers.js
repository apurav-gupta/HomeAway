const express = require("express");
const router = express.Router();
const dbkey = require("../../config/keys");
const passport = require("passport");
var kafka = require("../../kafka/client");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

// Load User model
const Customers = require("../../models/Customers");
// const Properties = require("../../models/Properties");

/********************* CUSTOMER LOGIN ********************* */
router.post("/CustomerLogin", (req, res) => {
  console.log("Inside Traveller Login Post Request");
  console.log(req.body.username);
  console.log(req.body.password);
  kafka.make_request("traveller_login", req.body, function(err, results) {
    console.log("In Traveller Login");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(404).json({
        message: "Authorization Failed",
        err: err
      });
    } else {
      console.log("Password Wrong");
      return res.status(200).json({
        message: "Authorization Successful",
        token: results
      });
    }
  });
});

/**************** CUSTOMER SIGN UP ***************** */

router.post("/CustomerSignup", (request, res) => {
  console.log("Inside Traveller sign up");
  console.log(request.body.firstname);
  console.log(request.body.lastname);
  console.log(request.body.email);
  console.log(request.body.password);

  kafka.make_request("customer_signup", request.body, function(err, results) {
    console.log("In Traveller Sign Up result call");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(203).send();
    } else {
      if (results.status == 200) {
        console.log("Inside Traveller Sign Up Success");
        return res.status(200).send(results);
      } else {
        console.log("Sign Up Failed");
        return res.status(202).send("Sign Up Failed");
      }
    }
  });
});

/**************** CUSTOMER PROFILE UPDATE ***************** */

router.get("/getData", (req, res) => {
  console.log("Inside grtting profile");
  console.log(req.query.email);
  kafka.make_request("travel_profile", req.query, function(err, results) {
    console.log("In get profile result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Updating the profile failed"
      });
    } else {
      console.log("Inside getting profile Success");
      return res.status(200).json(results);
    }
  });
});

router.post("/Update", (request, res) => {
  console.log("inside update traveller profile");
  console.log(request.body.email);
  console.log(request.body.gender);
  kafka.make_request("update_profile", request.body, function(err, results) {
    console.log("In update profile result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Updating the profile failed"
      });
    } else {
      console.log("Inside update profile Success");
      return res.status(200).json(results);
    }
  });
});

/************************ Traveller Bookings ****************** */

router.post("/travellerBookings", (req, res) => {
  console.log(req.body.travellermail);

  kafka.make_request("traveller_bookings", req.body, function(err, results) {
    console.log("In traveller bookings result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Getting Travel Bookings failed"
      });
    } else {
      console.log("Successfully Displaying Taveler's booked properties");
      return res.status(200).json(results);
    }
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get("/current", requireAuth, (req, res) => {
  res.json({
    id: req.customer.id,
    firstname: req.customer.firstname,
    lastname: req.customer.lastname,
    email: req.customer.email
  });
});

module.exports = router;
