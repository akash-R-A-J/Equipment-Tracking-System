const { Router } = require("express");
const { signup } = require("../controllers/manufacturerController");

const router = Router();

// signup/login/logout endpoints
router.post("/signup", signup);
router.post("/login", (req, res) => {});
router.post("/logout", (req, res)=>{});

// general endpoint
router.get("/profile", (req, res) => {});

// equipment endpoints for manufacturer
router.post("/add/equipment", (req, res) => {});
router.post("/transfer/equipment", (req, res)=>{});
router.get("/all-equipment", (req, res) => {});
router.get("/pending-equipment", (req, res) => {});


module.exports = router;
