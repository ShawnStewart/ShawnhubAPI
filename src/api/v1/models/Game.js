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
    isFull: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startedAt: {
        type: Date,
        default: null,
    },
    finishedAt: {
        type: Date,
        default: null,
    },
});

module.exports = Game = mongoose.model("Game", GameSchema, "games");
