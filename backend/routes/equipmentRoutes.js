const {Router} = require("express");

const router = Router();

// http://localhost:5000/api/v0/euipments/*
router.post("/details", (req, res) => {}); // need id/serial number of the equipment
router.post("/add", (req, res) => {}); // equipment detail + manufacturer id/public key 
router.post("/transfer", (req, res)=>{}); // serial number + receiver's public key + sender public key/id
