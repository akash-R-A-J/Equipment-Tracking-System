const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true },
  currentOwner: { type: String, required: true }, // user/manufacturer publickey or objectId
  equipmentImage: { type: String }, // url or path to image
  document: { type: String }, // url of path to file

  history: [
    {
      action: { type: String, required: true }, // created, transferred
      user: { type: String, required: true }, // who performed this action
      transaction: { type: String }, // while transferring ownership
      timestamp: { type: Date, default: Date.now() },
    },
  ],
});

const EquipmentModel = mongoose.model("equipments", EquipmentSchema);

module.exports = {
  EquipmentModel,
}
