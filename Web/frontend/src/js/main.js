import { enviroment } from './utils/check/enviromentCheck.js';
import { outputLog } from './utils/debug/console.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

import './receive/receiveFromNative.js';
import './receive/receiveFromSocketServer.js';

import { sendToNative } from './send/sendToNative.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';

import { kakaoMap, kakaoMapDataReceiver } from './api/map/kakaoMap.js';

const map = kakaoMap({
    container: document.getElementById('map'),
    level: 3,
});

function dataTransporter(dataReceiver, data) {
    dataReceiver(data);
}
StateManagement.regObserver('receiveFromNative', (e) => {
    
    let { latitude, longitude, accuracy } = dataParse(e.data);
    let location = { latitude, longitude, accuracy };
    
    dataTransporter(kakaoMapDataReceiver, { map, location });
    sendToSocketServer('userLocation', location);
});

StateManagement.regObserver('receiveFromSocketServer', (e) => {
    let { latitude, longitude, accuracy } = dataParse(e.data);
    let location = { latitude, longitude, accuracy };
    
    if(e.type === 'userLocation') dataTransporter(kakaoMapDataReceiver, { map, location });
});

if (enviroment === 'web') {
    navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude, accuracy } = position.coords;
        let location = { latitude, longitude, accuracy };
        dataTransporter(kakaoMapDataReceiver, { map, location });
        sendToSocketServer('userLocation', location);
    });
} else {
    sendToNative('requestLocation');
}

