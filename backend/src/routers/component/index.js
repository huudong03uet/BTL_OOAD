import express from 'express';
const router = express.Router();

const locationRouter = require("./location")
const productRouter = require("./product")
const artistRouter = require('./artist')
const reviewRouter = require('./review')


router.use('/location', locationRouter);
router.use('/product', productRouter);
router.use('/artist', artistRouter);
router.use('/review', reviewRouter);

module.exports = router;
