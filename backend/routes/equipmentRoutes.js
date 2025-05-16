const { Router } = require("express");
const upload = require("../middleware/uploads");
const { addEquipment } = require("../controllers/equipmentController");

const router = Router();

// http://localhost:5000/api/v0/euipments/*

router.post(
  "/add",
  upload.fields([
    { name: "equipmentImage", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  addEquipment
); // equipment detail + manufacturer id/public key
router.post("/details", (req, res) => {}); // need id/serial number of the equipment
router.post("/transfer", (req, res) => {}); // serial number + receiver's public key + sender public key/id

module.exports = router;
