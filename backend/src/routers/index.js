// const authRouter = require('./user/auth')
// const myAccountRouter = require('./user/my_account')
// const locationRouter = require('./component/location')
// const adminRouter = require('./admin')
// const sellerRouter = require('./seller')
// const userProductRouter = require('./user/product')
// const userAuctionRouter = require('./user/auction')
// const productRouter = require('./component/product')

const authRouter = require('./auth')
// const accountRouter = require('./account')
const auctionRouter = require('./auction')
// const componentRouter = require('./component')


function route(app) {
    // app.use("/admin", adminRouter)
    // app.use("/auth", authRouter);
    // app.use("/seller", sellerRouter);
    // app.use("/my-account", myAccountRouter);
    // app.use("/location", locationRouter);
    // app.use("/user", userProductRouter);
    // app.use("/user/auction", userAuctionRouter);
    // app.use("/product", productRouter);

    // app.use("/", componentRouter)
    app.use("/auth", authRouter);
    // app.use("/account", accountRouter);
    app.use("/auction", auctionRouter);
}

module.exports = route;
