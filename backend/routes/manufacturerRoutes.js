const { Router } = require("express");
const {
  signup,
  manufacturerSignup,
  getManufacturer,
  myEquipment,
} = require("../controllers/manufacturerController");
const upload = require("../middleware/uploads");
const { manufacturerLogin, manufacturerAuth } = require("../middleware/auth");
const { transferEquipment } = require("../controllers/equipmentController");

const router = Router();

/*  
    signup/login/logout endpoints 
    [add input validation using zod here]
*/
router.post(
  "/signup",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  manufacturerSignup
);
router.post("/login", manufacturerLogin);

// general endpoint
router.get("/profile", manufacturerAuth, getManufacturer);
router.get("/my-equipment", manufacturerAuth, myEquipment);

// equipment endpoints for manufacturer
router.post("/transfer-equipment", manufacturerAuth, transferEquipment);
// router.get("/all-equipment", (req, res) => {});
// router.get("/pending-equipment", (req, res) => {});

module.exports = router;
