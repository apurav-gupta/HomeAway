var connection = new require("./kafka/Connection");
var { mongoose } = require("./mongo");

var ownerLogin = require("./services/Owner/ownerLogin.js");
var travellerLogin = require("./services/Customer/travellerLogin.js");
var customerSignUp = require("./services/Customer/customerSignUp.js");
var ownerSignUp = require("./services/Owner/ownerSignUp.js");
var travelProfile = require("./services/Customer/travelProfile.js");
var updateProfile = require("./services/Customer/updateProfile.js");
var travellerBookings = require("./services/Customer/travellerBookings.js");
var listProperty = require("./services/Owner/listProperty");
var displayOwnerProperties = require("./services/Owner/displayOwnerProperties");
var homeSearch = require("./services/Search/homeSearch");
var cardSearch = require("./services/Search/cardSearch");
var propertyDisplay = require("./services/Search/propertyByID");
var ownerBooked = require("./services/Owner/ownerBooked");
var bookProperty = require("./services/Search/bookProperty");
var bookMessage = require("./services/Messages/bookMessage");
var getOwnerMessage = require("./services/Messages/getOwnerMessage");
var getTravellerMessage = require("./services/Messages/getTravellerMessage");
var ownerReply = require("./services/Messages/ownerReply");

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();

  console.log("server is running ");

  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);

    console.log(JSON.stringify(message.value));

    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest("customer_signup", customerSignUp);
handleTopicRequest("owner_signup", ownerSignUp);
handleTopicRequest("login_owner", ownerLogin);
handleTopicRequest("travel_profile", travelProfile);
handleTopicRequest("traveller_login", travellerLogin);
handleTopicRequest("update_profile", updateProfile);
handleTopicRequest("traveller_bookings", travellerBookings);
handleTopicRequest("list_property", listProperty);
handleTopicRequest("owner_properties", displayOwnerProperties);
handleTopicRequest("home_search", homeSearch);
handleTopicRequest("card_home_search", cardSearch);
handleTopicRequest("property_display_byID", propertyDisplay);
handleTopicRequest("owner_booked_properties", ownerBooked);
handleTopicRequest("book_property", bookProperty);

/******** Messging Topics: ******** */
handleTopicRequest("book_message", bookMessage);
handleTopicRequest("owner_reply", ownerReply);
handleTopicRequest("traveller_inbox", getOwnerMessage);
handleTopicRequest("owner_inbox", getTravellerMessage);

// handleTopicRequest("traveller_login", travellerLogin);
// handleTopicRequest("traveller_login", travellerLogin);
