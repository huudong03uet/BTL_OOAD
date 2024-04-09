const express = require('express')

const router = express.Router();
const artistController = require("../../controllers/component/artist")


router.get("/recommend", artistController.get_artist);


module.exports = router;
