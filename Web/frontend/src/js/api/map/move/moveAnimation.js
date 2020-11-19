export function panTo(targetMap) {
//체이닝 할 수는 없을까?
    var moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
    targetMap.panTo(moveLatLon);
    
    return targetMap;
}        
