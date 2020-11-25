function marker(obj) {
    var marker = new kakao.maps.Marker({
        position: obj.locPosition,
        draggable : true,
        title : obj.id
    });

    return marker;
}

export const setMarker = (type, map, obj) => {
    marker(obj).setMap(map);
};

export const updateMarker = (obj) => {
    
}
