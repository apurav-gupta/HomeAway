const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");
const passport = require("passport");

// Load User model
const Customers = require("../../models/Customers");
const Owners = require("../../models/Owners");

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
          lastname: customer.lastname
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
      errors.email = "Email already exists";
      return res.status(400).json(errors);
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
  Owners.findOne({ username }).then(owner => {
    // Check for user
    if (!owner) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, owner.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          firstname: owner.firstname,
          lastname: owner.lastname,
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
        return res.status(400).json(errors);
      }
    });
  });
});

/**************** CUSTOMER PROFILE UPDATE ***************** */

router.get("/getData", (req, res) => {
  console.log("Inside update profile");
  console.log(req.body.email);
  Customers.findOne({ email: req.body.email })
    .populate("customer", ["firstname", "lastname"])
    .then(profile => {
      if (!profile) {
        console.log("No profile");
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      console.log("Profile");
      res.json(profile);
    })

    .catch(err => res.status(404).json(err));
});

router.post(
  "/Update",
  passport.authenticate("jwt", { session: false }),
  (request, res) => {
    console.log("inside update traveller profile");
    console.log(request.body.email);
    console.log(request.body.gender);

    const profileFields = {};
    //profileFields.customer = request.customer.email;
    if (request.body.firstname)
      profileFields.firstname = request.body.firstname;
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
  }
);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.customer.id,
      firstname: req.customer.firstname,
      lastname: req.customer.lastname,
      email: req.customer.email
    });
  }
);

module.exports = router;
