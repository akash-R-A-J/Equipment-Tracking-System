const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User");

// signup endpoint for user
const userSignup = async (req, res) => {
  try {
    console.log("user signup");
    const { fullName, email, phone, walletAddress, password } = req.body;
    const profileImage = req.file?.filename;

    console.log(fullName, email, phone, walletAddress, password, profileImage);
    console.log(req.file?.filename);
    /* If anyone want the direct URL of the image */
    // const profileImageUrl = `${req.protocol}://${req.get("host")}/uploads/${user.profileImage}`;

    // prevent duplicate user
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // hashing password for safety
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new UserModel({
      fullName,
      email,
      phone,
      walletAddress,
      password: hashedPassword,
      profileImage,
    });

    console.log(newUser);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "No user exists with the provided ID.",
      });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userSignup,
  getProfile,
};
