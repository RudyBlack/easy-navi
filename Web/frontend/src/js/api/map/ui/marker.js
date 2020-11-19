export function marker({ map, locPosition}) {
    var marker = new kakao.maps.Marker({
        position: locPosition,
    });

    return marker;
}

