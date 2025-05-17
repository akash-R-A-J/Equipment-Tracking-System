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

  const token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.USER_JWT_SECRET
  );

  res.status(200).json({ message: "Login successful!", token });
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
    { id: manufacturer._id, role: "manufacturer" },
    process.env.MANUFACTURER_JWT_SECRET
  );

  res.status(200).json({ message: "Login successful!", token });
};

// use when you don't know if it's a user or manufacturer
// or can be used at all places for authentication
const generalAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedUnverified = jwt.decode(token);

    if (!decodedUnverified || !decodedUnverified.role) {
      return res
        .status(400)
        .json({ message: "Invalid token format or missing role" });
    }

    const { role } = decodedUnverified;
    console.log("role: " + role);
    console.log("decodedUnverified: " + decodedUnverified);
    

    let secret;
    if (role === "user") {
      secret = process.env.USER_JWT_SECRET;
    } else if (role === "manufacturer") {
      secret = process.env.MANUFACTURER_JWT_SECRET;
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    const verified = jwt.verify(token, secret);

    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
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
  console.log("dfghjkiuyfdfh");
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
  generalAuth,
};
