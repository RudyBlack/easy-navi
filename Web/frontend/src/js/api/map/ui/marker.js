function marker({ map, locPosition}) {
    var marker = new kakao.maps.Marker({
        position: locPosition,
    });

    return marker;
}


export const setMarker = ({map, locPosition}) => {
    marker({ locPosition }).setMap(map);
};
