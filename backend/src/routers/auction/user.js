const express = require('express')

const router = express.Router();
const auctionController = require("../../controllers/auction/user")


router.get("/upcomming/user_id=:user_id", auctionController.get_auction_by_status);


module.exports = router;