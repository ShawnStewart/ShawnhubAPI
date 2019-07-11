const router = require("express").Router();
const gameRoutes = require("./game");
const userRoutes = require("./user");

const testRoute = require("./routetest");

router.use("/games", gameRoutes);
router.use("/users", userRoutes);

router.use("/test", testRoute);

module.exports = router;
