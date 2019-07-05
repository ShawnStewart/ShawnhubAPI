const Game = require("../models/Game");

const createNewGame = (game) => new Game(game).save();

const findAllGames = () => Game.find().exec();

const findGameAndPlayersById = (id) =>
    Game.findById(id)
        .populate("ownerId players", "username")
        .exec();

const getEstimatedCount = (query = {}) =>
    Game.estimatedDocumentCount(query).exec();

module.exports = {
    createNewGame,
    findAllGames,
    findGameAndPlayersById,
    getEstimatedCount,
};
