import * as move from './move/moveAnimation.js';
import { marker } from './ui/marker.js';

let container = document.getElementById('map');

const initMap = (locPosition) => {
    let options = {
        center: locPosition,
        level: 3,
    };

    var map = new kakao.maps.Map(container, options);
    return map;
};

const updateMap = ({ latitude, longitude }) => {};

export const kakaoMap = (StateManagement) => {
    let [latitude, longitude] = StateManagement.get(['latitude', 'longitude']);
    console.log(StateManagement.get(['latitude', 'longitude']));
    StateManagement.regObserver('latitude', (data) => {
        updateMap({ latitude: data });
    }).regObserver('longitude', (data) => {
        updateMap({ longitude: data });
    });

    let locPosition = new kakao.maps.LatLng(latitude, longitude);
    const map = initMap(locPosition);

    var curMarker = marker({ locPosition });
    curMarker.setMap(map);

    // // 인포윈도우를 마커위에 표시합니다
    // marker.open(map, marker);

    // panTo(map);
};
