const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");
const passport = require("passport");

const Property = require("../../models/Properties");

router.post(
  "/propertylist",
  passport.authenticate("jwt", { session: false }),
  (request, res) => {
    console.log("Inside lisitng a property");

    Property.findOne({ email: request.body.email }).then(property => {
      if (property) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newProperty = new Properties({
          ownermail: request.body.ownermail,
          location: request.body.location,
          headline: request.body.headline,
          about: request.body.about,
          propertytype: request.body.propertytype,
          beds: request.body.beds,
          accomodates: request.body.accomodates,
          baths: request.body.baths,
          arrivedate: request.body.arrivedate,
          departdate: request.body.departdate,
          currtype: request.body.currtype,
          price: request.body.price
        });
      }
    });
  }
);
