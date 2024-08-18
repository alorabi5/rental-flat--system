const mongoose = require("mongoose");

const flatSechema = new mongoose.Schema({
  img: {
    type: String,
  },
  location: {
    tyoe: String,
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
    tyoe: String,
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
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
