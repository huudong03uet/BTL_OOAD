const express = require('express')

const router = express.Router();
const mesageController = require("../../controllers/component/mesage")


router.get("/user_id=:user_id/user_2_id=:user_2_id", mesageController.get_message);
router.get("/all-user/user_id=:user_id", mesageController.get_user_message);
router.post("/send-message", mesageController.send_message);


module.exports = router;
