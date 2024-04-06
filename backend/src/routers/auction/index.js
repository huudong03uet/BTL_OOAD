import express from 'express';
const router = express.Router();

const adminRouter = require("./admin")
const sellerRouter = require("./seller")
const userRouter = require("./user")


router.use('/user', userRouter);
router.use('/seller', sellerRouter);
router.use('/admin', adminRouter);

module.exports = router;
