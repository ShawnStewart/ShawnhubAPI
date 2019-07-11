const Game = require("../models/Game");

const createNewGame = (game) => new Game(game).save();

const findAllGames = (skip = 1, limit = 25) =>
    Game.find()
        .skip(skip)
        .limit(limit)
        .exec();

const findGameAndPlayersById = (id) =>
    Game.findById(id)
        .populate("ownerId players", "username")
        .exec();

const findGameById = (id) => Game.findById(id).exec();

const getEstimatedCount = (query = {}) =>
    Game.estimatedDocumentCount(query).exec();

const updateGameById = (id, update) =>
    Game.findByIdAndUpdate(id, update, { new: true }).exec();

module.exports = {
    createNewGame,
    findAllGames,
    findGameAndPlayersById,
    findGameById,
    getEstimatedCount,
    updateGameById,
};
