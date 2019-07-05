const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GameSchema = new Schema({
    status: {
        type: Number,
        default: 0,
        min: 0,
        max: 2,
    },
    ownerId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    players: [
        {
            type: ObjectId,
            ref: "User",
        },
    ],
    maxPlayers: {
        type: Number,
        required: true,
        min: 2,
        max: 8,
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
    startedAt: {
        type: Date,
    },
    finishedAt: {
        type: Date,
    },
});

module.exports = Game = mongoose.model("Game", GameSchema, "games");
