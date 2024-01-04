const mongoose = require("mongoose");

// used for hashing passwords
const bcrypt = require("bcrypt");

// used for validating email & password
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static sign up method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // check if email is already in db
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email is already in use");
  }

  // salt is used to fight against password matching
  // works by adding random string at the end of password
  const salt = await bcrypt.genSalt(10);

  // hash (encrypt) password with salt
  const hash = await bcrypt.hash(password, salt);

  // save new user in db
  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // don't allow empty fields
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // check if email exists in db
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email can't be found");
  }

  // check if passwords match
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error("Incorrect password");
  }

  // successful login
  return user;
};

module.exports = mongoose.model("User", userSchema);
