const User = require("../models/User");

const createNewUser = (user) => new User(user).save();

const deleteUserById = (id) => User.findByIdAndDelete(id).exec();

const findAllUsers = (query = {}, skip, limit = 10) =>
    User.find(query)
        .skip(skip)
        .limit(limit)
        .exec();

const findUserById = (id) => User.findById(id).exec();

const findUserByUsername = (username) => User.findOne({ username }).exec();

const getEstimatedCount = (query = {}) =>
    User.estimatedDocumentCount(query).exec();

const findUserAndPasswordByUsername = (username) =>
    User.findOne({ username })
        .select("password")
        .exec();

const updateUserById = (id, update) =>
    User.findByIdAndUpdate(id, update, { new: true }).exec();

module.exports = {
    createNewUser,
    deleteUserById,
    findUserById,
    findUserByUsername,
    findAllUsers,
    getEstimatedCount,
    findUserAndPasswordByUsername,
    updateUserById,
};
