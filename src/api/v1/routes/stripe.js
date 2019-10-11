const router = require("express").Router();
const passport = require("passport");
const { controllerHandler: handle } = require("../utils");
const { createCharge } = require("../controllers/stripe");

router.post(
    "/",
    passport.authenticate("user-jwt", { session: false }),
    handle(createCharge, (req, res, next) => [req.user, req.body]),
);

module.exports = router;
