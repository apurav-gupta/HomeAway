const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  customer_mail: {
    type: String,
    required: false
  },

  owner_mail: {
    type: String,
    required: false
  },

  owner_message: {
    type: String,
    required: false
  },

  traveller_message: {
    type: String,
    required: false
  },

  property_id: {
    type: String,
    required: false
  },

  property_name: {
    type: String,
    required: false
  }
});

module.exports = Messages = mongoose.model("messages", messageSchema);
