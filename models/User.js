const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  name: String,
  email: String,
  avatarUrl: String,
  linkedin: { type: String, default: "" },
  source: { type: String, default: "" },
  isNewUser: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);