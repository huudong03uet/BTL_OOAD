const express = require("express")
const router = express.Router();
const auctionController = require("../../controllers/auction/admin")

router.get("/all", auctionController.service_auctions);
router.delete("/auction_id=:auction_id", auctionController.service_delete_auctions);

module.exports = router;
