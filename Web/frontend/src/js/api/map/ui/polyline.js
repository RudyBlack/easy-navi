const polyline = (type, obj) => {
    
    if(type === 'circle'){
        return circle(obj);
    }
    
    function circle(obj) {
        return new kakao.maps.Circle({
            center: obj.locPosition,
            radius: 5, // 미터 단위의 원의 반지름입니다
            strokeWeight: 5, // 선의 두께입니다
            strokeColor: 'red', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            fillColor: 'red', // 채우기 색깔입니다
            fillOpacity: 1, // 채우기 불투명도 입니다
        });
    }

    return polyline;
};

export const setPolyline = (type, map, obj) => {
    polyline(type, obj).setMap(map);
};

export const updatePolyline = () => {
    
}