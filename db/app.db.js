require("../models/app.model");

const mongoose = require("mongoose");


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on("connected", () => {
    console.log("INFO: mongoose - connected to database");
});


mongoose.connection.on("disconnected", () => {
    console.log("INFO: mongoose: disconnected from database");
});


process.on("SIGTERM", () => {
    console.log("INFO: nodejs: disconnecting database as app is closing");
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    console.log("INFO: nodejs: disconnecting database as app is closing");
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

process.on("SIGUSR2", () => {
    console.log("INFO: nodejs: disconnecting database as app is closing");
    mongoose.connection.close(() => {
        process.kill(process.pid, "SIGUSR2");
    });
});

