require("dotenv").config();
const mongoose = require("mongoose");

const { mongooseOptions } = require("./constants");
const { dbConnectionError, dbConnectionSuccess } = require("./utils");
const { MONGO_URI, NODE_ENV } = process.env;

const connect = () => {
    if (NODE_ENV === "test") {
        console.log("in test");
        // const mockgoose = new Mockgoose(mongoose);

        // return mockgoose
        //     .prepareStorage()
        //     .then(() => mongoose.connect())
        //     .then(dbConnectionSuccess)
        //     .catch(dbConnectionError);
    } else {
        return mongoose
            .connect(MONGO_URI, mongooseOptions)
            .then(dbConnectionSuccess)
            .catch(dbConnectionError);
    }
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
