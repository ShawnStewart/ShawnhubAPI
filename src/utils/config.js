require("dotenv").config();
const mongoose = require("mongoose");

const { mongooseOptions } = require("./constants");
const { dbConnectionError, dbConnectionSuccess } = require("./utils");
const { MONGO_URI, MONGO_URI_LOCAL, NODE_ENV } = process.env;

const connect = () => {
    const connectionString = NODE_ENV === "prod" ? MONGO_URI : MONGO_URI_LOCAL;

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
