const authRouter = require('./user/auth')
const myAccountRouter = require('./user/my_account')
const locationRouter = require('./component/location')
const adminRouter = require('./admin')
const sellerRouter = require('./seller')
const userProductRouter = require('./user/product')
const productRouter = require('./component/product')


function route(app) {
    app.use("/admin", adminRouter)
    app.use("/auth", authRouter);
    app.use("/seller", sellerRouter);
    app.use("/my-account", myAccountRouter);
    app.use("/location", locationRouter);
    app.use("/user", userProductRouter);
    app.use("/product", productRouter);
}

module.exports = route;
