const bcrypt = require("bcrypt");
const { ManufacturerModel } = require("../models/Manufacturer");
const { getEquipment } = require("./equipmentController");

const manufacturerSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      walletAddress,
      password,
      companyName,
      companyWebsite,
      taxId,
      address,
    } = req.body;

    const profileImage = req.files["profileImage"]?.[0]?.filename;
    const document = req.files["document"]?.[0]?.filename;

    // prevent duplicate manufacturer
    const existing = await ManufacturerModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 5);

    const newManufacturer = new ManufacturerModel({
      password: hashedPassword,
      walletAddress,
      fullName,
      email,
      phone,
      profileImage,
      companyName,
      companyWebsite,
      taxId,
      address,
      document,
      verified: false,
    });

    await newManufacturer.save();

    res.status(201).json({ message: "Manufacturer registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get manufacturer details
const getManufacturer = async (req, res) => {
  try {
    const manufacturer = await ManufacturerModel.findById(req.user.id).select(
      "-password"
    );

    if (!manufacturer) {
      return res.status(404).json({
        error: "User not found",
        message: "No user exists with the provided ID.",
      });
    }

    res.status(200).json(manufacturer);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const myEquipment = async (req, res) => {
  try {
    const manufacturer = await ManufacturerModel.findById(req.user.id);
    const equipments = await getEquipment(manufacturer.walletAddress);

    if (!equipments) {
      return res.status(200).json("No equipment found");
    }

    console.log(equipments);
    res.status(200).json(equipments);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

module.exports = {
  manufacturerSignup,
  getManufacturer,
  myEquipment
};
