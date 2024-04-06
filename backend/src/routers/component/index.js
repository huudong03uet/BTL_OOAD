import express from 'express';
const router = express.Router();

const locationRouter = require("./location")
const productRouter = require("./product")


router.use('/location', locationRouter);
router.use('/product', productRouter);

module.exports = router;
