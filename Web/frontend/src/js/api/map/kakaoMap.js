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

const updateMap = (obj) => {};

export const kakaoMap = (StateManagement) => {
    let [latitude, longitude] = StateManagement.get(['latitude', 'longitude']);
    let locPosition = new kakao.maps.LatLng(latitude, longitude);
    let map = initMap(locPosition);
    map.panTo(locPosition);
    
    StateManagement.regObserver(['latitude', 'longitude'], (data) => {
        let [latitude, longitude] = StateManagement.get(['latitude', 'longitude']);
        
        if(latitude && longitude){
            
            let locPosition = new kakao.maps.LatLng(latitude, longitude);    
            map = initMap(locPosition);
            map.panTo(locPosition);
            marker({ locPosition }).setMap(map);
        }
    });

    marker({ locPosition }).setMap(map);
};