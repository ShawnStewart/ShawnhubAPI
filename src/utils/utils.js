const checkEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

const dbConnectionError = (err) =>
    console.log(`Error connecting to MongoDB, check environment variables...\n${err.stack}`);
const dbConnectionSuccess = () => console.log("=== Connected to MongoDB ===\n");

const serverSuccess = (port) => console.log(`\nServer is running on port ${port}`);

module.exports = {
    checkEmpty,
    dbConnectionError,
    dbConnectionSuccess,
    serverSuccess,
};
