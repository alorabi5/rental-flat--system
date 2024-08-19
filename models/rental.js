const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
  startDate: {
    type: Date,
    // require: true
  },
  endDate: {
    type: Date,
    // require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flat",
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;