// models/flat.js
const mongoose = require("mongoose");

const flatSchema = mongoose.Schema({
  price: {
    type: Number,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  isBooked: {
    type: Boolean,
    // require: true
  },
  imageUrl: {
    type: String,
    require: true
  },
  imageAlt: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },

  // Owner of the Flat
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  }
});

const Flat = mongoose.model("Flat", flatSchema);

module.exports = Flat;
