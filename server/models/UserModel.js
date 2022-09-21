const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    forename: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    isAdmin: { // Created user will never be admin
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // Created at and Updated at times logged
);

module.exports = mongoose.model("UserModel", UserSchema);