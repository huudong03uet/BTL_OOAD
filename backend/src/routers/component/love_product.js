const express = require('express')

const router = express.Router();
const loveController = require("../../controllers/component/love_product")


router.post("/create", loveController.create_love);
router.delete("/delete/user_id=:user_id/product_id=:product_id", loveController.delete_love);
router.get('/user_id=:user_id/product_id=:product_id', loveController.check_user_love_product)


module.exports = router;
