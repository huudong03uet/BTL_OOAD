const express = require("express")
const router = express.Router();
const productController = require("../../controllers/product/admin")

router.get("/not-inspect", productController.get_all_product_not_inspect);

module.exports = router;
