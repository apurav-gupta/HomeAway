const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");

//Load Owner Model
const Owners = require("../../models/Owners");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));
  Owners.findOne({ email: msg.email }).then(owner => {
    if (owner) {
      console.log("Owner already exists");
      res.status = "202";
      res.value = "Owner already exists";
      callback(null, res);
    } else {
      const newOwner = new Owners({
        firstname: msg.firstname,
        lastname: msg.lastname,
        email: msg.email,
        password: msg.password,
        phonenumber: msg.phonenumber
      });
      console.log(newOwner);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newOwner.password, salt, (err, hash) => {
          if (err) throw err;
          newOwner.password = hash;
          newOwner
            .save()
            .then(results => {
              console.log("New Owner signed up successfully");
              res.status = "200";
              res.value = "New Owner account created";
              console;
              callback(null, res);
            })
            .catch(err => callback(err, "Some error occured while signing up"));
        });
      });
    }
  });
}

exports.handle_request = handle_request;
