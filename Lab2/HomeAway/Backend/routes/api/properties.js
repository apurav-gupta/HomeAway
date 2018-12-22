const express = require("express");
const router = express.Router();
const passport = require("passport");
var jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");
var kafka = require("../../kafka/client");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

//require('./app/routes')(app);
router.use(passport.initialize());

// Bring in defined Passport Strategy
require("../../config/passport")(passport);

const Property = require("../../models/Properties");

/************************** Listing Owner's Properties ********** */

router.post("/listProperty", (req, res) => {
  console.log("Inside lisitng a property");
  console.log(requireAuth);
  kafka.make_request("list_property", req.body, function(err, results) {
    console.log("In listing a property result call");
    console.log(results);
    console.log(results.status);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Lisitng a property failed"
      });
    } else {
      console.log(results.status);
      if (JSON.parse(results.status) === 200) {
        console.log("Inside Listing a property Success");
        return res.status(200).json(results);
      } else {
        console.log("Listing a property Failed");
        return res.status(400).json(results);
      }
    }
  });
});

/***************** Display Owner's Properties *********** */

router.post("/displayProperties", (req, res) => {
  console.log(requireAuth);
  console.log("Inside displaying owner's properties");
  console.log(req.body.ownermail);
  kafka.make_request("owner_properties", req.body, function(err, results) {
    console.log("In displaying owner's properties result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Displaying the properties failed"
      });
    } else {
      console.log("Inside Displaying the property Success");
      return res.status(200).json(results);
    }
  });
});

/***************** Booked Owner's Properties *********** */

router.post("/bookedProperties", (req, res) => {
  console.log("Inside displaying booked owner's properties");
  console.log(req.body.ownermail);
  kafka.make_request("owner_booked_properties", req.body, function(
    err,
    results
  ) {
    console.log("In displaying owner's booked properties result call");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(404).json({
        message: "Displaying the booked properties failed"
      });
    } else {
      console.log("Inside Displaying the booked properties Success");
      return res.status(200).json(results);
    }
  });
});

/***************** Display Properties after Seacrh ************ */
router.post("/propertyCardDisplay", (req, res) => {
  console.log("Inside Home Search property display");
  console.log(req.body.loc);
  console.log(req.body.arrdate);
  console.log(req.body.depdate);
  console.log(req.body.guests);

  kafka.make_request("home_search", req.body, function(err, results) {
    console.log("In displaying Home Search result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Displaying the Home Search display failed"
      });
    } else {
      console.log("All available properties are shown as per the search!");
      return res.status(200).json(results);
    }
  });
});

/******************** Display property after searching again onthe property display ***********/
/*******************  page after searching through HOME ******************************/

router.post("/searchProperties", (req, res) => {
  console.log("Inside card properrty display after again searching");
  console.log(req.body.location);
  console.log(req.body.arrivedate);
  console.log(req.body.departdate);
  console.log(req.body.accomodates);

  kafka.make_request("card_home_search", req.body, function(err, results) {
    console.log("In displaying Card Search result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Displaying the Card Search display failed"
      });
    } else {
      console.log("Inside Displaying the card search Success");
      return res.status(200).json(results);
    }
  });
});

/******* Display property details of a particular property by ID ********* */

router.get("/getPropertyDetailsByID", (req, res) => {
  console.log("Inside property details by ID");
  console.log(req.query.propertyID);

  kafka.make_request("property_display_byID", req.query, function(
    err,
    results
  ) {
    console.log("In unique property display result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Unique property display failed"
      });
    } else {
      console.log("Inside Displaying the unique property Success");
      return res.status(200).json(results);
    }
  });
});

/*************** Booking the property after property details page ******** */
router.post("/propertyBooking", (request, res) => {
  console.log("Inside booking a property");
  console.log(request.body.isbooked);
  console.log(request.body.custmail);
  console.log(request.body.bookstartdate);
  console.log(request.body.bookenddate);

  kafka.make_request("book_property", request.body, function(err, results) {
    console.log("In Booking property result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Booking the selected property failed"
      });
    } else {
      console.log("Booking property Success");
      return res.status(200).json(results);
    }
  });
});

module.exports = router;
