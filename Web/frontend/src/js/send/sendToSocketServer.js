var socket = io();

export const sendToSocketServer = (type, data) => {
    return socket.emit(type, data);
}
