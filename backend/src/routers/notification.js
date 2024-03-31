const express = require('express')

const router = express.Router();
const notificationController = require("../controllers/notification")


router.get("/role_id=:role_id/role_type=:role_type", notificationController.get_notification);


module.exports = router;
