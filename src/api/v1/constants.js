const { SECRET } = process.env;

const JWT_CONFIG = {
    options: {
        expiresIn: "7d",
    },
    secret: SECRET,
};

module.exports = { JWT_CONFIG };
