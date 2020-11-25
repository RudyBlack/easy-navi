import { StateManagement }    from '../utils/dataManager/globalData.js';
var socket = io();

socket.onAny(function (type,data) {
    console.log(type);
    data.type = type;
    StateManagement.set('receiveFromSocketServer', data);
});
