//Load Properties  Model
const Properties = require("../../models/Properties");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.travellermail;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  Properties.find({ customermail: msg.travellermail }, function(
    err,
    dispProperty
  ) {
    if (err) {
      console.log(err);
      callback(err, "Bookings Display Failed");
    } else {
      if (dispProperty.length === 0) {
        callback(null, "Undefined");
      } else {
        console.log("Property Found");
        console.log(dispProperty);
        callback(null, dispProperty);
      }
    }
  });
}

exports.handle_request = handle_request;
