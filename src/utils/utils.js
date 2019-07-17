const checkEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

const dbConnectionError = (err) =>
    console.log(`Error connecting to MongoDB, check environment variables...\n${err.stack}`);
const dbConnectionSuccess = () => console.log("=== Connected to MongoDB ===\n");

module.exports = { checkEmpty, dbConnectionError, dbConnectionSuccess };
