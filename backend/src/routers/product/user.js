const express = require("express");

const router = express.Router();
const productController = require("../../controllers/product/user");

// router.get("/all-product", productController.get_products);
// router.get('/all-category', productController.get_categories)
// router.get('/detail/product_id=:product_id/user_id=:user_id', productController.get_product_detail)
// router.get('/recently/user_id=:user_id', productController.get_product_recently)
// router.get('/product-accept', productController.get_product_accept)

router.get("/all-category", (req, res) => {
    productController.get_categories(req, res);
});

router.get('/detail/product_id=:product_id/user_id=:user_id', (req, res) => {
    productController.service_product_detail(req, res);
});

router.get('/recently/user_id=:user_id', (req, res) => {
    productController.service_product_recently(req, res);
})

router.get('/product-accept', (req, res) => {
    productController.service_product_accept(req, res);
})

router.get("/all-product", (req, res) => {
    productController.service_products(req, res);
});


router.get("/save-product/user_id=:user_id", (req, res) => {
    productController.service_product_save(req, res);
});

module.exports = router;
