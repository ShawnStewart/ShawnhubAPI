const Game = require("../models/Game");

const createNewGame = (game) => new Game(game).save();

const findAllGames = (skip = 1, limit = 25) =>
    Game.find()
        .skip(skip)
        .limit(limit)
        .exec();

const findAllJoinableGames = (skip = 1, limit = 25) =>
    Game.find({ isFull: false, status: 0 })
        .skip(skip)
        .limit(limit)
        .exec();

const findGameAndPlayersById = (id) =>
    Game.findById(id)
        .populate("ownerId players", "username")
        .exec();

const findGameById = (id) => Game.findById(id).exec();

const getEstimatedCountAll = () => Game.estimatedDocumentCount().exec();

const getEstimatedCountJoinable = () =>
    Game.count({ isFull: false, status: 0 }).exec();

const updateGameById = (id, update) =>
    Game.findByIdAndUpdate(id, update, { new: true }).exec();

module.exports = {
    createNewGame,
    findAllGames,
    findAllJoinableGames,
    findGameAndPlayersById,
    findGameById,
    getEstimatedCountAll,
    getEstimatedCountJoinable,
    updateGameById,
};
