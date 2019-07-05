const Validator = require("validator");
const { checkEmpty } = require("../../../utils/utils");

const authenticationValidation = (data) => {
    const errors = {};
    let { username, password } = data;

    username = !checkEmpty(username) ? username : "";
    password = !checkEmpty(password) ? password : "";

    // Username
    if (Validator.isEmpty(username)) {
        errors.username = "Username is required";
    }

    // Password
    if (Validator.isEmpty(password)) {
        errors.password = "Password is required";
    }

    return { errors, isValid: checkEmpty(errors) };
};

const registrationValidation = (data) => {
    const errors = {};
    let { username, email, password, passwordConfirm } = data;

    username = !checkEmpty(username) ? username : "";
    password = !checkEmpty(password) ? password : "";
    passwordConfirm = !checkEmpty(passwordConfirm) ? passwordConfirm : "";

    // Username
    if (Validator.isEmpty(username)) {
        errors.username = "Username is required";
    } else if (!Validator.isLength(username, { max: 21 })) {
        errors.username = "Username must be less than 21 characters";
    } else if (!/^[\w\d]+$/.test(username)) {
        errors.username = "Username can only be letters or numbers";
    }

    // Email
    if (!checkEmpty(email)) {
        if (!Validator.isEmail(email)) {
            errors.email = "Please enter a valid email address";
        }
    }

    // Password
    if (Validator.isEmpty(password)) {
        errors.password = "Password is required";
    } else if (!Validator.isLength(password, { min: 8 })) {
        errors.password = "Password must be atleast 8 characters";
    }

    // Password confirmation
    if (Validator.isEmpty(passwordConfirm)) {
        errors.passwordConfirm = "Please confirm your password";
    } else if (!Validator.equals(password, passwordConfirm)) {
        errors.passwordConfirm = "Passwords do not match";
    }

    return { errors, isValid: checkEmpty(errors) };
};

const updateValidation = (data) => {
    const errors = {};
    const update = {};
    let { username, email } = data;

    // Username
    if (!checkEmpty(username)) {
        if (Validator.isEmpty(username)) {
            errors.username = "Username is required";
        } else if (!Validator.isLength(username, { max: 21 })) {
            errors.username = "Username must be less than 21 characters";
        } else if (!/^[\w\d]+$/.test(username)) {
            errors.username = "Username can only be letters or numbers";
        }

        update.username = username;
    }

    // Email
    if (!checkEmpty(email)) {
        if (!Validator.isEmail(email)) {
            errors.email = "Please enter a valid email address";
        }

        update.email = email;
    }

    // // Current password, new password, and new password confirmation
    // if (!checkEmpty(newPassword)) {
    //     if (Validator.isEmpty(currentPassword)) {
    //         errors.currentPassword = "Please enter current password";
    //     }

    //     if (Validator.isEmpty(newPassword)) {
    //         errors.newPassword = "Password is required";
    //     } else if (!Validator.isLength(newPassword, { min: 8 })) {
    //         errors.newPassword = "Password must be atleast 8 characters";
    //     }

    //     newPasswordConfirm = !checkEmpty(newPasswordConfirm) ? newPasswordConfirm : "";

    //     if (Validator.isEmpty(newPasswordConfirm)) {
    //         errors.newPasswordConfirm = "Please confirm your password";
    //     } else if (!Validator.equals(newPassword, newPasswordConfirm)) {
    //         errors.newPasswordConfirm = "Passwords do not match";
    //     }

    //     update.newPassword = newPassword;
    //     update.newPasswordConfirm = newPasswordConfirm;
    // }

    return { errors, isValid: checkEmpty(errors), update };
};

module.exports = {
    authenticationValidation,
    registrationValidation,
    updateValidation,
};
