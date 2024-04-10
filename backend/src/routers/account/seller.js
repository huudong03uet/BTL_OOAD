const express = require("express");

const router = express.Router();
const accountController = require("../../controllers/account/seller");

router.post("/register", accountController.register);

router.put("/edit-profile", accountController.edit_profile);
router.post("/change-password", accountController.change_password);
router.post("/forgot-password", accountController.forgot_password);
router.get("/info/user_id=:user_id", accountController.get_info_seller);

module.exports = router;
