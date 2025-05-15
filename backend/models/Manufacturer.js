const mongoose = require("mongoose");

const ManufacturerSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  fullname: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  profileImage: { type: String }, // image path or URL

  // Company details
  companyName: { type: String },
  companyWebsite: { type: String },
  taxId: { type: String }, // GST/tax Id
  address: { type: String },
  document: { type: String }, // PDF path or URL

  verified: { type: Boolean },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("manufacturer", ManufacturerSchema);
