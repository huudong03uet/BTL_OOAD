const express = require('express')

const router = express.Router();
const reviewController = require("../../controllers/component/review")


router.get("/seller_id=:seller_id", reviewController.get_review);
router.post("/create", reviewController.set_review);


module.exports = router;
