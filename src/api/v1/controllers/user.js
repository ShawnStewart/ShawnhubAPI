const userService = require("../services/user");
const { hashPassword, issueToken } = require("../services/security");

const { createPagination } = require("../utils");
const {
    ArgumentsError,
    AuthenticationError,
    MissingResourceError,
} = require("../../../utils/errors");
const {
    authenticationValidation,
    registrationValidation,
    updateValidation,
} = require("../validation/users");

const getAllUsers = async (query) => {
    const totalCount = await userService.getEstimatedCount();
    const pagination = await createPagination(
        query.page,
        query.size,
        totalCount,
    );
    const { pageNumber, size } = pagination;
    const users = await userService.findAllUsers((pageNumber - 1) * size, size);

    pagination.pageSize = users.length;

    return {
        pagination,
        users,
    };
};

const getUserById = (userId) => {
    return userService.findUserById(userId).then((user) => {
        if (!user) {
            throw new MissingResourceError("User");
        }

        return user;
    });
};

const login = async (body) => {
    const { errors, isValid } = authenticationValidation(body);
    const { username } = body;

    if (!isValid) {
        throw new ArgumentsError(errors);
    }

    const user = await userService.findUserAndPasswordByUsername(username);
    let correctPassword;

    if (user) {
        correctPassword = await user.verifyPassword(body.password);
    }

    if (!user || !correctPassword) {
        throw new AuthenticationError();
    }

    const token = await issueToken({ username, id: user._id });

    return {
        id: user._id,
        token: `Bearer ${token}`,
        username,
    };
};

const register = async (body) => {
    const { errors, isValid } = registrationValidation(body);

    if (!isValid) {
        throw new ArgumentsError(errors);
    } else if (await userService.findUserByUsername(body.username)) {
        throw new ArgumentsError({ username: "Username is already taken" });
    }

    const password = await hashPassword(body.password);
    const newUser = {
        username: body.username,
        password,
        email: body.email,
    };

    return userService.createNewUser(newUser);
};

const updateUserById = async (userId, body) => {
    const { errors, isValid, update } = updateValidation(body);

    if (!isValid) {
        throw new ArgumentsError(errors);
    }

    return userService.updateUserById(userId, update).then((user) => {
        if (!user) {
            throw new MissingResourceError("User");
        }

        return { user };
    });
};

const deleteUserById = (userId) =>
    userService.deleteUserById(userId).then((deleted) => {
        if (!deleted) {
            throw new MissingResourceError("User");
        }

        return { deleted };
    });

module.exports = {
    deleteUserById,
    getAllUsers,
    getUserById,
    login,
    register,
    updateUserById,
};
