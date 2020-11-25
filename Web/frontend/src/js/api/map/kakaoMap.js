import { panTo } from './move/moveAnimation.js';
import { setMarker, updateMarker } from './ui/marker.js';
import { setPolyline, updatePolyline } from './ui/polyline.js';
import { geolocationParse } from '../../utils/parse/dataParse.js';

const kakaoMap = ((type, obj) => {
    let map;
    let ui = [];
    let data = [];

    return {
        init: (obj) => {
            let arg = setData(obj);

            map = new kakao.maps.Map(arg.container, {
                center: arg.locPosition,
                level: arg.level,
            });

            ui.push(setMarker('default', map, arg), setPolyline('circle', map, arg));
        },

        update: (obj) => {
            let arg = setData(obj.data);
            setPolyline('circle', map, arg);
        },
    };

    function setData(obj) {
        if (!obj.locPosition) {
            if (obj.coords) {
                let { latitude, longitude } = obj.coords;
                let locPosition = new kakao.maps.LatLng(latitude, longitude);
                return Object.assign(obj, {locPosition});
            }
            if (obj.latitude && obj.longitude) {
                let locPosition = new kakao.maps.LatLng(obj.latitude, obj.longitude);
                return Object.assign(obj, {locPosition});
            }
        }
        return obj;
    }
})();

export const setKakaoMap = (type, obj) => {
    kakaoMap[type](obj);
};