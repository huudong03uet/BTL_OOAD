const express = require("express")
const router = express.Router();
const auctionController = require("../../controllers/auction/seller")

router.post("/create", auctionController.create_auction);
router.post("/add-product", auctionController.add_product);
router.post("/add-user", auctionController.add_user);

module.exports = router;
