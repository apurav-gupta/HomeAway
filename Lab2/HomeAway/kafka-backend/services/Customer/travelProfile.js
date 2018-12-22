//Load Customer Model
const Customers = require("../../models/Customers");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  Customers.findOne({ email: msg.email })
    .then(profile => {
      if (!profile) {
        console.log("No profile");
        errors.noprofile = "There is no profile for this user";
        callback(err, "Profile doesn't exists");
      }
      console.log("Profile");
      console.log(profile);
      callback(null, profile);
    })

    .catch(err => callback(err, "Profile failed"));
}

exports.handle_request = handle_request;
