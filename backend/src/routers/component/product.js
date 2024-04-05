const express = require('express')

const router = express.Router();
const productController = require("../../controllers/component/product")


router.get("/update", productController.update_product);


module.exports = router;
