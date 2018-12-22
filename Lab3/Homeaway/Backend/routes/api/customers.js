const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");
const passport = require("passport");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

// Load User model
const Customers = require("../../models/Customers");
const Properties = require("../../models/Properties");
const Messages = require("../../models/Messages");

/********************* CUSTOMER LOGIN ********************* */

router.post("/CustomerLogin", (req, res) => {
  console.log("Customer Login");

  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body.username);
  console.log(req.body.password);

  // Find user by email
  Customers.findOne({ email: req.body.username }).then(customer => {
    // Check for user
    if (!customer) {
      console.log(email);
      console.log("User not found!!");
      return res.status(404).json("User not found");
    }

    // Check Password
    bcrypt.compare(password, customer.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          firstname: customer.firstname,
          lastname: customer.lastname,
          email: customer.email
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          dbkey.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        console.log("Password wrong!!");
        return res.status(400).json("Password Wrong!!");
      }
    });
  });
});

/**************** CUSTOMER SIGN UP ***************** */

router.post("/CustomerSignup", (request, res) => {
  console.log("inside customer sign up");

  Customers.findOne({ email: request.body.email }).then(customer => {
    if (customer) {
      console.log("Traveller already exists");
      return res.sendStatus(400);
    } else {
      const newCustomer = new Customers({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        password: request.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) throw err;
          newCustomer.password = hash;
          newCustomer
            .save()
            .then(customer => res.json(customer))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**************** CUSTOMER PROFILE UPDATE ***************** */

router.get("/getData", (req, res) => {
  console.log("Inside update profile");
  console.log(req.query.email);
  Customers.findOne({ email: req.query.email })
    .then(profile => {
      if (!profile) {
        console.log("No profile");
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      console.log("Profile");
      console.log(profile);
      res.json(profile);
    })

    .catch(err => res.status(404).json(err));
});

router.post("/Update", (request, res) => {
  console.log("inside update traveller profile");
  console.log(request.body.email);
  console.log(request.body.gender);

  const profileFields = {};
  if (request.body.firstname) profileFields.firstname = request.body.firstname;
  if (request.body.lastname) profileFields.lastname = request.body.lastname;
  if (request.body.email) profileFields.email = request.body.email;
  if (request.body.profileimage)
    profileFields.profileimage = request.body.profileimage;
  if (request.body.about) profileFields.about = request.body.about;
  if (request.body.street) profileFields.street = request.body.street;
  if (request.body.city) profileFields.city = request.body.city;
  if (request.body.state) profileFields.state = request.body.state;
  if (request.body.country) profileFields.country = request.body.country;
  if (request.body.work) profileFields.work = request.body.work;
  if (request.body.school) profileFields.school = request.body.school;
  if (request.body.hometown) profileFields.hometown = request.body.hometown;
  if (request.body.gender) profileFields.gender = request.body.gender;
  if (request.body.primarycontact)
    profileFields.primarycontact = request.body.primarycontact;
  if (request.body.secondarycontact)
    profileFields.secondarycontact = request.body.secondarycontact;

  Customers.findOne({ email: request.body.email }).then(customer => {
    console.log(request.body.email);
    if (customer) {
      console.log("Updating the traveller information");
      console.log(profileFields);
      Customers.findOneAndUpdate(
        { email: request.body.email },
        { $set: profileFields },
        { new: true }
      ).then(customer => res.json(customer));
    }
  });
});

/************************ Traveller Bookings ****************** */

router.post("/travellerBookings", (req, res) => {
  console.log(req.body.travellermail);
  Properties.find({ customermail: req.body.travellermail }, function(
    err,
    dispProperty
  ) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (dispProperty.length === 0) {
        res.status(404).send("undefined");
      } else {
        console.log("Property Found");
        console.log(dispProperty);
        res.status(200).send(dispProperty);
      }
    }
  });
});

/*********Getting owner messages to Traveller Inbox ********** */
router.get("/receiveCustomerMessage", (req, res) => {
  console.log("Inside getting owner send messages to Traveller");
  console.log(req.query);
  Messages.find({ customer_mail: req.query.email })
    .then(messages => {
      if (!messages) {
        console.log("No Messages for Travelller");
        return res.status(404).json(err);
      }
      console.log("Messages for traveller");
      console.log(messages);
      res.json(messages);
    })

    .catch(err => res.status(404).json(err));
});

/**************** Getting Traveller message from Traveller Booking ********** */

router.post("/postMessage", (request, res) => {
  console.log("Inside getting the message");
  const newMessage = new Messages({
    customer_mail: request.body.customer_mail,
    owner_mail: request.body.owner_mail,
    traveller_message: request.body.message,
    property_id: request.body.property_id,
    property_name: request.body.property_name
  });
  console.log(newMessage);
  newMessage.save().then(
    message => {
      console.log("Message saved : ", message);
      res.sendStatus(200).end();
    },
    err => {
      console.log("Error Saving Message");
      console.log(err);
      res.sendStatus(400).end();
    }
  );
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
