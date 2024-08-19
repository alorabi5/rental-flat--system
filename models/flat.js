const mongoose = require("mongoose");

const flatSchema = mongoose.Schema({
  price: {
    type: Number,
    // require: true
  },
  location: {
    type: String,
    // require: true
  },
  isBooked: {
    type: Boolean,
    // require: true
  },
  imageUrl: {
    type: String,
    // require: true
  },
  imageAlt: {
    type: String,
    // require: true
  },
  description: {
    type: String,
    // require: true
  },
});

const Flat = mongoose.model("Flat", flatSchema);

module.exports = Flat;
