class InternalServerError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = status || 500;
        this.message =
            message ||
            "The server encountered an internal error and was unable to complete your request";
    }
}

class InvalidEndpointError extends InternalServerError {
    constructor(url, message) {
        super(
            message || `${url || "This destination"} is not a valid endpoint`,
            404,
        );
    }
}

class MissingResourceError extends InternalServerError {
    constructor(resource, message) {
        super(message || `${resource || "Resource"} not found`, 404);
    }
}

class AuthenticationError extends InternalServerError {
    constructor(message) {
        super(message || "Invalid login credentials", 403);
    }
}

class AuthorizationError extends InternalServerError {
    constructor(message) {
        super(message || "You are not authorized to access this resource", 401);
    }
}

class ArgumentsError extends InternalServerError {
    constructor(fields, message) {
        super(message || "Invalid arguments", 400);

        this.fields = fields || "Not specified";
    }
}

module.exports = {
    InternalServerError,
    InvalidEndpointError,
    MissingResourceError,
    AuthenticationError,
    AuthorizationError,
    ArgumentsError,
};
