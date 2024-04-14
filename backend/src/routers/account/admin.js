const express = require("express");

const router = express.Router();
const accountController = require("../../controllers/account/admin");

router.get("/seller-manager", accountController.seller_manager);
router.get("/user-manager", accountController.user_manager);

module.exports = router;
