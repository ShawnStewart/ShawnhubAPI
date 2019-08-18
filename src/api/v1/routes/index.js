const router = require("express").Router();
const gameRoutes = require("./game");
const userRoutes = require("./user");
const stripeRoute = require("./stripe");

router.use("/games", gameRoutes);
router.use("/users", userRoutes);
router.use("/stripe", stripeRoute);

module.exports = router;
