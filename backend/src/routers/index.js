const authRouter = require('./auth')
const myAccountRouter = require('./my_account')
const adminRouter = require("./admin")


function route(app) {
    app.use("/auth", authRouter);
    app.use("/my-account", myAccountRouter);

    app.use("/admin", adminRouter)
}

module.exports = route;
