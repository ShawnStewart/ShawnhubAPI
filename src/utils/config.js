require("dotenv").config();
const mongoose = require("mongoose");

const { mongooseOptions } = require("./constants");
const { dbConnectionError, dbConnectionSuccess } = require("./utils");
const { MONGO_URI, MONGO_URI_LOCAL } = process.env;

const connect = () => {
    const connectionString = MONGO_URI_LOCAL || MONGO_URI;

    return mongoose
        .connect(connectionString, mongooseOptions)
        .then(dbConnectionSuccess)
        .catch(dbConnectionError);
};

const close = () => {
    console.log("Closing MongoDB connection...");
    return mongoose.disconnect();
};

module.exports = {
    db: {
        close,
        connect,
    },
};
