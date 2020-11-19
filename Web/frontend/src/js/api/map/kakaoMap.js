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

const updateMap = (obj) => {
    
};

export const kakaoMap = (StateManagement) => {
    let [latitude, longitude] = StateManagement.get(['latitude', 'longitude']);
    
    StateManagement.regObserver(['latitude','longitude'], (data) => {
        updateMap({ data });
    });

    let locPosition = new kakao.maps.LatLng(latitude, longitude);
    const map = initMap(locPosition);
    map.panTo(locPosition);
    
    marker({ locPosition }).setMap(map);
};
