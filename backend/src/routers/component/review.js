const express = require('express')

const router = express.Router();
const reviewController = require("../../controllers/component/review")


router.get("/user_id=:user_id", reviewController.get_review);


module.exports = router;
