//Load Messages Model
const Messages = require("../../models/Messages");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  Messages.update(
    {
      $and: [
        {
          customer_mail: msg.customer_mail
        },
        {
          property_id: msg.prop_id
        }
      ]
    },
    { $set: { owner_message: msg.reply } }
  ).then(reply => callback(null, reply));
}

exports.handle_request = handle_request;
