const { Router } = require("express");
const { userSignup, getProfile, myEquipment } = require("../controllers/userController");
const upload = require("../middleware/uploads");
const { userAuth, userLogin } = require("../middleware/auth");

const router = Router();

// signup endpoint for user
router.post("/signup", upload.single("profileImage"), userSignup);
router.post("/login", userLogin);

router.get("/profile", userAuth, getProfile);
router.get("/my-equipment", userAuth, myEquipment);

module.exports = router;
