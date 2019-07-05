const { Strategy: JwtStrategy } = require("passport-jwt");

const { passportOptions: opts, USER_ROLE_VALUES } = require("./constants");
const { AuthorizationError } = require("./errors");
const { findUserById } = require("../api/v1/services/user");

const userJwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then((user) => {
            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        })
        .catch((err) => {
            console.log(err);

            return done(err);
        });
});

const adminJwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    // User.findById(jwt_payload.id)
    //     .then((user) => {
    //         if (!user || user.role < USER_ROLE_VALUES.admin) {
    //             return done(new AuthorizationError());
    //             return done(null, false);
    //         }
    //         return done(null, user);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return done(err);
    //     });
    try {
        const user = await findUserById(jwt_payload.id);

        if (!user || user.role < USER_ROLE_VALUES.admin) {
            done(new AuthorizationError());
        }

        return done(null, user);
    } catch (error) {
        done(new AuthorizationError(error));
    }
});

module.exports = {
    adminJwtStrategy,
    userJwtStrategy,
};
