const express = require('express')

const router = express.Router();
const analystController = require("../../controllers/component/analyst")


router.get("/total", analystController.analyst_total);
router.get("/filter", analystController.analyst_product_filter);


module.exports = router;
