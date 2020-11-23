import * as move from './move/moveAnimation.js';
import { marker } from './ui/marker.js';

export const kakaoMap = (obj) => {
    
    (({container, locPosition})=>{
        new kakao.maps.Map(container, { center: locPosition, level: 3 });
    })(obj);
    
    const updateMap = (obj) => {
        //맵 위치 업데이트
    };
    
    const panTo = (map, locPosition) => {
        map.panTo(locPosition);    
    };
    
    const marker = (map, locPosition) => {
        marker({ locPosition }).setMap(map);    
    }
    
    const dataReceiver = (data) => {
        
    }
    
    return {
        dataReceiver
    }
};