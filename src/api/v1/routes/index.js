const router = require("express").Router();
const gameRoutes = require("./game");
const userRoutes = require("./user");

const testRoute = require("./routetest");

const { NODE_ENV } = process.env;
const {
    InternalServerError,
    InvalidEndpointError,
} = require("../../../utils/errors");

router.use("/games", gameRoutes);
router.use("/users", userRoutes);

router.use("/test", testRoute);

// Unknown endpoint
router.use((req, res, next) => {
    const err = new InvalidEndpointError(req.originalUrl);

    return next(err);
});

// Error handling
router.use((error, req, res, next) => {
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

module.exports = router;
