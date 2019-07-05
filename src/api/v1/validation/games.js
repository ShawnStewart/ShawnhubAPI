const Validator = require("validator");
const { checkEmpty } = require("../../../utils/utils");

const creationValidation = (data) => {
    const errors = {};
    let { gameId, maxPlayers } = data;

    gameId = !checkEmpty(gameId) ? gameId : "";
    maxPlayers = !checkEmpty(maxPlayers) ? maxPlayers : -1;

    if (!Validator.isLength(`${gameId}`, { max: 0 })) {
        errors.gameId = "User is already in a game";
    }

    if (!Validator.isInt(`${maxPlayers}`, { min: 2, max: 8 })) {
        errors.maxPlayers = "Max players must be a number between 2-8";
    }

    return { errors, isValid: checkEmpty(errors) };
};

module.exports = { creationValidation };
