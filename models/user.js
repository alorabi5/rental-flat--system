const mongoose = require("mongoose");

const flatSechema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  descrption: {
    type: String,
    required: true,
  },
});
const rentalSechema = new mongoose.Schema({
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
    required: true,
  },
  flat: [flatSechema],
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  isOwner: {
    type: Boolean,
    required: true,
  },
  flat: [rentalSechema],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
