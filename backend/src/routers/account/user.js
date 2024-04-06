const express = require("express");

const router = express.Router();
const accountController = require("../../controllers/account/user");

router.put("/edit-profile", accountController.edit_profile);
router.post("/change-password", accountController.change_password);
router.post("/forgot-password", accountController.forgot_password);

module.exports = router;