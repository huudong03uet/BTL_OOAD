const express = require("express");

const router = express.Router();
const myAccountController = require("../../controllers/user/my_account");

router.put("/edit-profile", myAccountController.edit_profile);
router.post("/change-password", myAccountController.change_password);
router.post("/forgot-password", myAccountController.forgot_password);

module.exports = router;