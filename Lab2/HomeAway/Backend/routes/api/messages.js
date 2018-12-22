const express = require("express");
const router = express.Router();
const dbkey = require("../../config/keys");
const passport = require("passport");
var kafka = require("../../kafka/client");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

// Load User model
const Messages = require("../../models/Messages");

/**************** Getting Traveller message from Traveller Booking ********** */

router.post("/postMessage", (request, res) => {
  console.log("Inside getting the message from traveller Booking");

  kafka.make_request("book_message", request.body, function(err, results) {
    console.log("In traveller sending message from booking page result call");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(404).json({
        message: "Sending traveller messages failed"
      });
    } else {
      console.log("Inside Success traveller sending messages to owner");
      return res.status(200).json(results);
    }
  });
});

/*********Getting owner messages to Traveller Inbox ********** */
router.get("/receiveCustomerMessage", (req, res) => {
  console.log("Inside getting owner send messages to Traveller");
  console.log(req.query.email);
  kafka.make_request("traveller_inbox", req.query, function(err, results) {
    console.log("In get Owner reply at Traveller Inbox");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Getting the Owner message in Traveller Inbox Failed"
      });
    } else {
      console.log("Inside getting Owner message in traveller Inbox Success");
      return res.status(200).json(results);
    }
  });
});

/*********************** Getting Traveller messages ************* */

router.get("/receiveOwnerMessage", (req, res) => {
  console.log("Inside getting traveller send messages to Owner Inbox");
  console.log(req.query.email);
  kafka.make_request("owner_inbox", req.query, function(err, results) {
    console.log("In get Traveller reply at Owner Inbox");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(404).json({
        message: "Getting the Traveller message in Owner Inbox Failed"
      });
    } else {
      console.log("Inside getting Traveller message in owner Inbox Success");
      return res.status(200).json(results);
    }
  });
});

/************* replying back to the traveller ********** */
router.post("/sendOwnerMessage", (request, res) => {
  console.log("inside sending reply back to the traveller");
  console.log(request.body.customer_mail);
  console.log(request.body.reply);
  console.log(request.body.prop_id);

  console.log("Updating the owner reply to traveller");
  kafka.make_request("owner_reply", request.body, function(err, results) {
    console.log("In replying back to the traveller result call");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(404).json({
        message: "Replying back Failed"
      });
    } else {
      console.log("Inside Replying back to the traveller Success");
      return res.status(200).json(results);
    }
  });
});

module.exports = router;
