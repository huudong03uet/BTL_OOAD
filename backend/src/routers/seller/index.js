const express = require("express")
const router = express.Router();
const registerSellerController = require('../../controllers/seller/register')


router.post("/register", registerSellerController.register);

module.exports = router;
