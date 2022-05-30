require("../models/app.model");

const mongoose = require("mongoose");
const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on("connected", () => {
    logger.info("Mongoose: connected to database");
});


mongoose.connection.on("disconnected", () => {
    logger.info("Mongoose: mongoose: disconnected from database");
});


process.on("SIGTERM", () => {
    logger.info("Nodejs: disconnecting database as app is closing");
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    logger.info("Nodejs: disconnecting database as app is closing");
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

process.on("SIGUSR2", () => {
    logger.info("Nodejs: disconnecting database as app is closing");
    mongoose.connection.close(() => {
        process.kill(process.pid, "SIGUSR2");
    });
});

