require("dotenv").config();
const socket = require("socket.io");

const app = require("./app");
const socketConnection = require("./socket");
const { db } = require("./utils/config");
const { PORT = 5000 } = process.env;

const serverSuccess = () => console.log(`\nServer is running on port ${PORT}`);

// Server listener
const server = app.listen(PORT, serverSuccess);

db.connect();

// Socket listener
const io = socket.listen(server);
io.on("connection", socketConnection);
