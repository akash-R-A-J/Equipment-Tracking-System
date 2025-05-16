const mongoose = require("mongoose");

const TransferRequestSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // walletAddress of sender
  receiver: { type: String, required: true }, // walletAddress of receiver
  serialNumber: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const TransferRequestModel = mongoose.model(
  "transfer-request",
  TransferRequestSchema
);

module.exports = { TransferRequestModel };
