function marker(obj) {
    var marker = new kakao.maps.Marker({
        position: obj.locPosition,
        draggable : true,
        title : obj.id
    });

    return marker;
}

export const setMarker = (obj) => {
    console.log(obj.id)
    marker(obj).setMap(obj.map);
};
