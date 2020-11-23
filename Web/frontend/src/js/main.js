import { enviroment } from './utils/check/enviromentCheck.js';
import { outputLog } from './utils/debug/console.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

import './receive/receiveFromNative.js';
import './receive/receiveFromSocketServer.js';

import { sendToNative } from './send/sendToNative.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';

import { kakaoMap } from './api/map/kakaoMap.js';

function dataTransporter() {}
StateManagement.regObserver('receiveFromNative', (e) => {
    dataParse(e.data); //데이터 파스.
    // data.push()
});

StateManagement.regObserver('receiveFromSocketServer', (e) => {
    console.log(e);
});

if (enviroment === 'web') {
    navigator.geolocation.getCurrentPosition( (position) => {
        dataTransporter({target : kakaoMap.dataReceiver, data : position});
    });
}else{
     sendToNative('requestLocation');
}

kakaoMap({
    container : document.getElementById('map'),
    marker: 'normal',
    panTo: true,
});