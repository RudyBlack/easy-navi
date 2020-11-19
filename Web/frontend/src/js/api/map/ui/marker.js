export function marker({ map, locPosition}) {
    var marker = new kakao.maps.Marker({
        position: locPosition,
    });

    return marker;
}

export function infowindow({message}) {
    var iwContent = message,
        iwRemoveable = true;

    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
    });

    return infowindow;
}