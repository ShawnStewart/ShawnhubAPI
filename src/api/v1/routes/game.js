const router = require("express").Router();
const passport = require("passport");
const { controllerHandler: handle } = require("../utils");
const {
    createGame,
    getAllGames,
    getAllJoinableGames,
    getGameById,
    joinGameById,
    kickPlayerById,
    leaveGameById,
    startGame,
    transferGameOwnership,
} = require("../controllers/game");

router
    .route("/")
    .get(handle(getAllJoinableGames, (req, res, next) => [req.query]))
    .post(
        passport.authenticate("user-jwt", { session: false }),
        handle(createGame, (req, res, next) => [req.user, req.body]),
    );

router.get("/all", handle(getAllGames, (req, res, next) => [req.query]));

router
    .route("/:id")
    .get(handle(getGameById, (req, res, next) => [req.params.id]));

router.put(
    "/:id/join",
    passport.authenticate("user-jwt", { session: false }),
    handle(joinGameById, (req, res, next) => [req.user, req.params.id]),
);

router.put(
    "/:id/kick/:playerId",
    passport.authenticate("user-jwt", { session: false }),
    handle(kickPlayerById, (req, res, next) => [
        req.user,
        req.params.id,
        req.params.playerId,
    ]),
);

router.put(
    "/:id/leave",
    passport.authenticate("user-jwt", { session: false }),
    handle(leaveGameById, (req, res, next) => [req.user, req.params.id]),
);

router.put(
    "/:id/start",
    passport.authenticate("user-jwt", { session: false }),
    handle(startGame, (req, res, next) => [req.user, req.params.id]),
);

router.put(
    "/:id/transfer-ownership/:playerId",
    passport.authenticate("user-jwt", { session: false }),
    handle(transferGameOwnership, (req, res, next) => [
        req.user,
        req.params.id,
        req.params.playerId,
    ]),
);

module.exports = router;
