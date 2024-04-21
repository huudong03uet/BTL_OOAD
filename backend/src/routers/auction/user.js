const express = require('express')

const router = express.Router();
const auctionController = require("../../controllers/auction/user")


router.get("/upcomming/user_id=:user_id", auctionController.service_auction_upcomming);
router.get("/promote/user_id=:user_id", auctionController.service_auction_promote);
router.get("/info/auction_id=:auction_id/user_id=:user_id", auctionController.service_auction_info);
router.get("/id-of-auction/auction_id=:auction_id/user_id=:user_id", auctionController.service_product_in_auction);
router.get('/bid-product/product_id=:product_id', auctionController.service_auction_bid)
router.post('/create-bid', auctionController.add_auction_bid)
router.get("/info-pk/user_id=:user_id/auction_id=:auction_id", auctionController.service_get_auction_by_pk);


module.exports = router;
