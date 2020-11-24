import { panTo } from './move/moveAnimation.js';
import { setMarker } from './ui/marker.js';
import { setPolyline } from './ui/polyline.js';
import { geolocationParse } from '../../utils/parse/dataParse.js';

let map;

const kakaoMap = (type, paramObj) => {
    if (type === 'init') {
        let { container, level } = paramObj;
        let { latitude, longitude, accuracy } = paramObj.coords;    
        map = init({ container, level, latitude, longitude, accuracy });
        
    }
    if (type === 'update') {
        let { id } = paramObj;
        let { latitude, longitude, accuracy } = paramObj.data;
        update({ map, latitude, longitude, id });
    }

    function init({ container, level, latitude, longitude }) {
        let locPosition = new kakao.maps.LatLng(latitude, longitude);
        let map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(latitude, longitude),
            level,
        });
        
        setMarker({map, locPosition});
        panTo({map, locPosition});
        
        return map;
    }

    function update({ map, id, latitude, longitude }) {
        let locPosition = new kakao.maps.LatLng(latitude, longitude);
        setPolyline({type : 'circle', map, locPosition, id});
        panTo({map, locPosition});
    }
};

export const kakaoMapDataReceiver = (type, paramObj) => {
    kakaoMap(type, paramObj);
};