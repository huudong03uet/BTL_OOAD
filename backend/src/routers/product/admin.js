const express = require("express")
const router = express.Router();
const productController = require("../../controllers/product/admin")

router.get("/not-inspect", productController.get_all_product_not_inspect);
router.post("/inspect", productController.product_inspect);
router.get("/all", productController.get_all_product);

module.exports = router;
