function Marker(obj) {
    var marker = new kakao.maps.Marker({
        position: obj.locPosition,
        draggable: true,
        title: obj.id,
    });

    return marker;
}

export const setMarker = (type, map, obj) => {
    let marker = Marker(obj);
    marker.setMap(map);
    return marker;
};

export const updateMarker = (obj) => {};