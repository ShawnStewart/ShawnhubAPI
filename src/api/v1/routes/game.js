const router = require("express").Router();
const passport = require("passport");
const { c } = require("../utils");
const {
    createGame,
    getAllGames,
    getGameById,
    joinGameById,
    kickPlayerById,
    leaveGameById,
    startGame,
    transferGameOwnership,
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

router.put(
    "/:id/kick/:playerId",
    passport.authenticate("user-jwt", { session: false }),
    c(kickPlayerById, (req, res, next) => [
        req.user,
        req.params.id,
        req.params.playerId,
    ]),
);

router.put(
    "/:id/leave",
    passport.authenticate("user-jwt", { session: false }),
    c(leaveGameById, (req, res, next) => [req.user, req.params.id]),
);

router.put(
    "/:id/start",
    passport.authenticate("user-jwt", { session: false }),
    c(startGame, (req, res, next) => [req.user, req.params.id]),
);

router.put(
    "/:id/transfer-ownership/:playerId",
    passport.authenticate("user-jwt", { session: false }),
    c(transferGameOwnership, (req, res, next) => [
        req.user,
        req.params.id,
        req.params.playerId,
    ]),
);

module.exports = router;
