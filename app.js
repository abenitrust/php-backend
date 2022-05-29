require("dotenv").config();

require("./db/app.db");

const partRouter = require("./routes/app.route");

const express = require("express");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get(`${process.env.API_PREFIX}/test`, (req, res) => {
    res.status(200).json({running: "Yes, beating like a heart"});
});

app.use(`${process.env.API_PREFIX}/parts`, partRouter.router);

const server = app.listen(process.env.PORT, () => {
    console.log("App listening on port:", server.address().port);
});
