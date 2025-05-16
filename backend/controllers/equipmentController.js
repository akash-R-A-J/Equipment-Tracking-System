const { EquipmentModel } = require("../models/Equipment");

const addEquipment = async (req, res) => {
  try {
    const { name, serialNumber, currentOwner } = req.body;
    const equipmentImage = req.files["equipmentImage"]?.[0]?.filename;
    const document = req.files["document"]?.[0]?.filename;

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
    });

    await newEquipment.save();
    console.log("Equipment added succesfully", newEquipment);

    res.status(201).json({ message: "Equipment added successfully." });
  } catch (error) {
    console.error("error while adding equipment", error);
    res.status(401).json({ error });
  }
};

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

module.exports = {
  addEquipment,
  getEquipment,
};
