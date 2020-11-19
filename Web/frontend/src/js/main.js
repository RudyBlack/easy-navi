import * as check from './check.js';
import { outputLog } from './debug/console.js';
import { receiveDataParse } from './parse/dataParse.js';
import { initMap } from './api/kakaoMap.js'

//web -> native
const postMessage = (postData) => {
    window.ReactNativeWebView.postMessage(postData);    
}

let curLocation = new Map();

//native -> web
window.document.addEventListener('message', function (e) {
    
    let { altitude, latitude, longitude } = receiveDataParse(e.data);
    
    curLocation
        .set('altitude' , altitude)
        .set('latitude' , latitude)
        .set('longitude', longitude);
    
    // outputLog(curLocation.get('altitude'));
    
    initMap({altitude, latitude, longitude});
});

postMessage('location');


