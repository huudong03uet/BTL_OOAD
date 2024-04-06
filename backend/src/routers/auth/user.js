const express = require('express')

const router = express.Router();
const authController = require("../../controllers/auth/user")


router.post("/login", authController.login);
router.post("/sign_up", authController.sign_up);


module.exports = router;
