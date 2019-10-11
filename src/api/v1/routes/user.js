const router = require("express").Router();
const passport = require("passport");
const { controllerHandler: handle } = require("../utils");
const {
    deleteUserById,
    getAllUsers,
    getUserById,
    login,
    register,
    updateUserById,
} = require("../controllers/user");

router.get(
    "/",
    passport.authenticate("admin-jwt", { session: false }),
    handle(getAllUsers, (req, res, next) => [req.query]),
);

router.post("/register", handle(register, (req, res, next) => [req.body]));

router.post("/login", handle(login, (req, res, next) => [req.body]));

router
    .route("/:id")
    .get(
        passport.authenticate("user-jwt", { session: false }),
        handle(getUserById, (req, res, next) => [req.params.id]),
    )
    .put(
        passport.authenticate("user-jwt", { session: false }),
        handle(updateUserById, (req, res, next) => [req.params.id, req.body]),
    )
    .delete(
        passport.authenticate("user-jwt", { session: false }),
        handle(deleteUserById, (req, res, next) => [req.params.id]),
    );

module.exports = router;
