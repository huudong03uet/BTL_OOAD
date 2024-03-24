const authRouter = require('./auth')
const myAccountRouter = require('./my_account')
const adminRouter = require("./item")


function route(app) {
    app.use("/auth", authRouter);
    app.use("/my-account", myAccountRouter);

    app.use("/item", adminRouter)
}

module.exports = route;
