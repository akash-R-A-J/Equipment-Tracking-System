const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User");
const { ManufacturerModel } = require("../models/Manufacturer");

// sending token to the user for subsequent request
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    email: username,
  });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res
      .status(401)
      .json({ message: "Incorrect password, try with different one!" });
  }

  const token = jwt.sign({ id: user._id }, process.env.USER_JWT_SECRET);

  res
    .status(200)
    .json({ message: "Login successful!", token });
};

// sending token to the user for subsequent request
const manufacturerLogin = async (req, res) => {
  const { username, password } = req.body;
  const manufacturer = await ManufacturerModel.findOne({
    email: username,
  });

  if (!manufacturer) {
    return res.status(401).json({ message: "Manufacturer not found" });
  }

  const matched = await bcrypt.compare(password, manufacturer.password);
  if (!matched) {
    return res
      .status(401)
      .json({ message: "Incorrect password, try with different one!" });
  }

  const token = jwt.sign(
    { id: manufacturer._id },
    process.env.MANUFACTURER_JWT_SECRET
  );

  res
    .status(200)
    .json({ message: "Login successful!", token });
};

const userAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
    req.user = decoded; // now we can access req.user.id in our routes
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const manufacturerAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log("token : " + token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.MANUFACTURER_JWT_SECRET);
    req.user = decoded; // now we can access req.user.id in our routes
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = {
  userLogin,
  userAuth,
  manufacturerLogin,
  manufacturerAuth,
};
