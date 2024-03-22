const express = require('express');
const cors = require("cors");

const route = require("./src/routers");

const app = express();

PORT = 8080

app.use(cors());
app.use(express.urlencoded({ extended: true, }));
app.use(express.json());

route(app);


app.post('/hello', (req, res) => {
    console.log(req.body)
    res.send("ok")
});

app.listen(PORT, () => {
    console.log(`Example app listening on port localhost:${PORT}`);
});