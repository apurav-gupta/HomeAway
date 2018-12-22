//Load Customer Model
const Customers = require("../../models/Customers");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  const profileFields = {};
  if (msg.firstname) profileFields.firstname = msg.firstname;
  if (msg.lastname) profileFields.lastname = msg.lastname;
  if (msg.email) profileFields.email = msg.email;
  if (msg.profileimage) profileFields.profileimage = msg.profileimage;
  if (msg.about) profileFields.about = msg.about;
  if (msg.street) profileFields.street = msg.street;
  if (msg.city) profileFields.city = msg.city;
  if (msg.state) profileFields.state = msg.state;
  if (msg.country) profileFields.country = msg.country;
  if (msg.work) profileFields.work = msg.work;
  if (msg.school) profileFields.school = msg.school;
  if (msg.hometown) profileFields.hometown = msg.hometown;
  if (msg.gender) profileFields.gender = msg.gender;
  if (msg.primarycontact) profileFields.primarycontact = msg.primarycontact;
  if (msg.secondarycontact)
    profileFields.secondarycontact = msg.secondarycontact;

  Customers.findOne({ email: msg.email }).then(customer => {
    console.log(msg.email);
    if (customer) {
      console.log("Updating the traveller information");
      console.log(profileFields);
      Customers.findOneAndUpdate(
        { email: msg.email },
        { $set: profileFields },
        { new: true }
      ).then(customer => callback(null, customer));
    }
  });
}

exports.handle_request = handle_request;
