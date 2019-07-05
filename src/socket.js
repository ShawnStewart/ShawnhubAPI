module.exports = socketConnection = (socket) => {
    socket.on("test", (data) => {
        socket.emit("test", data);
    });

    socket.on("joinRoom", (roomId, username) => {
        console.log(`${username} is wanting to join ${roomId}`);
        socket.username = username;
        socket.join(roomId);
        io.to(roomId).emit(
            "updateChat",
            `${socket.username} join room ${roomId}`,
        );
    });
};
