const router = require("express").Router();
const passport = require("passport");
const { c } = require("../utils");
const {
    createGame,
    getAllGames,
    getGameById,
    joinGameById,
} = require("../controllers/game");

router
    .route("/")
    .get(c(getAllGames, (req, res, next) => [req.query]))
    .post(
        passport.authenticate("user-jwt", { session: false }),
        c(createGame, (req, res, next) => [req.user, req.body]),
    );

router.route("/:id").get(c(getGameById, (req, res, next) => [req.params.id]));

router.put(
    "/:id/join",
    passport.authenticate("user-jwt", { session: false }),
    c(joinGameById, (req, res, next) => [req.user, req.params.id]),
);

module.exports = router;
