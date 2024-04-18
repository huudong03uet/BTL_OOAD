const express = require("express")
const router = express.Router();
const productController = require("../../controllers/product/seller")

const UPLOAD = require('../../../conf/storage')

// router.post("/create", UPLOAD.UPLAOD_PRODUCT.array('images', 5), productController.add_product);
// router.post("/update", productController.update_product);
// router.get("/sold/seller_id=:seller_id", productController.get_product_sold);
// router.get("/all/seller_id=:seller_id", productController.get_products);
// router.get("/history/seller_id=:seller_id", productController.get_product_history);
// router.get('/notify/seller_id=:seller_id', productController.notify)

router.post("/create", UPLOAD.UPLAOD_PRODUCT.array('images', 5), (req, res) => {
    productController.add_product(req, res);
});

router.post("/update", (req, res) => {
    productController.update_product(req, res);
});

router.get("/sold/seller_id=:seller_id", (req, res) => {
    productController.service_product_sold(req, res);
});

router.get("/all/seller_id=:seller_id", (req, res) => {
    productController.service_products(req, res);
});

router.get("/history/seller_id=:seller_id", (req, res) => {
    productController.service_product_sold(req, res);
});

router.get('/notify/seller_id=:seller_id', (req, res) => {
    productController.notify(req, res);
})

module.exports = router;
