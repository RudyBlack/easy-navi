import './receive/receiveFromSocketServer.js';
import { kakaoMapDataReceiver } from './api/map/kakaoMap.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

const kakaoMapConfig = {
    container : document.getElementById('map'),
    level : 3,
    coords : {}
}

navigator.geolocation.getCurrentPosition((position) => {
    let {latitude, longitude, accuracy} = position.coords;
    kakaoMapConfig.coords = {latitude, longitude, accuracy};
    
    kakaoMapDataReceiver( 'init', kakaoMapConfig);
    sendToSocketServer('userLocation', kakaoMapConfig.coords);
});



StateManagement.regObserver('receiveFromSocketServer', (e) => {
    if (e.type === 'userLocation') {
        kakaoMapDataReceiver('update', e);
    }
});

