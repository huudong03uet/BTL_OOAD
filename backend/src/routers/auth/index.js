import express from 'express';
const router = express.Router();

const adminRouter = require("./admin")
const userRouter = require("./user")


router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
