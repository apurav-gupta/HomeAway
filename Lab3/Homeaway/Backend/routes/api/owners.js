const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");
const passport = require("passport");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

// Load User model
const Owners = require("../../models/Owners");
const Messages = require("../../models/Messages");

/*********************OWNER SIGN UP******************** */

router.post("/OwnerSignup", (request, res) => {
  console.log("inside owner sign up");

  Owners.findOne({ email: request.body.email }).then(owner => {
    if (owner) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newOwner = new Owners({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        password: request.body.password,
        phonenumber: request.body.phonenumber
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newOwner.password, salt, (err, hash) => {
          if (err) throw err;
          newOwner.password = hash;
          newOwner
            .save()
            .then(owner => res.json(owner))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/****************OWNER LOGIN ******************************* */

router.post("/OwnerLogin", (req, res) => {
  console.log("Owner Login");
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body.username);
  console.log(req.body.password);

  // Find user by email
  Owners.findOne({ email: req.body.username }).then(owner => {
    // Check for user
    if (!owner) {
      return res.status(404).json("User not found");
    }

    // Check Password
    bcrypt.compare(password, owner.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          firstname: owner.firstname,
          lastname: owner.lastname,
          email: owner.email,
          phonenumber: owner.phonenumber
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
        errors.password = "Password incorrect";
        console.log("Password wrong");
        return res.status(400).json(errors);
      }
    });
  });
});

/*********************** Getting Traveller messages ************* */

router.get("/receiveOwnerMessage", (req, res) => {
  console.log("Inside getting traveller send messages to Owner");
  console.log(req.query);
  Messages.find({ owner_mail: req.query.email })
    .then(messages => {
      if (!messages) {
        console.log("No Messages for Owner");
        return res.status(404).json(err);
      }
      console.log("Messages for owner");
      console.log(messages);
      res.json(messages);
    })

    .catch(err => res.status(404).json(err));
});

/************* replying back to the traveller ********** */
router.post("/sendOwnerMessage", (request, res) => {
  console.log("inside sending reply back to the traveller");
  console.log(request.body.customer_mail);
  console.log(request.body.reply);
  console.log(request.body.prop_id);

  console.log("Updating the owner reply to traveller");

  Messages.update(
    {
      $and: [
        {
          customer_mail: request.body.customer_mail
        },
        {
          property_id: request.body.prop_id
        }
      ]
    },
    { $set: { owner_message: request.body.reply } }
  ).then(reply => res.json(reply));
});

module.exports = router;
