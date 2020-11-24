var socket = io();

export const sendToSocketServer = (type, data) => {
    socket.on('connect', function () {
        socket.emit(type, { id: socket.id, data });
    });
};