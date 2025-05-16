const { Router } = require("express");
const upload = require("../middleware/uploads");
const { addEquipment } = require("../controllers/equipmentController");
const { manufacturerAuth, generalAuth } = require("../middleware/auth");
const {
  transferRequests,
  updateTransferStatus,
  submitSignedTransaction,
} = require("../controllers/transferController");

const router = Router();

router.post(
  "/add",
  upload.fields([
    { name: "equipmentImage", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  manufacturerAuth,
  addEquipment
); // equipment detail + manufacturer id/public key
// router.get("/details", (req, res) => {}); // need id/serial number of the equipment
router.get("/transfers", generalAuth, transferRequests); // serial number + receiver's public key + sender public key/id
router.patch("/transfers/:id", generalAuth, updateTransferStatus); // for updating the status of an equipment
router.post(
  "/transfers/:id/submit-signed-tx",
  generalAuth,
  submitSignedTransaction
);

module.exports = router;
