const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptJS = require("bcrypt");
const Users = new mongoose.Schema({
  // everyone
  // Common fields
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please Email Id"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  userimage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

// password hashing
Users.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptJS.hash(this.password, 10);
});

//  JWT token
Users.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password
Users.methods.comparePassword = async function (enterpassword) {
  return await bcryptJS.compare(enterpassword, this.password);
};

module.exports = mongoose.model("Users", Users);
