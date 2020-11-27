import './receive/receiveFromSocketServer.js';
import { setKakaoMap } from './api/map/kakaoMap.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

const initKakaoMapConfig = {
    id : 'me',
    container : document.getElementById('map'),
    level : 3,
    coords : {}
}

navigator.geolocation.getCurrentPosition((position) => {
    let {latitude, longitude, accuracy} = position.coords;
    initKakaoMapConfig.coords = {latitude, longitude, accuracy};
    
    setKakaoMap('init', initKakaoMapConfig);
    sendToSocketServer('userLocation', initKakaoMapConfig.coords);
});



StateManagement.regObserver('receiveFromSocketServer', (e) => {
    if (e.type === 'userLocation') {
        setKakaoMap('update', e);
    }
});

