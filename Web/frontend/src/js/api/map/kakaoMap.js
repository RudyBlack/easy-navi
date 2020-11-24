import { panTo } from './move/moveAnimation.js';
import { setMarker } from './ui/marker.js';
import { geolocationParse } from '../../utils/parse/dataParse.js';

let map;

const kakaoMap = (type, paramObj) => {
    let { latitude, longitude, accuracy } = paramObj.coords;
    let { container, level } = paramObj;

    if (type === 'init') {
        init({ map, container, level, latitude, longitude, accuracy });
    }
    if (type === 'update') {
        update({ map, latitude, longitude });
    }

    function init({ map, container, level, latitude, longitude }) {
        let locPosition = new kakao.maps.LatLng(latitude, longitude);

        map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(latitude, longitude),
            level,
        });

        setMarker({map, locPosition});
        panTo({map, locPosition});
    }

    function update({ map, latitude, longitude }) {
        let locPosition = new kakao.maps.LatLng(latitude, longitude);
        setMarker(map, locPosition);
        panTo(map, locPosition);
    }
};

export const kakaoMapDataReceiver = (type, paramObj) => {
    kakaoMap(type, paramObj);
};