const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  name: {
    type: String,
    require: true
  },
  pwd: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model("user", userSchema);
