const authRouter = require('./user_seller/auth')
// const myAccountRouter = require('./user_seller/my_account')
// const productRouter = require("./user_seller/product")
// const locationRouter = require('./user_seller/location')
// const auctionRouter = require('./user_seller/auction')
const adminRouter = require('./admin')
const sellerRouter = require('./seller')
// const notificationRouter = require('./user_seller/notification')


function route(app) {
    app.use("/admin", adminRouter)
    app.use("/auth", authRouter);
    app.use("/seller", sellerRouter);
    // app.use("/my-account", myAccountRouter);
    // app.use("/location", locationRouter);
    // app.use("/product", productRouter);
    // app.use("/auction", auctionRouter);

    // app.use("/notification", notificationRouter);
}

module.exports = route;
