import express from 'express';
const router = express.Router();

const locationRouter = require("./location")
const productRouter = require("./product")
const artistRouter = require('./artist')


router.use('/location', locationRouter);
router.use('/product', productRouter);
router.use('/artist', artistRouter);

module.exports = router;
