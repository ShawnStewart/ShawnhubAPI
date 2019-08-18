const router = require("express").Router();
const passport = require("passport");
const { c } = require("../utils");
const { createCharge } = require("../controllers/stripe");

router.post(
    "/",
    passport.authenticate("user-jwt", { session: false }),
    c(createCharge, (req, res, next) => [req.user, req.body]),
);
