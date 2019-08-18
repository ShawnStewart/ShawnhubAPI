const stripe = require("stripe")("sk_test_fzQWKJqYN9N2s7cCQqdNaOTO");
const { STRIPE } = require("../constants");

const createCharge = async (user, body) => {
    const { amount, token } = body;

    const charge = await stripe.charges.create({
        amount,
        currency: STRIPE.currency,
        description: STRIPE.description,
        source: token,
    });

    return charge;
};
