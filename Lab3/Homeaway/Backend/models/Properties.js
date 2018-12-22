const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  ownermail: {
    type: String,
    required: true
  },

  location: {
    type: String,
    uppercase: true,
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
    required: false
  },

  arrivedate: {
    type: Date,
    required: false
  },

  departdate: {
    type: Date,
    required: false
  },

  bookstartdate: {
    type: String,
    required: false
  },

  bookenddate: {
    type: String,
    required: false
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
    type: Boolean,
    required: false
  },

  customermail: {
    type: String,
    required: false
  }
});

module.exports = Properties = mongoose.model("properties", PropertySchema);
