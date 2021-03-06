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
    const totalCount = await gameService.getEstimatedCountAll();
    const pagination = await createPagination(
        query.page,
        query.size,
        totalCount,
    );
    const { pageNumber, size } = pagination;
    const games = await gameService.findAllGames((pageNumber - 1) * size, size);

    pagination.pageSize = games.length;

    return {
        pagination,
        games,
    };
};

getAllJoinableGames = async (query) => {
    const totalCount = await gameService.getEstimatedCountJoinable();
    const pagination = await createPagination(
        query.page,
        query.size,
        totalCount,
    );
    const { pageNumber, size } = pagination;
    const games = await gameService.findAllJoinableGames(
        (pageNumber - 1) * size,
        size,
    );

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
    } else if (game.isFull === true) {
        throw new ArgumentsError({ players: "Game is full" });
    }

    game.players.push(user._id);

    if (game.players.length === game.maxPlayers) {
        game.isFull = true;
    }

    user.gameId = game._id;

    await game.save();
    await user.save();

    return { game, user };
};

const kickPlayerById = async (user, gameId, playerId) => {
    if (!user.gameId || `${user.gameId}` !== `${gameId}`) {
        throw new ArgumentsError({ "user.gameId": "User is not in this game" });
    } else if (!playerId) {
        throw new ArgumentsError({
            playerId: "The user ID of the player to kick was not provided",
        });
    }

    const game = await gameService.findGameById(gameId);

    if (!game) {
        throw new MissingResourceError("Game");
    } else if (game.status > 0) {
        throw new ArgumentsError({ status: "Game has already started" });
    } else if (`${user._id}` !== `${game.ownerId}`) {
        throw new ArgumentsError({
            "user._id": "Only the game owner can kick players",
        });
    } else if (`${user._id}` === `${playerId}`) {
        throw new ArgumentsError({
            "user._id": "The game owner can't be kicked",
        });
    } else if (!game.players.includes(playerId)) {
        throw new ArgumentsError({
            playerId: "The player was not found in this game",
        });
    }

    const player = await userService.findUserById(playerId);

    game.players.remove(playerId);
    player.gameId = null;

    if (game.isFull === true) {
        game.isFull = false;
    }

    await game.save();
    await player.save();

    return { game, kicked: player };
};

const leaveGameById = async (user, gameId) => {
    if (!user.gameId || `${user.gameId}` !== `${gameId}`) {
        throw new ArgumentsError({ "user.gameId": "User is not in this game" });
    }

    const game = await gameService.findGameById(gameId);

    if (!game) {
        throw new MissingResourceError("Game");
    }

    game.players.remove(user._id);
    user.gameId = null;

    if (!game.players.length) {
        await game.delete();
        await user.save();

        return { deleted: true, game, user };
    } else if (`${game.ownerId}` === `${user._id}`) {
        game.ownerId = game.players[0];
    }

    if (game.isFull === true) {
        game.isFull = false;
    }

    await game.save();
    await user.save();

    return { game, user };
};

const startGame = async (user, gameId) => {
    if (!user.gameId || `${user.gameId}` !== `${gameId}`) {
        throw new ArgumentsError({ "user.gameId": "User is not in this game" });
    }

    const game = await gameService.findGameById(gameId);

    if (`${user._id}` !== `${game.ownerId}`) {
        throw new ArgumentsError({
            user: "Only the game owner can start the game",
        });
    } else if (game.status !== 0) {
        throw new ArgumentsError({
            "game.status": "The game is not waiting to be started",
        });
    }

    game.status = 1;
    game.startedAt = Date.now();

    await game.save();

    return { game };
};

const transferGameOwnership = async (user, gameId, playerId) => {
    if (!user.gameId || `${user.gameId}` !== `${gameId}`) {
        throw new ArgumentsError({ "user.gameId": "User is not in this game" });
    }

    const game = await gameService.findGameById(gameId);

    if (`${user._id}` !== `${game.ownerId}`) {
        throw new ArgumentsError({
            user: "Only the game owner can transfer ownership",
        });
    } else if (!game.players.includes(playerId)) {
        throw new ArgumentsError({
            playerId: "The player was not found in this game",
        });
    } else if (`${playerId}` === `${game.ownerId}`) {
        throw new ArgumentsError({
            playerId: "The player is already the owner",
        });
    }

    game.ownerId = playerId;

    await game.save();

    return { game };
};

module.exports = {
    createGame,
    getAllGames,
    getAllJoinableGames,
    getGameById,
    joinGameById,
    kickPlayerById,
    leaveGameById,
    startGame,
    transferGameOwnership,
};
