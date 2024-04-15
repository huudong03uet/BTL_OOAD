const express = require("express")
const router = express.Router();
const UPLOAD = require('../../../conf/storage')
const productController = require("../../controllers/product/admin")


router.get("/not-inspect", productController.get_all_product_not_inspect);
router.post("/inspect", productController.product_inspect);
router.get("/all", productController.get_all_product);
router.post("/category/create", UPLOAD.UPLAOD_CATEGORY.single('image'), productController.add_category);
router.delete('/product_id=:product_id', productController.delete_product)
<<<<<<< HEAD
router.get('/notify/admin_id=:admin_id', productController.notify)

=======
router.post("/delete_category", productController.delete_category)
>>>>>>> d26966f5bebad9c89f61ba9821fe510e26a2da6e
module.exports = router;
