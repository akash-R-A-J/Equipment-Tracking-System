const { Router } = require("express");
const {
  signup,
  manufacturerSignup,
} = require("../controllers/manufacturerController");
const upload = require("../middleware/uploads");
const { manufacturerLogin } = require("../middleware/auth");

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
// router.post("/logout", (req, res)=>{});

// general endpoint
// router.get("/profile", (req, res) => {});

// equipment endpoints for manufacturer
// router.post("/add/equipment", (req, res) => {});
// router.post("/transfer/equipment", (req, res)=>{});
// router.get("/all-equipment", (req, res) => {});
// router.get("/pending-equipment", (req, res) => {});

module.exports = router;
