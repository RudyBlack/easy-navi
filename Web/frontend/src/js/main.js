import { enviroment } from './utils/check/enviromentCheck.js';
import { outputLog } from './utils/debug/console.js';
import { receiveDataParse } from './utils/parse/dataParse.js';
import { kakaoMap } from './api/map/kakaoMap.js';
import { StateManagement } from './utils/dataManager/globalData.js';

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

(function startInterface(enviroment) {
    kakaoMap(StateManagement);

    if (enviroment === 'web') {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            StateManagement.set('latitude', latitude).set('longitude', longitude);
        });
    }

    if (enviroment === 'webview') {
        kakaoMap(StateManagement);
        postMessage('location');
    }
})(enviroment);