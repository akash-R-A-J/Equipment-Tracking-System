const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  profileImage: { type: String }, // image path or URL
  createdAt: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
}
