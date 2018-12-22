const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbkey = require("../../config/keys");

//Load Owner Model
const Customers = require("../../models/Customers");

function handle_request(msg, callback) {
  var res = {};
  console.log("In Kafka-backend:");
  console.log("In handle request:" + JSON.stringify(msg));
  Customers.findOne({ email: msg.email }).then(customer => {
    if (customer) {
      console.log("Traveller already exists");
      res.status = "202";
      res.value = "Traveller already exists";
      callback(null, res);
    } else {
      const newCustomer = new Customers({
        firstname: msg.firstname,
        lastname: msg.lastname,
        email: msg.email,
        password: msg.password
      });
      console.log(newCustomer);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) throw err;
          newCustomer.password = hash;
          newCustomer
            .save()
            .then(results => {
              console.log("New Traveller signed up successfully");
              res.status = "200";
              res.value = "New Traveller account created";
              callback(null, res);
            })
            .catch(err => callback(err, "Some error occured while signing up"));
        });
      });
    }
  });
}

exports.handle_request = handle_request;
