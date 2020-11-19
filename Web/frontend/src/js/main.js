import * as check from './check.js';
import { outputLog } from './debug/console.js';
import { receiveDataParse } from './parse/dataParse.js';
import { kakaoMap } from './api/map/kakaoMap.js';
import { StateManagement } from './dataManager/globalData.js';

//web -> native
const postMessage = (postData) => {
    window.ReactNativeWebView.postMessage(postData);
};

//native -> web
window.document.addEventListener('message', function (e) {
    
    let { altitude, latitude, longitude } = receiveDataParse(e.data);
    StateManagement.set('altitude', altitude).set('latitude', latitude).set('longitude', longitude);

    // outputLog({altitude, latitude, longitude});
});

(function startInterface(frame) {
    if (frame === 'web') {
        StateManagement.set('latitude', 33.450701).set('longitude', 126.570667 );
    }

    if (frame === 'webview') {
        postMessage('location');
    }

    kakaoMap(StateManagement);
})('web');