import './receive/receiveFromNative.js';
import './receive/receiveFromSocketServer.js';
import { kakaoMap, kakaoMapDataReceiver } from './api/map/kakaoMap.js';
import { sendToNative } from './send/sendToNative.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

StateManagement.regObserver('receiveFromNative', (e) => {
    
    let { latitude, longitude, accuracy } = dataParse(e.data);
    let location = { latitude, longitude, accuracy };
    
    kakaoMapDataReceiver({ map, location });
    sendToSocketServer('userLocation', location);
});

StateManagement.regObserver('receiveFromSocketServer', (e) => {
    let { latitude, longitude, accuracy } = dataParse(e.data);
    let location = { latitude, longitude, accuracy };
    
    if(e.type === 'userLocation') kakaoMapDataReceiver({ map, location });
});


sendToNative('requestLocation');

const map = kakaoMap({
    container: document.getElementById('map'),
    level: 3,
});