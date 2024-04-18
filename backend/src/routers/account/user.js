const express = require("express");

const router = express.Router();
const UPLOAD = require('../../../conf/storage')
const accountController = require("../../controllers/account/user");

router.post("/edit-profile", UPLOAD.UPLAOD_AVATAR.single('image'), accountController.edit_profile);
router.post("/change-password", accountController.change_password);
router.post("/forgot-password", accountController.forgot_password);
router.post("/qr_payment", accountController.qr_payment);
module.exports = router;