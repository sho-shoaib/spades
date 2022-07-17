const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 10000,
    min: 0
  },
  password: {
    type: String,
    required: true
  },
  eth: {
    type: Number,
    min: 0,
    default: 1,
    required: true
  },
  bnb: {
    type: Number,
    default: 1,
    min: 0
  },
  matic: {
    type: Number,
    default: 1,
    min: 0
  },
  wsol: {
    type: Number,
    default: 1,
    min: 0
  },
  wbnb: {
    type: Number,
    default: 1,
    min: 0
  },
  usdt: {
    type: Number,
    default: 1,
    min: 0
  },
  usdc: {
    type: Number,
    default: 1,
    min: 0
  },
  busd: {
    type: Number,
    default: 1,
    min: 0
  },

});

const User = mongoose.model("User", UserSchema);

module.exports = User;