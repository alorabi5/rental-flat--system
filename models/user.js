// models/user.js
const mongoose = require("mongoose");

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
  flatsOwned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
