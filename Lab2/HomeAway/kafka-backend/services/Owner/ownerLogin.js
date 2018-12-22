const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");

//Load Owner Model
const Owners = require("../../models/Owners");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.username;
  var password = msg.password;
  console.log("In handle request:" + JSON.stringify(msg));
  // Find user by email
  Owners.findOne({ email: msg.username }).then(owner => {
    // Check for user
    if (!owner) {
      res.status = "202";
      res.value = "Owner doesn't exists";
      console.log(res.value);
      callback(null, res);
    }
    // Check Password
    else {
      console.log("Inside Check Password:");
      bcrypt
        .compare(password, owner.password)
        .then(isMatch => {
          console.log("Inside Password Matches");
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
                console.log("Logged in Successfully!!");
                token.status = 200;
                callback(null, token);
                //   res.json({
                //     success: true,
                //     token: "Bearer " + token
                //   });
              }
            );
          }
        })
        .catch(err => {
          console.log("Password Wrong");
          callback(err, "Password Wrong");
        });
    }
  });
}

exports.handle_request = handle_request;
