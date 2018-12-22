//Load Customer Model
const Properties = require("../../models/Properties");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  const newProperty = new Properties({
    ownermail: msg.ownermail,
    location: msg.location,
    headline: msg.headline,
    about: msg.about,
    propertytype: msg.propertytype,
    beds: msg.beds,
    accomodates: msg.accomodates,
    baths: msg.baths,
    photos: msg.photos,
    arrivedate: msg.arrivedate,
    departdate: msg.departdate,
    currtype: msg.currtype,
    price: msg.price,
    isbooked: msg.isbooked
  });

  console.log(newProperty);

  newProperty.save().then(
    property => {
      console.log("Property created : ", property);
      res.status = "200";
      res.value = "Success Listed Property";
      console.log(res.status);
      callback(null, res);
    },
    err => {
      console.log("Error Listing Property");
      res.status = "400";
      res.value = "Property not Listed";
      console.log(res.status);
      callback(null, res);
    }
  );
}

exports.handle_request = handle_request;
