const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const { comparePassword } = require("../services/security");

const UserSchema = new Schema({
    role: {
        type: Number,
        default: 0,
        min: 0,
        max: 1,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    gameId: {
        type: ObjectId,
        ref: "Game",
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.verifyPassword = function(plainText) {
    return comparePassword(plainText, this.password);
};

module.exports = User = mongoose.model("User", UserSchema, "users");
