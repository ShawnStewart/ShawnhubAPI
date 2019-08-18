const { SECRET } = process.env;

const JWT_CONFIG = {
    options: {
        expiresIn: "7d",
    },
    secret: SECRET,
};

const STRIPE = {
    currency: "usd",
    description: "Payment for adding chips to user wallet.",
};

module.exports = { JWT_CONFIG };
