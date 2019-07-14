const router = require("express").Router();
const gameRoutes = require("./game");
const userRoutes = require("./user");

router.use("/games", gameRoutes);
router.use("/users", userRoutes);

module.exports = router;
