//Load Properties Model
const Properties = require("../../models/Properties");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  Properties.find({ ownermail: msg.ownermail }, function(err, dispProperty) {
    if (err) {
      console.log(err);
      res.code = "500";
      res.value = "Failure Display Property";
      callback(null, res);
    } else {
      if (dispProperty.length === 0) {
        res.code = "404";
        res.value = "Undefined Properties";
        callback(null, res);
      } else {
        console.log("Property Found");
        console.log(dispProperty);
        callback(null, dispProperty);
      }
    }
  });
}

exports.handle_request = handle_request;
