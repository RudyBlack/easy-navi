import { enviroment } from './utils/check/enviromentCheck.js';
import { outputLog } from './utils/debug/console.js';
import { receiveDataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

import './receive/receiveFromNative.js';
import { sendToNative } from './send/sendToNative.js';

import { kakaoMap } from './api/map/kakaoMap.js';

//receive -> Native
StateManagement.regObserver('receiveFromNative', (e) => {
    let { altitude, latitude, longitude } = receiveDataParse(e.data);
    StateManagement.set('altitude', altitude).set('latitude', latitude).set('longitude', longitude);
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