import { enviroment } from './utils/check/enviromentCheck.js';
import { outputLog } from './utils/debug/console.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

import './receive/receiveFromNative.js';
import './receive/receiveFromSocketServer.js';

import { sendToNative } from './send/sendToNative.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';

import { kakaoMap, kakaoMapDataReceiver } from './api/map/kakaoMap.js';


function dataTransporter(dataReceiver, data) {
    dataReceiver(data);
}
StateManagement.regObserver('receiveFromNative', (e) => {
    dataParse(e.data); //데이터 파스.
    // dataTransporter();
});

StateManagement.regObserver('receiveFromSocketServer', (e) => {
    console.log(e);
});

const map = kakaoMap({
    container : document.getElementById('map'),
    level : 3,
});

if (enviroment === 'web') {
    navigator.geolocation.getCurrentPosition( (position) => {
        let {latitude, longitude, accuracy} = position.coords;
        let location = {latitude, longitude, accuracy};
        dataTransporter(kakaoMapDataReceiver, {map , location});
        sendToSocketServer('userLocation', location);
    });
}else{
     sendToNative('requestLocation');
}

//내 위치정보를 보낸다.



