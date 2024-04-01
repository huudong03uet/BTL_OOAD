import express from 'express';
const router = express.Router();
import adminAuth from './auth'

router.use('/auth', adminAuth);

module.exports = router;
