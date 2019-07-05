const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    JWT_CONFIG: { secret: jwtSecret, options: jwtOptions },
} = require("../constants");

const comparePassword = (plainText, hash) => bcrypt.compare(plainText, hash);

const hashPassword = (plainText) => bcrypt.hash(plainText, 11);

const issueToken = (data) => jwt.sign(data, jwtSecret, jwtOptions);

module.exports = {
    comparePassword,
    hashPassword,
    issueToken,
};
