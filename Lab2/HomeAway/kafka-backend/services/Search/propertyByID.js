//Load Properties Model
const Properties = require("../../models/Properties");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  Properties.findOne({ _id: msg.propertyID }, function(err, propertyDetail) {
    if (err) {
      console.log("Something wrong when displaying!");
      console.log(err);
      res.code = "400";
      res.value = "Something wrong when displaying!";
      callback(null, res);
    } else {
      if (propertyDetail.length === 0) {
        res.code = "404";
        res.value = "Undefined Properties";
        callback(null, res);
      } else {
        console.log("Property Found");
        console.log(propertyDetail);
        callback(null, propertyDetail);
      }
    }
  });
}

exports.handle_request = handle_request;
