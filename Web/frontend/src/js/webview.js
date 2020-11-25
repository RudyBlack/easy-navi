import './receive/receiveFromNative.js';
import './receive/receiveFromSocketServer.js';
import { sendToNative } from './send/sendToNative.js';
import { sendToSocketServer } from './send/sendToSocketServer.js';
import { setKakaoMap } from './api/map/kakaoMap.js';
import { dataParse } from './utils/parse/dataParse.js';
import { StateManagement } from './utils/dataManager/globalData.js';

sendToNative('requestLocation');

const kakaoMapConfig = {
    container : document.getElementById('map'),
    level : 3,
    coords : {}
}

StateManagement.regObserver('receiveFromNative', (e) => {
  
    kakaoMapConfig.coords = e;
    console.log(kakaoMapConfig);
    setKakaoMap('init', kakaoMapConfig);
    sendToSocketServer('userLocation', kakaoMapConfig.coords);
});

StateManagement.regObserver('receiveFromSocketServer', (e) => {
    if (e.type === 'userLocation') {
        setKakaoMap('update', e);
    }
});