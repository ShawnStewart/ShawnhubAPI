const { ExtractJwt } = require("passport-jwt");
const { SECRET } = process.env;

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

const passportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
};

const USER_ROLE_VALUES = {
    user: 0,
    admin: 1,
};

module.exports = { mongooseOptions, passportOptions, USER_ROLE_VALUES };
