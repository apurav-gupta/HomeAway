//Load Properties Model
const Properties = require("../../models/Properties");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  var arrive_date = new Date(msg.arrivedate);
  var depart_date = new Date(msg.departdate);
  console.log("Inside Re property Search Kafka Backend");
  console.log(arrive_date);
  console.log(depart_date);
  console.log(msg.location);
  console.log(msg.guests);

  Properties.find(
    {
      location: msg.location,
      arrivedate: { $lte: arrive_date },
      departdate: { $gte: depart_date },
      accomodates: { $gte: msg.accomodates }
    },

    (err, result) => {
      if (err) {
        console.log("No Properties available in the database for your search!");
        console.log(err);
        res.code = "400";
        res.value = "Something wrong when searching!";
        callback(null, res);
      } else {
        console.log("Successful Search");
        console.log(result);
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
