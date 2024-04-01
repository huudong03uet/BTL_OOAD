import express from 'express';
const router = express.Router();
import authController from '../../controllers/admin/auth'


router.post("/login", authController.login);
router.post("/sign_up", authController.sign_up);

module.exports = router;
