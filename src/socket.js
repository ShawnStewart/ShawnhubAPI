const socket = require("socket.io");

module.exports = socketSetup = (server) => {
    const io = socket.listen(server);

    io.on("connection", (socket) => {
        socket.on("test", (data) => {
            socket.emit("test", data);
        });

        socket.on("initializeUser", (username) => {
            console.log("[SOCKET] initializeUser", username);
            socket.vars = {};
            socket.vars.username = username;
        });

        socket.on("joinRoom", (roomId) => {
            if (socket.vars.roomId) {
                console.log(`already in ${socket.vars.roomId}, leaving`);
                socket.leave(socket.vars.roomId);
            }

            socket.vars.roomId = roomId;
            socket.join(socket.vars.roomId);
            console.log(
                `[SOCKET] ${socket.vars.username} joined ${socket.vars.roomId}`,
            );
            io.to(roomId).emit(
                "updateChat",
                `${socket.vars.username} join room ${socket.vars.roomId}`,
            );
        });

        socket.on("leaveRoom", () => {
            console.log(
                `[SOCKET] ${socket.vars.username} is leaving ${
                    socket.vars.rooms
                }`,
            );
            socket.leave(socket.vars.roomId);
            socket.vars.roomId = null;
        });
    });
};
