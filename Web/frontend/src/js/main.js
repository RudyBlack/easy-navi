import { enviroment } from './utils/check/enviromentCheck.js';
import { outputLog } from './utils/debug/console.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

import './receive/receiveFromNative.js';
import './receive/receiveFromSocketServer.js';

import { sendToNative } from './send/sendToNative.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';

import { kakaoMap } from './api/map/kakaoMap.js';

StateManagement.regObserver('receiveFromNative', (e) => {
    let { altitude, latitude, longitude } = dataParse(e.data);
    StateManagement.set('altitude', altitude).set('latitude', latitude).set('longitude', longitude);
});

StateManagement.regObserver('receiveFromSocketServer', (e) => {
    console.log(e);
});

kakaoMap(StateManagement);

if (enviroment === 'web') {
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        StateManagement.set('latitude', latitude).set('longitude', longitude);
    });
}

if (enviroment === 'webview') {
    sendToNative('location');
}

