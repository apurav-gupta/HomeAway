const express = require("express");
const router = express.Router();
const passport = require("passport");
var jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");

// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

//require('./app/routes')(app);
router.use(passport.initialize());

// Bring in defined Passport Strategy
require("../../config/passport")(passport);

const Property = require("../../models/Properties");

/************ Listing Owner's Properties ********** */
router.post("/listProperty", requireAuth, (request, res) => {
  console.log("Inside lisitng a property");
  console.log(requireAuth);
  const newProperty = new Properties({
    ownermail: request.body.ownermail,
    location: request.body.location,
    headline: request.body.headline,
    about: request.body.about,
    propertytype: request.body.propertytype,
    beds: request.body.beds,
    accomodates: request.body.accomodates,
    baths: request.body.baths,
    photos: request.body.photos,
    arrivedate: request.body.arrivedate,
    departdate: request.body.departdate,
    currtype: request.body.currtype,
    price: request.body.price
  });
  console.log(newProperty);
  newProperty.save().then(
    property => {
      console.log("Property created : ", property);
      res.sendStatus(200).end();
    },
    err => {
      console.log("Error Listing Property");
      console.log(err);
      res.sendStatus(400).end();
    }
  );
});

/***************** Display Owner's Properties *********** */

router.post("/displayProperties", requireAuth, (req, res) => {
  // console.log(requireAuth);
  console.log(requireAuth);
  console.log("Inside displaying owner's properties");
  console.log(req.body.ownermail);
  Property.find({ ownermail: req.body.ownermail }, function(err, dispProperty) {
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

/***************** Booked Owner's Properties *********** */

router.post("/bookedProperties", requireAuth, (req, res) => {
  console.log(req.body.ownermail);
  Property.find(
    {
      $and: [
        { $or: [{ ownermail: req.body.ownermail }] },
        { $or: [{ isbooked: true }] }
      ]
    },
    function(err, dispProperty) {
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
    }
  );
});

/***************** Display Properties after Seacrh ************ */
router.post("/propertyCardDisplay", requireAuth, (req, res) => {
  console.log("Inside card properrty display");
  console.log(req.body.loc);
  console.log(req.body.arrdate);
  console.log(req.body.depdate);
  console.log(req.body.guests);
  var arrive_date = new Date(req.body.arrdate);
  var depart_date = new Date(req.body.depdate);
  Property.find(
    {
      location: req.body.loc,
      arrivedate: { $lte: arrive_date },
      departdate: { $gte: depart_date },
      accomodates: { $gte: req.body.guests }
    },

    (err, result) => {
      if (err) {
        console.log("Something wrong when searching!");
        res.sendStatus(400).end();
      } else {
        res.status(200).send(result);
      }
    }
  );
});

/******************** Display property after searching again onthe property display ***********/
/*******************  page after searching through HOME ******************************/

router.post("/searchProperties", requireAuth, (req, res) => {
  console.log("Inside card properrty display after again searching");
  console.log(req.body.location);
  console.log(req.body.arrivedate);
  console.log(req.body.departdate);
  console.log(req.body.accomodates);
  var arrive_date = new Date(req.body.arrivedate);
  var depart_date = new Date(req.body.departdate);
  Property.find(
    {
      location: req.body.location,
      arrivedate: { $lte: arrive_date },
      departdate: { $gte: depart_date },
      accomodates: { $gte: req.body.accomodates }
    },

    (err, result) => {
      if (err) {
        console.log("Something wrong when searching!");
        res.sendStatus(400).end();
      } else {
        res.status(200).send(result);
      }
    }
  );
});

/******* Display property details of a particular property by ID ********* */

router.get("/getPropertyDetailsByID", (req, res) => {
  console.log("Inside property details by ID");
  console.log(req.query.propertyID);
  Property.findOne({ _id: req.query.propertyID }, function(
    err,
    propertyDetail
  ) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (propertyDetail.length === 0) {
        res.status(404).send("undefined");
      } else {
        console.log("Property Found");
        console.log(propertyDetail);
        res.status(200).send(propertyDetail);
      }
    }
  });
});

/*************** Booking the property after property details page ******** */
router.post("/propertyBooking", requireAuth, (request, res) => {
  console.log("Inside booking a property");
  console.log(request.body.isbooked);
  console.log(request.body.custmail);
  console.log(request.body.bookstartdate);
  console.log(request.body.bookenddate);
  var book_start_date = new Date(request.body.bookstartdate);
  var book_end_date = new Date(request.body.bookenddate);

  Property.update(
    { _id: request.body.property_id },
    {
      $set: {
        isbooked: request.body.isbooked,
        customermail: request.body.custmail,
        bookstartdate: book_start_date,
        bookenddate: book_end_date
      }
    }
  )
    .then(result => {
      console.log("Successfully booked the property");
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//   Property.findOne({ _id: request.body.property_id }).then(book => {
//     console.log(request.body.isbooked);
//     console.log(request.body.custmail);
//     if (book) {
//       console.log("Boooking the property for a particular traveller");
//       Property.findOneAndUpdate({
//         $set: {
//           isbooked: request.body.isbooked,
//           customermail: request.body.customermail
//         }
//       }).then(book => res.json(book));
//     }
//   });
// });

module.exports = router;
