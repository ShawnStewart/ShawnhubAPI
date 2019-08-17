require("dotenv").config();
const socket = require("socket.io");

const app = require("./app");
const socketSetup = require("./socket");
const { db } = require("./utils/config");
const { serverSuccess } = require("./utils/utils");
const { PORT = 5000 } = process.env;

// Server listener
const server = app.listen(PORT, () => serverSuccess(PORT));

// Connect to database and set up socket listener
db.connect();
socketSetup(server);
