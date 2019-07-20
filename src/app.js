const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const { NODE_ENV } = process.env;
const { InternalServerError, InvalidEndpointError } = require("./utils/errors");
const { adminJwtStrategy, userJwtStrategy } = require("./utils/passport");
const apiV1Routes = require("./api/v1/routes");

// Middlewares
if (NODE_ENV === "dev") {
    app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use("admin-jwt", adminJwtStrategy);
passport.use("user-jwt", userJwtStrategy);

// Route requests
app.use("/api/v1", apiV1Routes);

// Unknown endpoint
app.use((req, res, next) => {
    throw new InvalidEndpointError(req.originalUrl);
});

// Error handling
app.use((error, req, res, next) => {
    const errDate = new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (!error || !error.message.length) {
        error = new InternalServerError();
    }

    if (NODE_ENV === "dev") {
        console.log(`\n[${errDate}]\n${error.stack}`);
    }

    res.status(error.status || 500);
    return res.json(error);
});

module.exports = app;
