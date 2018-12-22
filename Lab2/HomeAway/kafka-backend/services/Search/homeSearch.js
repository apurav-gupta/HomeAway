//Load Properties Model
const Properties = require("../../models/Properties");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  var arrive_date = new Date(msg.arrdate);
  var depart_date = new Date(msg.depdate);
  console.log("Inside Home Property Kafka Backend");
  console.log(arrive_date);
  console.log(depart_date);
  console.log(msg.loc);
  console.log(msg.guests);

  Properties.find(
    {
      location: msg.loc,
      accomodates: { $gte: msg.guests },
      arrivedate: { $lte: arrive_date },
      departdate: { $gte: depart_date }
    },

    (err, result) => {
      if (err) {
        console.log("Something wrong when searching!");
        console.log(err);
        res.code = "400";
        res.value = "Something wrong when searching!";
        callback(null, res);
      } else {
        console.log(result);
        if (result === [])
          console.log("No properties available for your Search");
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
