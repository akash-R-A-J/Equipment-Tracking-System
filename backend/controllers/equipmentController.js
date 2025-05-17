const { EquipmentModel } = require("../models/Equipment");
const { ManufacturerModel } = require("../models/Manufacturer");
const { TransferRequestModel } = require("../models/TransferRequest");

const addEquipment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, serialNumber } = req.body;
    const equipmentImage = req.files["equipmentImage"]?.[0]?.filename;
    const document = req.files["document"]?.[0]?.filename;
    
    const user = await ManufacturerModel.findById(userId);
    const currentOwner = user.walletAddress;
    
    const existing = await EquipmentModel.findOne({
      serialNumber,
      currentOwner,
    });
    if (existing) {
      return res
        .status(401)
        .json({ message: "You already have this equipment." });
    }

    const newEquipment = new EquipmentModel({
      name,
      serialNumber,
      currentOwner,
      equipmentImage,
      document,
      history: {
        action: "created",
        user: currentOwner,
        timestamp: new Date(),
      },
    });

    await newEquipment.save();
    console.log("Equipment added succesfully", newEquipment);

    res.status(201).json({ message: "Equipment added successfully." });
  } catch (error) {
    console.error("error while adding equipment", error);
    res.status(401).json({ error });
  }
};

// find equipment by currentOwner
const getEquipment = async (currentOwner) => {
  try {
    const equipments = await EquipmentModel.find({
      currentOwner,
    });
    console.log("equipments: " + equipments);
    return equipments;
  } catch (error) {
    console.error("No equipment found", error);
    return error;
  }
};

// assumes receiver is a user for now
const transferEquipment = async (req, res) => {
  try {
    const id = req.user.id;
    const { serialNumber, receiverKey } = req.body;

    const manufacturer = await ManufacturerModel.findById(id);
    if (!manufacturer) {
      return res.status(404).json({ message: "User not found" });
    }

    const equipment = await EquipmentModel.findOne({ serialNumber });
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (manufacturer.walletAddress !== equipment.currentOwner) {
      return res.status(403).json({ message: "Equipment not owned by you." });
    }

    const newRequest = new TransferRequestModel({
      sender: manufacturer.walletAddress,
      receiver: receiverKey,
      serialNumber,
      status: "pending",
      timestamp: new Date(),
    });

    await newRequest.save();

    console.log(newRequest);
    return res.status(201).json({ message: "Request sent successfully" });
  } catch (err) {
    console.error("Transfer error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addEquipment,
  getEquipment,
  transferEquipment,
};
