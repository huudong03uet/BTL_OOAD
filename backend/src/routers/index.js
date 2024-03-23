const authRouter = require('./auth')
const myAccountRouter = require('./my_account')


function route(app) {
    app.use("/auth", authRouter);
    app.use("/my-account", myAccountRouter);
}

module.exports = route;
