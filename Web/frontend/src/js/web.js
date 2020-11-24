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
    
    kakaoMapConfig.coords = position.coords;
    kakaoMapDataReceiver( 'init', kakaoMapConfig);
    // sendToSocketServer('userLocation', location);
});



StateManagement.regObserver('receiveFromSocketServer', (e) => {

    console.log(e)
    // if (e.type === 'userLocation') {
    //     kakaoMapDataReceiver('update', {id, latitude, longitude, accuracy});
    // }
});

