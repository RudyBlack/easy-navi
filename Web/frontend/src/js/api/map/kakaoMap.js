import * as move from './move/moveAnimation.js';
import { marker } from './ui/marker.js';
import { geolocationParse } from '../../utils/parse/dataParse.js';

const kakaoMap = ({container, level}) => {
    return new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(0, 0),
        level
    });
};

const updateMap = (map, location) => {
    let { latitude, longitude } = location;
    let locPosition = new kakao.maps.LatLng(latitude, longitude);
    setMarker(map, locPosition);
    panTo(map, locPosition);
};

const panTo = (map, locPosition) => {
    map.panTo(locPosition);
};

const setMarker = (map, locPosition) => {
    marker({ locPosition }).setMap(map);
};

const kakaoMapDataReceiver = (data) => {
    if (data.position.coords) {
        updateMap(data.map, data.position.coords);
    }
};

export {kakaoMap, kakaoMapDataReceiver}