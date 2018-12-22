const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");

//Load Customer Model
const Customers = require("../../models/Customers");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.username;
  var password = msg.password;
  console.log("In handle request:" + JSON.stringify(msg));

  // Find user by email
  Customers.findOne({ email: msg.username }).then(customer => {
    // Check for user
    if (!customer) {
      res.status = "202";
      res.value = "Traveller Doesn't Exist";
      console.log(res.value);
      callback(null, res);
    }

    // Check Password
    else {
      bcrypt
        .compare(password, customer.password)
        .then(isMatch => {
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
                console.log("Traveller Logged in Successfully!!");
                callback(null, token);
              }
            );
          } else {
            res.status = "202";
            res.value = "Password Wrong";
            console.log(res.value);
            callback(null, res);
          }
        })
        .catch(err => {
          callback(err, "Password Wrong");
        });
    }
  });
}

exports.handle_request = handle_request;
