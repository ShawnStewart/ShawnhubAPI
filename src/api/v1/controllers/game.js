const gameService = require("../services/game");
const userService = require("../services/user");

const { createPagination } = require("../utils");
const {
    ArgumentsError,
    MissingResourceError,
} = require("../../../utils/errors");
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

const getGameById = (gameId) => {
    return gameService.findGameAndPlayersById(gameId).then((game) => {
        if (!game) {
            throw new MissingResourceError("Game");
        }

        return game;
    });
};

const joinGameById = async (user, gameId) => {
    if (user.gameId) {
        throw new ArgumentsError({
            "user.gameId": "User is already in a game",
        });
    }

    const game = await gameService.findGameById(gameId);

    if (!game) {
        throw new MissingResourceError("Game");
    } else if (game.status > 0) {
        throw new ArgumentsError({ status: "Game has already started" });
    } else if (game.players.length === game.maxPlayers) {
        throw new ArgumentsError({ players: "Game is full" });
    }

    game.players.push(user._id);
    await game.save();

    user.gameId = game._id;
    await user.save();

    return { user, game };
};

module.exports = {
    createGame,
    getAllGames,
    getGameById,
    joinGameById,
};
