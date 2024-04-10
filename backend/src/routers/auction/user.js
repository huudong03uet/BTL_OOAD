const express = require('express')

const router = express.Router();
const auctionController = require("../../controllers/auction/user")


// router.get("/upcomming/user_id=:user_id", auctionController.get_auction_upcomming);
router.get("/promote/user_id=:user_id", auctionController.get_auction_promote);
router.get("/info/auction_id=:auction_id/user_id=:user_id", auctionController.get_auction_info);


module.exports = router;
