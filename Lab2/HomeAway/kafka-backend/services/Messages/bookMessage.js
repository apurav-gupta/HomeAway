//Load Messages Model
const Messages = require("../../models/Messages");

function handle_request(msg, callback) {
  var res = {};
  var email = msg.email;
  console.log("In handle request:" + JSON.stringify(msg));
  console.log("query: " + JSON.stringify(email));

  const newMessage = new Messages({
    customer_mail: msg.customer_mail,
    owner_mail: msg.owner_mail,
    traveller_message: msg.message,
    property_id: msg.property_id,
    property_name: msg.property_name
  });

  console.log(newMessage);

  newMessage.save().then(
    message => {
      console.log("Message send to Owner: ", message);
      res.code = "200";
      res.value = "Success Sending Message to Owner";
      callback(null, res);
    },
    err => {
      console.log("Error Sending Message");
      console.log(err);
      res.code = "400";
      res.value = "Unsuccessfull";
      callback(err, "Message not send properly");
    }
  );
}

exports.handle_request = handle_request;
