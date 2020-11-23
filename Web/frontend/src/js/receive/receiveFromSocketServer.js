import { StateManagement }    from '../utils/dataManager/globalData.js';
var socket = io();

socket.onAny(function (type,data) {
    // StateManagement.set('receiveFromSocketServer', {type,data});
});

socket.on('userLocation',function(e){
    // console.log(e);
    // console.log('userLocation');
});