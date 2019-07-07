const gameService = require("../services/game");

const { createPagination } = require("../utils");
const {} = require("../../../utils/errors");
const { creationValidation } = require("../validation/games");

const createGame = (user, body) => {
    return { user, body };
};

const getAllGames = async (query) => {
    const totalCount = await gameService.getEstimatedCount();
    const pagination = await createPagination(
        query.page,
        query.size,
        totalCount,
    );
    const { page, size } = pagination;
    const games = await gameService.findAllGames((page - 1) * size, size);

    pagination.pageSize = games.length;

    return {
        pagination,
        games,
    };
};

const getGameById = (gameId) => gameService.findGameAndPlayersById(gameId);

module.exports = { createGame, getAllGames, getGameById };
