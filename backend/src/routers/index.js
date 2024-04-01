const authRouter = require('./auth')
const myAccountRouter = require('./my_account')
const productRouter = require("./product")
const locationRouter = require('./location')
const auctionRouter = require('./auction')
const notificationRouter = require('./notification')


function route(app) {
    app.use("/auth", authRouter);
    app.use("/my-account", myAccountRouter);
    app.use("/location", locationRouter);

    app.use("/product", productRouter);
    app.use("/auction", auctionRouter);

    app.use("/notification", notificationRouter);
}

module.exports = route;
