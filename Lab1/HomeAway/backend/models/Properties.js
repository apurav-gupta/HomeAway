const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  ownermail: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  headline: {
    type: String,
    required: true
  },

  about: {
    type: String,
    required: true
  },

  propertytype: {
    type: String,
    required: true
  },

  beds: {
    type: String,
    required: true
  },

  accomodates: {
    type: String,
    required: true
  },

  baths: {
    type: String,
    required: true
  },

  photos: {
    type: String,
    required: true
  },

  arrivedate: {
    type: String,
    required: true
  },

  departdate: {
    type: String,
    required: true
  },

  currtype: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  isbooked: {
    type: String,
    required: true
  },

  customermail: {
    type: String,
    required: true
  }
});

module.exports = Properties = mongoose.model("properties", PropertySchema);
