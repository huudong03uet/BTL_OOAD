const authRouter = require('./auth')
const accountRouter = require('./account')
const auctionRouter = require('./auction')
const componentRouter = require('./component')
const productRouter = require('./product')


function route(app) {
    app.use("/", componentRouter)
    app.use("/auth", authRouter);
    app.use("/account", accountRouter);
    app.use("/auction", auctionRouter);
    app.use("/product", productRouter);
}

module.exports = route;
