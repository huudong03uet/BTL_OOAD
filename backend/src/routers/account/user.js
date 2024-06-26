const express = require("express");

const router = express.Router();
const UPLOAD = require('../../../conf/storage')
const accountController = require("../../controllers/account/user");

router.post("/edit-profile", UPLOAD.UPLAOD_AVATAR.single('image'), accountController.edit_profile);
router.post("/change-password", accountController.change_password);
router.post("/forgot-password", accountController.forgot_password);
router.post("/qr_payment", accountController.qr_payment);
router.post("/cardPayment", accountController.cardPayment);
router.post("/handleCardPayment", accountController.handleCardPayment);  
router.get("/user_id=:user_id", accountController.get_user_by_user_id)
module.exports = router;