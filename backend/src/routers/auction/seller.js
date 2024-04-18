const express = require("express")
const router = express.Router();
const auctionController = require("../../controllers/auction/seller")

router.post("/create", auctionController.create_auction);
router.post("/add-product", auctionController.add_product);
router.post("/add-user", auctionController.add_user);
router.get("/past/seller_id=:seller_id", auctionController.get_past_auction);
router.get("/show-product/seller_id=:seller_id/auction_id=:auction_id", auctionController.get_products);
router.get("/history/seller_id=:seller_id", auctionController.get_auction_history);
router.get("/not-sold/seller_id=:seller_id", auctionController.get_auction_not_sold);
router.get("/info/seller_id=:seller_id/auction_id=:auction_id", auctionController.get_auction_info);
router.post("/update", auctionController.update_auction);

module.exports = router;
