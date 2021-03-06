//Load Messages Model
const Messages = require("../../models/Messages");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  Messages.find({ customer_mail: msg.email })
    .then(messages => {
      if (!messages) {
        console.log("No Messages for Travelller");
        callback(err, "Message not present");
      }
      console.log("Messages for traveller");
      console.log(messages);
      callback(null, messages);
    })

    .catch(err => callback(err, "Message not received"));
}

exports.handle_request = handle_request;
