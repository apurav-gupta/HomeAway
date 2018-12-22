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
    type: Number,
    required: true
  },

  accomodates: {
    type: Number,
    required: true
  },

  baths: {
    type: Number,
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
    type: Date,
    required: false
  },

  bookenddate: {
    type: Date,
    required: false
  },

  currtype: {
    type: String,
    required: true
  },

  price: {
    type: Number,
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
