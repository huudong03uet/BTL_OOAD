const express = require("express")
const router = express.Router();
const UPLOAD = require('../../../conf/storage')
const productController = require("../../controllers/product/admin")


// router.get("/not-inspect", productController.get_all_product_not_inspect);
// router.post("/inspect", productController.product_inspect);
// router.get("/all", productController.get_all_product);
// router.post("/category/create", UPLOAD.UPLAOD_CATEGORY.single('image'), productController.add_category);
// router.delete('/product_id=:product_id', productController.delete_product)

// router.get('/notify/admin_id=:admin_id', productController.notify)

// router.post("/delete_category", productController.delete_category)

router.get("/not-inspect", (req, res) => {
    productController.service_product_not_inspect(req, res);
});
router.post("/inspect", (req, res) => {
    productController.product_inspect(req, res);
});
router.get("/all", (req, res) => {
    productController.service_all_product(req, res);
});
router.post("/category/create", UPLOAD.UPLAOD_CATEGORY.single('image'), (req, res) => {
    productController.add_category(req, res);
});
router.delete('/product_id=:product_id', (req, res) => {
    productController.delete_product(req, res);
})
router.get('/notify/admin_id=:admin_id', (req, res) => {
    productController.notify(req, res);
})
router.post("/delete_category", (req, res) => {
    productController.delete_category(req, res);
})

module.exports = router;
