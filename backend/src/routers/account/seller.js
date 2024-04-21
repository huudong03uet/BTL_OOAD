const express = require("express");

const router = express.Router();
const accountController = require("../../controllers/account/seller");

router.post("/register", accountController.register);

router.put("/edit-profile", accountController.edit_profile);
router.post("/change-password", accountController.change_password);
router.post("/forgot-password", accountController.forgot_password);
router.get("/info/seller_id=:seller_id", accountController.get_info_seller);
router.get("/user_id=:user_id", accountController.get_seller_by_user_id);
router.get("/all", accountController.getAllSellers);
router.get("/seller_not_inspect", accountController.seller_not_inspect)
router.post("/handle_verification_seller", accountController.handle_verification_seller);
module.exports = router;
