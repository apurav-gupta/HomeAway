const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  profileimage: {
    type: String,
    required: false
  },

  about: {
    type: String,
    required: false
  },

  street: {
    type: String,
    required: false
  },

  city: {
    type: String,
    required: false
  },

  state: {
    type: String,
    required: false
  },

  country: {
    type: String,
    required: false
  },

  work: {
    type: String,
    required: false
  },

  school: {
    type: String,
    required: false
  },

  hometown: {
    type: String,
    required: false
  },

  gender: {
    type: String,
    required: false
  },

  primarycontact: {
    type: String,
    required: false
  },

  secondarycontact: {
    type: String,
    required: false
  }
});

module.exports = Customers = mongoose.model("customers", CustomerSchema);
