const router = require("express").Router();
const passport = require("passport");
const { c } = require("../utils");
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
    // passport.authenticate("admin-jwt", { session: false }),
    c(getAllUsers, (req, res, next) => [req.query]),
);

router.post("/register", c(register, (req, res, next) => [req.body]));

router.post("/login", c(login, (req, res, next) => [req.body]));

router
    .route("/:id")
    .get(
        passport.authenticate("user-jwt", { session: false }),
        c(getUserById, (req, res, next) => [req.params.id]),
    )
    .put(
        passport.authenticate("user-jwt", { session: false }),
        c(updateUserById, (req, res, next) => [req.params.id, req.body]),
    )
    .delete(
        passport.authenticate("user-jwt", { session: false }),
        c(deleteUserById, (req, res, next) => [req.params.id]),
    );

module.exports = router;
