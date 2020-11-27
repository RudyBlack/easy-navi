import { StateManagement }    from '../utils/dataManager/globalData.js';
var socket = io();

socket.onAny(function (type,data) {
    data.type = type;
    StateManagement.set('receiveFromSocketServer', data);
});
