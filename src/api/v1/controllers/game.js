const gameService = require("../services/game");
const userService = require("../services/user");

const { createPagination } = require("../utils");
const { ArgumentsError } = require("../../../utils/errors");
const { creationValidation } = require("../validation/games");

const createGame = async (user, body) => {
    const { gameId } = user;
    const { errors, isValid } = creationValidation({ gameId, ...body });

    if (!isValid) {
        throw new ArgumentsError(errors);
    }

    const newGame = {
        ownerId: user._id,
        players: [user._id],
        maxPlayers: body.maxPlayers,
    };

    const game = await gameService.createNewGame(newGame);
    const owner = await userService.updateUserById(user.id, {
        gameId: game._id,
    });

    return { game, owner };
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
